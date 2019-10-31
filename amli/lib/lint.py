# python3

"""Wrappers for AMLI Colab lint errors."""

PYTHON_VERSION_DISPLAY_NAME = 'Python 3'
PYTHON_VERSION_NAME = 'python3'
STYLE_URL = 'http://g3doc/engedu/fuzzy/amli/g3doc/colab_style_guide.md'


class LintError(object):
  """LintError is the base class for all types of AMLI Colab lint errors."""

  def __str__(self):
    return 'Generic lint error.'

  def __repr__(self):
    return 'LintError()'


class Linter(object):
  """Linter is the base class for all lint checks for AMLI colabs."""

  def lint(self, colab):
    """Runs all lint checks and returns a list of lint violations.

    Args:
      colab: colab to lint

    Returns:
      List of LintError objects representing lint violations.
    """
    errors = []
    for linter in (
        DuplicateCellIDLinter(),
        PythonNameLinter(),
        PythonDisplayNameLinter(),
        PrivateOutputsLinter(),
        TableOfContentsLinter(),
        OutputDataLinter(),
        ):
      lint_error = linter.lint(colab)
      if lint_error:
        errors.append(lint_error)
    return errors


class DuplicateCellIDLinter(Linter):
  """Duplicate cell ID linter checks for duplicate cell IDs in a colab."""

  def lint(self, colab):
    """Runs a lint check and returns a lint violation or None.

    Args:
      colab: colab to lint

    Returns:
      LintError object representing lint violations or None.
    """
    duplicates = set()
    ids = set()

    for cell in colab.cells:
      if cell.metadata.id in ids:
        duplicates.add(cell.metadata.id)
      ids.add(cell.metadata.id)

    if duplicates:
      return DuplicateCellIDs(duplicates)
    return None


class DuplicateCellIDs(LintError):
  """Duplicate cell IDs found lint error."""

  def __init__(self, cell_ids):
    self._cell_ids = cell_ids

  def __str__(self):
    return (f'Duplicate cell IDs found: {self._cell_ids} '
            '[{STYLE_URL}#dupe-ids]')

  def __repr__(self):
    if self._cell_ids:
      return "DuplicateCellIDs(['" + "', '".join(self._cell_ids) + "'])"
    return 'DuplicateCellIDs([])'


class PythonNameLinter(Linter):
  """Validates the Python version declared by the colab."""

  def lint(self, colab):
    """Runs a lint check and returns a lint violation or None.

    Args:
      colab: colab to lint

    Returns:
      LintError object representing lint violations or None.
    """
    if PYTHON_VERSION_NAME != colab.kernelspec['name']:
      return WrongPythonName(colab.kernelspec['name'])
    return None


class WrongPythonName(LintError):
  """Wrong Python name lint error."""

  def __init__(self, name):
    self._name = name

  def __str__(self):
    return (f'Python name setting is {self._name}. The '
            f'setting should be {PYTHON_VERSION_NAME}. '
            '[{STYLE_URL}#python-version]')

  def __repr__(self):
    return f"WrongPythonName('{self._name}')"


class PythonDisplayNameLinter(Linter):
  """Validates the Python display name."""

  def lint(self, colab):
    """Runs a lint check and returns a lint violation or None.

    Args:
      colab: colab to lint

    Returns:
      LintError object representing lint violations or None.
    """
    if PYTHON_VERSION_DISPLAY_NAME != colab.kernelspec['display_name']:
      return WrongPythonDisplayName(colab.kernelspec['display_name'])
    return None


class WrongPythonDisplayName(LintError):
  """Validates the Python name."""

  def __init__(self, name):
    self._name = name

  def __str__(self):
    return (f'Python display_name setting is {self._name}. The '
            f'setting should be {PYTHON_VERSION_DISPLAY_NAME}. '
            '[{STYLE_URL}#python-version]')

  def __repr__(self):
    return f"WrongPythonDisplayName('{self._name}')"


class PrivateOutputsLinter(Linter):
  """Validates the private outputs setting."""

  def lint(self, colab):
    """Runs a lint check and returns a lint violation or None.

    Args:
      colab: colab to lint

    Returns:
      LintError object representing lint violations or None.
    """
    if colab.private_outputs:
      return None
    return PrivateOutputsOff()


class PrivateOutputsOff(LintError):
  """Private outputs are set to off lint error."""

  def __str__(self):
    return (f'Private outputs are set to off or not set (defaults to off). '
            '[{STYLE_URL}#private-outputs]')

  def __repr__(self):
    return 'PrivateOutputsOff()'


class TableOfContentsLinter(Linter):
  """Validates the table of contents setting."""

  def lint(self, colab):
    """Runs a lint check and returns a lint violation or None.

    Args:
      colab: colab to lint

    Returns:
      LintError object representing lint violations or None.
    """
    if colab.toc_visible:
      return None
    return TableOfContentsHidden()


class TableOfContentsHidden(LintError):
  """The table of contents is hidden lint error."""

  def __str__(self):
    return (f'Table of contents visibility is set to hidden or not set '
            '(defaults to hidden). [{STYLE_URL}#toc-visible]')

  def __repr__(self):
    return 'TableOfContentsHidden()'


class OutputDataLinter(Linter):
  """Ensures that all output data is cleared."""

  def lint(self, colab):
    """Runs a lint check and returns a lint violation or None.

    Args:
      colab: colab to lint

    Returns:
      LintError object representing lint violations or None.
    """
    ids = set()

    for cell in colab.cells:
      if 'outputs' in cell and cell.outputs:
        ids.add(cell.metadata.id)

    if ids:
      return OutputDataFound(ids)

    return None


class OutputDataFound(LintError):
  """Output data found lint error."""

  def __init__(self, cell_ids):
    self._cell_ids = cell_ids

  def __str__(self):
    return (f'Output data found in the following cells: {self._cell_ids} '
            '[{STYLE_URL}#empty-outputs]')

  def __repr__(self):
    if self._cell_ids:
      return "OutputDataFound(['" + "', '".join(self._cell_ids) + "'])"
    return 'OutputDataFound([])'
