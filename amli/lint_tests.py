# python3

"""Tests for amli.colab."""

import copy
import os
from absl import flags
import nbformat

from amli.colab import Colab
from amli.lint import DuplicateCellIDs
from amli.lint import Linter
from amli.lint import LintError
from amli.lint import OutputDataFound
from amli.lint import PrivateOutputsOff
from amli.lint import TableOfContentsHidden
from amli.lint import WrongPythonDisplayName
from amli.lint import WrongPythonName
from absl.testing import absltest

FLAGS = flags.FLAGS


class LintErrorTests(absltest.TestCase):

  @classmethod
  def setUpClass(cls):
    super(LintErrorTests, cls).setUpClass()
    colab_path = os.path.join(FLAGS.test_srcdir,
                              'amli/colab.ipynb')
    cls.notebook = nbformat.read(colab_path, as_version=4)

  def test_no_lint_errors(self):
    notebook = copy.deepcopy(self.notebook)
    lab = Colab(notebook)
    self.assertFalse(Linter().lint(lab))

  def test_lint_error(self):
    e = LintError()
    self.assertEqual(f'{e}', 'Generic lint error.')
    self.assertEqual(repr(e), 'LintError()')

  def test_duplicate_cell_ids_lint_error(self):
    e = DuplicateCellIDs(['ABCDEFG', '123456'])
    self.assertContainsInOrder(['ABCDEFG', '123456', '#dupe-ids'], f'{e}')
    self.assertEqual(repr(e), "DuplicateCellIDs(['ABCDEFG', '123456'])")
    self.assertIsInstance(e, LintError)

  def test_duplicate_cell_ids_linter(self):
    notebook = copy.deepcopy(self.notebook)
    notebook.cells[0].metadata.id = 'abc'
    notebook.cells[1].metadata.id = 'abc'
    lab = Colab(notebook)

    linter = Linter()

    errors = linter.lint(lab)
    self.assertLen(errors, 1)
    self.assertIsInstance(errors[0], DuplicateCellIDs)

  def test_wrong_python_name_lint_error(self):
    e = WrongPythonName('python2')
    self.assertContainsInOrder(
        ['python2', 'python3', '#python-version'], f'{e}')
    self.assertEqual(repr(e),
                     "WrongPythonName('python2')")
    self.assertIsInstance(e, LintError)

  def test_python_name_linter(self):
    notebook = copy.deepcopy(self.notebook)

    lab = Colab(notebook)
    linter = Linter()
    self.assertFalse(linter.lint(lab))

    notebook.metadata.kernelspec.name = 'python2'
    lab = Colab(notebook)
    linter = Linter()
    errors = linter.lint(lab)
    self.assertLen(errors, 1)
    self.assertIsInstance(errors[0], WrongPythonName)

    del notebook.metadata.kernelspec['name']
    lab = Colab(notebook)
    linter = Linter()
    errors = linter.lint(lab)
    self.assertLen(errors, 1)
    self.assertIsInstance(errors[0], WrongPythonName)

  def test_wrong_python_display_name_lint_error(self):
    e = WrongPythonDisplayName('Python 2')
    self.assertContainsInOrder(
        ['Python 2', 'Python 3', '#python-version'], f'{e}')
    self.assertEqual(repr(e),
                     "WrongPythonDisplayName('Python 2')")
    self.assertIsInstance(e, LintError)

  def test_python_display_name_linter(self):
    notebook = copy.deepcopy(self.notebook)

    lab = Colab(notebook)
    linter = Linter()
    self.assertFalse(linter.lint(lab))

    notebook.metadata.kernelspec.display_name = 'Python 2'
    lab = Colab(notebook)
    linter = Linter()
    errors = linter.lint(lab)
    self.assertLen(errors, 1)
    self.assertIsInstance(errors[0], WrongPythonDisplayName)

    del notebook.metadata.kernelspec['display_name']
    lab = Colab(notebook)
    linter = Linter()
    errors = linter.lint(lab)
    self.assertLen(errors, 1)
    self.assertIsInstance(errors[0], WrongPythonDisplayName)

  def test_private_outputs_off(self):
    e = PrivateOutputsOff()
    self.assertStartsWith(f'{e}', 'Private outputs are set to off or not set '
                          '(defaults to off)')
    self.assertEqual(repr(e), 'PrivateOutputsOff()')
    self.assertIsInstance(e, LintError)

  def test_private_outputs_linter(self):
    notebook = copy.deepcopy(self.notebook)

    lab = Colab(notebook)
    linter = Linter()
    self.assertFalse(linter.lint(lab))

    notebook.metadata.colab.private_outputs = False
    lab = Colab(notebook)
    linter = Linter()
    errors = linter.lint(lab)
    self.assertLen(errors, 1)
    self.assertIsInstance(errors[0], PrivateOutputsOff)

    del notebook.metadata.colab['private_outputs']
    lab = Colab(notebook)
    linter = Linter()
    errors = linter.lint(lab)
    self.assertLen(errors, 1)
    self.assertIsInstance(errors[0], PrivateOutputsOff)

  def test_table_of_contents_hidden(self):
    e = TableOfContentsHidden()
    self.assertStartsWith(f'{e}', 'Table of contents visibility is set to '
                          'hidden or not set')
    self.assertEqual(repr(e), 'TableOfContentsHidden()')
    self.assertIsInstance(e, LintError)

  def test_table_of_contents_linter(self):
    notebook = copy.deepcopy(self.notebook)

    lab = Colab(notebook)
    linter = Linter()
    self.assertFalse(linter.lint(lab))

    notebook.metadata.colab.toc_visible = False
    lab = Colab(notebook)
    linter = Linter()
    errors = linter.lint(lab)
    self.assertLen(errors, 1)
    self.assertIsInstance(errors[0], TableOfContentsHidden)

    del notebook.metadata.colab['toc_visible']
    lab = Colab(notebook)
    linter = Linter()
    errors = linter.lint(lab)
    self.assertLen(errors, 1)
    self.assertIsInstance(errors[0], TableOfContentsHidden)

  def test_output_data_found_error(self):
    e = OutputDataFound(['ABCDEFG', '123456'])
    self.assertContainsInOrder(['ABCDEFG', '123456', '#empty-outputs'], f'{e}')
    self.assertEqual(repr(e), "OutputDataFound(['ABCDEFG', '123456'])")
    self.assertIsInstance(e, LintError)

  def test_output_data_linter(self):
    notebook = copy.deepcopy(self.notebook)
    notebook.cells[0].outputs = ['abc']
    lab = Colab(notebook)

    linter = Linter()

    errors = linter.lint(lab)
    self.assertLen(errors, 1)
    self.assertIsInstance(errors[0], OutputDataFound)


if __name__ == '__main__':
  absltest.main()
