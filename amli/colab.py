# python3

"""Classes for tracking and manipulating AMLI content."""

import re
import nbformat

from amli.lint import Linter

EXCEPTION_MISSING_TOP_LEVEL_KEY = 'notebook missing top-level key "{key}"'
EXCEPTION_MISSING_KERNELSPEC = 'notebook missing kernelspec metadata'
EXCEPTION_MISSING_COLAB_METADATA = 'notebook missing colab metadata'

REGEXP_LEVEL_ONE_HEADER = r'^(#)\s+\S+'
REGEXP_COPYRIGHT = r'^(#+)\s+Copyright(\s+.*)?'
REGEXP_OVERVIEW = r'^(#+)\s+Overview(\s+.*)?'
REGEXP_RESOURCES = r'^(#+)\s+Resources(\s+.*)?'
REGEXP_EXERCISES = r'^(#+)\s+Exercises(\s+.*)?'
REGEXP_EXERCISE = r'^(#+)\s+Exercise([:\s]+.*)?'
REGEXP_STUDENT_SOLUTION = r'^(#+)\s+Student Solution(\s+.*)?'
REGEXP_ANSWER_KEY = r'^(#+)\s+Answer Key(\s+.*)?'
REGEXP_LEARNING_OBJECTIVES = r'^(#+)\s+Learning Objectives(\s+.*)?'
REGEXP_PREREQUISITES = r'^(#+)\s+Prerequisites(\s+.*)?'
REGEXP_DURATION = r'^(#+)\s+Estimated Duration(\s+.*)?'
REGEXP_GRADING_CRITERIA = r'^(#+)\s+Grading Criteria(\s+.*)?'

LEVEL_TWO_HEADER = '## '

NOTEBOOK_VERSION = 4


class Colab(object):
  """A wrapper around an AMLI Colab file.

  Colab files are simply JSON objects stored stored in a text file with an
  '.ipynb' extension. AMLI Colabs are more structured based on the AMLI
  Colab style guide (go/amli:colab-style). This class wraps AMLI-formatted
  Colabs.
  """

  def __init__(self, notebook):
    self._notebook = notebook
    self.__check_top_level_keys()
    self.__load_metadata()
    self.__load_cells()

  @property
  def cells(self):
    return self._notebook.cells

  def __check_top_level_keys(self):
    """Ensures that the top-level keys exist in the notebook dictionary.

    Raises:
      Exception: when any of the top-level keys are missing.
    """

    for k in ('cells', 'metadata', 'nbformat', 'nbformat_minor'):
      if k not in self._notebook:
        raise Exception(EXCEPTION_MISSING_TOP_LEVEL_KEY.format(key=k))

  def __load_metadata(self):
    """Loads the metadata sub-section of a colab.

    Raises:
      Exception: when required metadata is missing.
    """

    metadata = self._notebook['metadata']

    if 'colab' not in metadata:
      raise Exception(EXCEPTION_MISSING_COLAB_METADATA)

    colab_metadata = metadata['colab']

    self.name = colab_metadata.get('name', '')
    self.private_outputs = colab_metadata.get('private_outputs', False)
    self.toc_visible = colab_metadata.get('toc_visible', False)
    self.collapsed_sections = colab_metadata.get('collapsed_sections', [])

    if 'kernelspec' not in metadata:
      raise Exception(EXCEPTION_MISSING_KERNELSPEC)

    self.kernelspec = {
        'name': metadata['kernelspec'].get('name', ''),
        'display_name': metadata['kernelspec'].get('display_name', ''),
    }

  def __load_cells(self):
    """Loads the cells sub-section of a colab."""

    cells = list(range(0, len(self._notebook['cells'])))

    self.copyright = self.__find_section(cells, REGEXP_COPYRIGHT)

    self.overview = self.__find_section(cells, REGEXP_OVERVIEW)
    overview_cells = [x for x in self.overview]
    self.learning_objectives = self.__find_section(
        overview_cells, REGEXP_LEARNING_OBJECTIVES)
    self.prerequisites = self.__find_section(
        overview_cells, REGEXP_PREREQUISITES)
    self.duration = self.__find_section(overview_cells, REGEXP_DURATION)
    self.grading_criteria = self.__find_section(
        overview_cells, REGEXP_GRADING_CRITERIA)

    self.resources = self.__find_section(cells, REGEXP_RESOURCES)

    self.exercises = self.__find_section(cells, REGEXP_EXERCISES)
    exercises_cells = [x for x in self.exercises[1:]] if self.exercises else []
    self.individual_exercises = []
    exercise_cells = self.__find_section(exercises_cells, REGEXP_EXERCISE)
    while exercise_cells:
      self.individual_exercises.append({
          'student_solution': self.__find_section(exercise_cells,
                                                  REGEXP_STUDENT_SOLUTION),
          'answer_key': self.__find_section(exercise_cells,
                                            REGEXP_ANSWER_KEY),
          'question': exercise_cells,
      })
      exercise_cells = self.__find_section(exercises_cells, REGEXP_EXERCISE)

    self.title = self.__find_section(cells, REGEXP_LEVEL_ONE_HEADER)

    self.content = cells

  def __find_section(self, cell_list, expr):
    """Finds a section of the document from a list of cells using an expression.

    The cells are searched in-order and the regular expression is applied to
    each markdown cell. The expression is expected to have a single group
    containing octothorpes (#). This is the heading marker for the section.

    Once a match is made, every subsequent cell is considered part of that
    section until the cell numbers have a break in them or until a heading at
    the current sections level or higher is encountered.

    The cell list is expect to be a list of cells that have not been previously
    classified as part of a section.

    The cell indices that constitute the section will be removed from the
    provided list of cells.

    Args:
      cell_list: ordered list of cells to search for the section
      expr: expression that starts the section (inclusive).

    Returns:
      An iterable of all indices that constitute the section.
    """

    section_list = []

    in_section = False
    for cell_index in cell_list:
      cell = self._notebook['cells'][cell_index]

      if in_section and cell.cell_type != 'markdown':
        section_list.append(cell_index)
        continue

      match = re.match(expr, cell['source'])

      if match and in_section:
        break

      if match:
        in_section = True
        expr = r'#{1,' + str(len(match.group(1))) + r'}\s+'

      if in_section:
        if section_list and cell_index - section_list[-1] > 1:
          break
        section_list.append(cell_index)

    for section_index in section_list:
      cell_list.remove(section_index)

    return section_list

  @classmethod
  def from_local_file(cls, path):
    """Loads a Colab object from a local file.

    Args:
      path: path to the local file.

    Returns:
      A Colab object.
    """
    return Colab(nbformat.read(path, as_version=NOTEBOOK_VERSION))

  def lint(self):
    """Performs a lint check of the colab.

    The AMLI style guide (go/amli:style) describes the look-and-feel of an
    AMLI colab. This method analyzes the colab and flags any style violations.

    Returns:
      List of LintError objects, one per violation.
    """
    return Linter().lint(self)
