# python3

"""Tests for google3.engedu.fuzzy.amli.src.validation.colab.colab."""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
import os
from os import path
import re
import nbformat
from google3.engedu.fuzzy.amli.lib.colab import Colab
from google3.testing.pybase import googletest

ROOT = path.normpath(path.dirname(path.abspath(__file__)) + '/../')
URL = 'http://g3doc/engedu/fuzzy/amli/g3doc/colab_style_guide.md'

COPYRIGHT = """# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an \"AS IS\" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License."""


class ColabTest(googletest.TestCase):

  def test_colabs(self):
    colabs = []
    for r, _, files in os.walk(ROOT + '/content'):
      for f in files:
        if f.endswith('.ipynb'):
          colabs.append(path.join(r, f))

    # Make sure that we found colabs to test
    self.assertGreaterEqual(len(colabs), 1)

    for colab in colabs:
      try:
        notebook = nbformat.read(colab, as_version=4)
      except nbformat.NBFormatError as ex:
        self.fail('Unable to parse notebook %s: %s' % (colab, ex))

      clab = Colab(notebook)
      lint_errors = clab.lint()
      self.assertEmpty(lint_errors)

      subpath = 'amli/content/'
      short_path = colab[colab.rindex(subpath)+len(subpath):]

      self.has_copyright(notebook, short_path)
      self.title_exists(notebook, short_path)
      self.title_matches_name(notebook, short_path)
      self.high_level_description_after_title(notebook, short_path)
      self.has_overview(notebook, short_path)
      self.has_learning_objectives(notebook, short_path)
      self.only_allowed_characters_in_name(notebook, short_path)
      self.has_prerequisites(notebook, short_path)
      self.has_estimated_duration(notebook, short_path)
      self.are_exercises_formatted_correctly(notebook, short_path)

  def only_allowed_characters_in_name(self, notebook, colab):
    self.assertRegex(notebook.metadata.colab.name, r'([a-zA-Z0-9 -])+',
                     f'{colab} [{URL}#alpha-name]: unwanted chars in name')

  def has_copyright(self, notebook, colab):
    msg = f'{colab} [{URL}#copyright]'
    self.assertIn('cells', notebook.keys(), msg)
    self.assertNotEmpty(notebook.cells, msg)
    self.assertGreaterEqual(len(notebook.cells), 2, msg)

    copyright_title = notebook.cells[0]
    self.assertEqual('markdown', copyright_title.cell_type, msg)
    self.assertIn('source', copyright_title.keys(), msg)
    self.assertRegex(copyright_title.source,
                     r'#### Copyright 20\d\d Google LLC.', msg)

    copyright_text = notebook.cells[1]
    self.assertEqual('code', copyright_text.cell_type, msg)
    self.assertIn('source', copyright_text.keys(), msg)
    self.assertEqual(COPYRIGHT, copyright_text.source, msg)

    self.assertIn(notebook.cells[0].metadata.id,
                  notebook.metadata.colab.collapsed_sections, msg)

  def title_exists(self, notebook, colab):
    msg = f'{colab} [{URL}#has-title]'
    self.assertIn('cells', notebook.keys(), msg)
    self.assertNotEmpty(notebook.cells, msg)
    self.assertGreaterEqual(len(notebook.cells), 3, msg)
    title = notebook.cells[2]
    self.assertEqual('markdown', title.cell_type, msg)
    self.assertRegex(title.source, r'# \w+', msg)

  def title_matches_name(self, notebook, colab):
    msg = f'{colab} [{URL}#title-eq-name]'
    self.assertIn('cells', notebook.keys(), msg)
    self.assertNotEmpty(notebook.cells, msg)
    self.assertGreaterEqual(len(notebook.cells), 3, msg)
    title = notebook.cells[2]
    self.assertIn('source', title.keys(), msg)
    self.assertRegex(title.source, r'# ' + notebook.metadata.colab.name, msg)

  def high_level_description_after_title(self, notebook, colab):
    msg = f'{colab} [{URL}#description]'
    self.assertGreaterEqual(len(notebook.cells), 4, msg)
    description = notebook.cells[3]
    self.assertEqual('markdown', description.cell_type, msg)
    self.assertIn('source', description.keys(), msg)
    for line in description.source.split('\n'):
      if len(line) and line[0] == '#':
        self.fail(f'{msg}: description cannot have headings: {line}')

  def has_overview(self, notebook, colab):
    msg = f'{colab} [{URL}#overview]'
    self.assertGreaterEqual(len(notebook.cells), 5, msg)
    cell = notebook.cells[4]
    self.assertEqual('markdown', cell.cell_type, msg)
    self.assertIn('source', cell.keys(), msg)
    if cell.source != '## Overview':
      self.fail(f'{msg}: missing overview')

  def has_learning_objectives(self, notebook, colab):
    msg = f'{colab} [{URL}#learning-objectives]'
    self.assertGreaterEqual(len(notebook.cells), 6, msg)
    cell = notebook.cells[5]
    self.assertEqual('markdown', cell.cell_type, msg)
    self.assertIn('source', cell.keys(), msg)
    lines = cell.source.rstrip().split('\n')
    if lines[0] != '### Learning Objectives':
      self.fail(f'{msg}: missing learning objectives')
    if lines[1]:
      self.fail(f'{msg}: learning objectives missing empty line after header')
    for line in lines[2:]:
      self.assertRegex(line, r'\s*\* \w+',
                       f'{msg}: only bullet points allowed')

  def has_prerequisites(self, notebook, colab):
    msg = f'{colab} [{URL}#prerequisites]'
    self.assertGreaterEqual(len(notebook.cells), 7, msg)
    cell = notebook.cells[6]
    self.assertEqual('markdown', cell.cell_type, msg)
    self.assertIn('source', cell.keys(), msg)
    lines = cell.source.rstrip().split('\n')
    if lines[0] != '### Prerequisites':
      self.fail(f'{msg}: missing prerequisites')
    if lines[1]:
      self.fail(f'{msg}: prerequisites missing empty line after header')
    for line in lines[2:]:
      self.assertRegex(line, r'\s*\* \w+',
                       f'{msg}: only bullet points allowed')

  def has_estimated_duration(self, notebook, colab):
    msg = f'{colab} [{URL}#duration]'
    self.assertGreaterEqual(len(notebook.cells), 8, msg)
    cell = notebook.cells[7]
    self.assertEqual('markdown', cell.cell_type, msg)
    self.assertIn('source', cell.keys(), msg)
    lines = cell.source.rstrip().split('\n')
    if len(lines) != 3:
      self.fail(f'{msg}: expected 3 lines in duration cell')
    if lines[0] != '### Estimated Duration':
      self.fail(f'{msg}: missing estimated duration')
    if lines[1]:
      self.fail(f'{msg}: estimated duration missing empty line after header')
    self.assertRegex(lines[2], r'\s*\d+ minutes',
                     f'{msg}: malformed duration minutes')

  def are_exercises_formatted_correctly(self, notebook, colab):
    msg = f'{colab} [{URL}#exercises]'

    exercises_index = -1
    exercise_indices = []
    end_bound = -1

    for i, cell in enumerate(notebook.cells):
      if cell.cell_type == 'markdown':
        if re.match(r'#+\s+Exercises', cell.source):
          if exercises_index > -1:
            self.fail(f'{msg} more than one Exercises heading')
          exercises_index = i
          if not cell.source.startswith('# Exercises'):
            self.fail(f'{msg} exercises header should be top-level')
        elif re.match(r'#+\s+Exercise', cell.source):
          if exercises_index < 0:
            self.fail(f'{msg} individual exercises found before section')
          if end_bound > -1:
            self.fail(f'{msg} individual xercise found after section')
          if not cell.source.startswith('## Exercise'):
            self.fail(f'{msg} exercise headers should be second-level')
          exercise_indices.append(i)
        elif exercises_index > -1 and cell.source.startswith('# '):
          end_bound = i
          break

    if end_bound > -1:
      self.fail(f'{msg}: exercises should be the last section')

    if end_bound < 0:
      end_bound = len(notebook.cells)

    if exercises_index > -1 and not exercise_indices:
      self.fail(f'{msg} exercises header, but no actual exercises found')

    if exercises_index == -1 and exercise_indices:
      self.fail(f'{msg} individual exercises found, but no exercises header')

    if exercises_index == -1 and not exercise_indices:
      if '00_introduction_to_colab' not in colab:
        self.fail(f'{msg} no exercises found in colab')

    # Ensure each exercise is well-formed
    for i, exercise_index in enumerate(exercise_indices):
      start = exercise_index
      exercise_end_index = end_bound
      if i+1 < len(exercise_indices):
        exercise_end_index = exercise_indices[i+1]
      self.assertRegex(notebook.cells[start].source, '## Exercise ' + str(i+1)
                       + r'''(: [\(\)\w \d?'",-]+)?$''', msg)

      exercise_name = notebook.cells[exercise_index].source[3:]
      emsg = f'{msg} [{exercise_name}]'

      # Move past the "## Exercise..." header
      start += 1

      student_solution_index = -1
      answer_key_index = -1
      solution_index = -1
      validation_index = -1

      for ii in range(start, exercise_end_index):
        cell = notebook.cells[ii]
        if cell.cell_type == 'markdown':
          if cell.source == '### Student Solution':
            if student_solution_index > -1:
              self.fail(f'{emsg} multiple student solution headers found')
            student_solution_index = ii
          elif cell.source == '### Answer Key':
            if answer_key_index > -1:
              self.fail(f'{emsg} multiple answer key headers found')
            if ('collapsed_sections' not in notebook.metadata.colab or
                cell.metadata.id not in
                notebook.metadata.colab.collapsed_sections):
              self.fail(f'{emsg} answer key sections must be collapsed')
            answer_key_index = ii
          elif cell.source == '**Solution**':
            if solution_index > -1:
              self.fail(f'{emsg} multiple solution markers found')
            solution_index = ii
          elif cell.source == '**Validation**':
            if validation_index > -1:
              self.fail(f'{emsg} multiple validation markers found')
            validation_index = ii
          elif cell.source.startswith('#'):
            self.fail(f'{emsg} unexpected header found: {cell.source}')

      if student_solution_index < 0:
        self.fail(f'{emsg} no student solution marker found')

      if answer_key_index < 0:
        self.fail(f'{emsg} no answer key marker found')

      if solution_index < 0:
        self.fail(f'{emsg} no solution marker found')

      if validation_index < 0:
        self.fail(f'{emsg} no validation marker found')

      if answer_key_index - student_solution_index < 2:
        self.fail(f'{emsg} no student solution placeholder found')

      if validation_index - solution_index < 2:
        self.fail(f'{emsg} no solution content found')

      if exercise_end_index - validation_index < 2:
        self.fail(f'{emsg} no validation content found')


if __name__ == '__main__':
  googletest.main()
