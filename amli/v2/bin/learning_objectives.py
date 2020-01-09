# Lint as: python3
"""TODO(jmcadams): DO NOT SUBMIT without one-line documentation for learning_objectives.

TODO(jmcadams): DO NOT SUBMIT without a detailed description of learning_objectives.
"""
import nbformat
import re

from absl import app
from absl import flags

FLAGS = flags.FLAGS

CONCEPTS_START = re.compile('\s*>?\s*concepts:\s*$', re.I)
CONCEPT = re.compile('\s*\*\s*(.*)$')

def objectives_from_notebook(notebook_file_name):
  nb = nbformat.read(notebook_file_name, 4)
  objectives = set()
  for cell in nb.cells:
    if cell['cell_type'] == 'markdown':
      objectives.update(objectives_from_markdown(cell))
  return objectives

def objectives_from_markdown(cell):
  in_concepts = False
  objectives = set()
  for line in cell['source'].splitlines():
    if not in_concepts and CONCEPTS_START.match(line):
      in_concepts = True
    elif in_concepts:
      matches = CONCEPT.match(line)
      if matches:
        objectives.add(matches.group(1))
      else:
        raise Exception('oops')
  return objectives

def main(argv):
  if len(argv) != 2:
    raise app.UsageError('Incorrect number of command-line arguments.')
  for objective in sorted(objectives_from_notebook(argv[1])):
    print(objective)

if __name__ == '__main__':
  app.run(main)
