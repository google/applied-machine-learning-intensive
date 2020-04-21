# python3

"""Spellcheck for AMLI colabs."""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
import hashlib
import logging
from os import path
import nbformat
from ratelimiter import RateLimiter
from google3.i18n.encodings.inputconverter import pywrapinputconverter
from google3.net.rpc.python import pywraprpc
from google3.net.rpc.python import rpcutil
from google3.net.rpc.python.contrib import rpc_retry
from google3.pyglib import gfile
from google3.spelling.spelling2.red_underline.proto import spelling_check_pb2
from google3.spelling.spelling2.red_underline.proto import spelling_check_service_pb2
from google3.testing.pybase import googletest

LOCAL_ROOT = path.normpath(path.dirname(path.abspath(__file__)) + '/../content')
PIPER_ROOT = '/google_src/files/head/depot/google3/engedu/fuzzy/amli/content/'

# Address of the spellchecking system.
SPELLCHECK_URI = 'blade:red-underline'

# The number of characters before and after a spellcheck suggestion to show for
# context.
SPELLCHECK_CONTEXT_SIZE = 15

# SPELLCHECK_EXCEPTIONS are sequences of characters that we allow in our Colabs
# even though the spell checker complains about them. Many of these are proper
# names, column names, class names, and possesives. These values are still
# passed to the spell checker so that it can also evaluate grammar.
#
# This list should be ASCII-betically sorted.
SPELLCHECK_EXCEPTIONS = [
    'BloodPressure',
    'Chervinskii',
    'Colab',
    'ComputerTurn',
    'DataFrame',
    'DataFrames',
    'DiabetesPedigreeFunction',
    'DiabetesPedigreeFunctionthisVariable',
    'ElasticNet',
    'EnglishDictionary',
    'GradientTape',
    "Jupyter's",
    "Keras's",
    'LinearRegression',
    'LinearRegressor',
    "NumPy's",
    "OpenCV's",
    'Pandas',
    'PlayerTurn',
    'PredefinedSplit',
    "Python's",
    'SimpleRNN',
    'SkinThickness',
    "TensorFlow's",
    'assigns',
    'bucketized',
    'colab',
    'jmcadams',
    "learn's",
    'm*x',
    "matplotlib's",
    "r'my",
    'thisVariable',
    'toolset',
]

# SPELLCHECK_WHITEOUTS are items that are replaced with whitespace before being
# sent to the spell checker. This includes command line commands, HTML tags, and
# file names.
#
# This list should be ASCII-betically sorted.
SPELLCHECK_WHITEOUTS = [
    '!ls',
    '</td>',
    '</tr>',
    '<td>',
    '<tr>',
    'BlackFriday.csv',
    'amazon_cells_labelled.txt',
    'imdb_labelled.txt',
    'yelp_labelled.txt',
]

_retry_manager = rpc_retry.RetryManager(delay_s=2, delay_multiplier=2)
_retry_manager.RetryOnApplicationError(
    spelling_check_pb2.SpellingCheckResponsePb.SERVICE_OVERLOADED)


