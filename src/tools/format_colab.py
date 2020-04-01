# python3

"""format_colab reads a .ipynb file and writes it in a human-readable format.

Some tools save .ipynb files in a compact format. When this happens, it can be
difficult to diff the changes in the file. This tool reads an .ipynb file and
writes it out in a "pretty" format that can be more easily read by humans and
more easily processed by diff tools.
"""

from absl import app
from absl import flags

import nbformat

FLAGS = flags.FLAGS

def format_colab(fp):
  """ Inputs:
          fp: a file pointer to an ipython notebook and formats it in a human 
              readable way
      Output: None, edits in-place.
  """
  notebook = nbformat.read(fp, as_version=4)

  prior_ids = []
  new_ids = []
  exercise_count = 0
  for cell in notebook.cells:
    if cell.source.startswith('#### Copyright '):
      prior_ids.append(cell.metadata.id)
      cell.metadata.id = 'copyright'
      new_ids.append(cell.metadata.id)
    elif cell.source == '### Answer Key':
      exercise_count += 1
      prior_ids.append(cell.metadata.id)
      cell.metadata.id = f'exercise-{exercise_count}-key-1'
      new_ids.append(cell.metadata.id)

  for prior_id in prior_ids:
    if prior_id in notebook.metadata.colab.collapsed_sections:
      notebook.metadata.colab.collapsed_sections.remove(prior_id)
  notebook.metadata.colab.collapsed_sections.extend(new_ids)
  notebook.metadata.colab.private_outputs = True
  notebook.metadata.colab.toc_visible = True

  nbformat.write(notebook, fp)

def main(argv):
  if len(argv) != 2:
    raise app.UsageError('Please specify the file to format.')

  format_colab(argv[1])


if __name__ == '__main__':
  app.run(main)