class SpellcheckTest(googletest.TestCase):

  # We trust that any file already checked into Piper has passed
  # the spellcheck test. In order to not continually check the
  # same text over-and-over we get a signature of every text cell
  # in Piper and only send cells that have been modified locally
  # to the spellcheck service.
  def _get_already_checked_cells_signatures(self):
    signatures = set()

    for colab in self._find_colab_files(PIPER_ROOT):
      with gfile.Open(colab, 'rb') as colab_file:
        try:
          notebook = nbformat.reads(colab_file.read(), as_version=4)
        except nbformat.NBFormatError as ex:
          self.fail('Unable to parse notebook %s: %s' % (colab, ex))
        for cell in notebook.cells:
          if cell.cell_type == 'markdown':
            m = hashlib.sha256()
            m.update(cell.source.encode())
            signatures.add(m.hexdigest())

    if not signatures:
      self.fail('Unable to find existing colabs')

    return signatures

  # Searches for Colab files starting at the given root path.
  def _find_colab_files(self, root):
    colabs = []
    for r, _, files in gfile.Walk(root, onerror=self.fail):
      for f in files:
        if f.endswith('.ipynb'):
          colabs.append(path.join(r, f))
    return sorted(colabs)

  # The path to the colab files is a long temporary file path. In order to
  # print more readable paths we strip off the first part of the path.
  def _make_readable_path(self, full_path):
    subpath = 'amli/content/'
    return full_path[full_path.rindex(subpath)+len(subpath):]

  # Make a connection to the spellcheck service.
  def _connect_to_spellcheck_service(self):
    spell_correction_channel = rpcutil.GetNewChannel(
        SPELLCHECK_URI, load_balancing_policy='RoundRobin')
    return spelling_check_service_pb2.SpellingChecker.NewRPC2Stub(
        channel=spell_correction_channel)

  # Create a spellcheck request object with the cell source. Whiteout any parts
  # of the source that we can't send to the spellchecker.
  def _build_request(self, cell):
    request = spelling_check_pb2.SpellingCheckRequestPb()

    cell_source = cell.source
    for whiteout in SPELLCHECK_WHITEOUTS:
      cell_source = cell_source.replace(whiteout, ' '*len(whiteout))

    request.text = pywrapinputconverter.InputConverter().ConvertString(
        cell_source)
    request.language = 'en'
    request.origin_country = 'usa'

    return request

  # Process spellcheck response and see if there are any meaningful errors.
  # If there are spelling errors the method prints the errors and returns true.
  # Otherwise it returns false.
  def _spelling_errors_found(self, response, cell, exceptions, file):
    found_errors = False

    if not response.misspelling_pb:
      return found_errors

    for correction_pb in response.misspelling_pb:
      suggestion = correction_pb.suggestion_pb[0].suggestion
      start = correction_pb.bounds_pb.char_start
      length = correction_pb.bounds_pb.char_length
      text = cell.source[start:start + length]

      if text in exceptions:
        continue

      context_start = start - SPELLCHECK_CONTEXT_SIZE
      if context_start < 0:
        context_start = 0

      context_end = start + length + SPELLCHECK_CONTEXT_SIZE
      if context_end >= len(cell.source):
        context_end = len(cell.source)

      context = cell.source[context_start:context_end]

      print(f'{file}: cell {cell.metadata.id}: should "{text}" starting at '
            f'{start} be "{suggestion}"? Context: {context}')
      found_errors = True

    return found_errors

  def test_spelling(self):
    already_checked = self._get_already_checked_cells_signatures()
    exceptions = set(SPELLCHECK_EXCEPTIONS)
    rate_limiter = RateLimiter(max_calls=1, period=5)
    stub = None

    errors_found = False
    for colab in self._find_colab_files(LOCAL_ROOT):
      try:
        notebook = nbformat.read(colab, as_version=4)
      except nbformat.NBFormatError as ex:
        self.fail('Unable to parse notebook %s: %s' % (colab, ex))

      short_path = self._make_readable_path(colab)

      for cell in notebook.cells:
        if cell.cell_type != 'markdown':
          continue

        m = hashlib.sha256()
        m.update(cell.source.encode())
        if m.hexdigest() in already_checked:
          continue

        request = self._build_request(cell)

        logging.warning(f'COLAB (cell): {short_path} ({cell.metadata.id})')
        with rate_limiter:
          try:
            if not stub:
              stub = self._connect_to_spellcheck_service()
            if self._spelling_errors_found(
                _retry_manager.Run(stub.SpellingCheck, request),
                cell, exceptions, short_path):
              errors_found = True
          except pywraprpc.RPCException as error:
            self.fail(error)

    if errors_found:
      self.fail('spelling errors found')

if __name__ == '__main__':
  googletest.main()