"""make_student_versions.py copies labs without answers.

  $ tools/make_student_versions.py
"""

from absl import app
from pathlib import Path

import getpass
import nbformat
import os
import pyminizip


def main(argv):
  password = None

  home = str(Path.home())
  password_file = os.path.join(home, '.amli')
  if os.path.exists(password_file):
    with open (password_file) as f:
      password = f.read().replace('\n', '')
  else:
    password = getpass.getpass("Password: ")

  for root, _, files in os.walk('content'):
    for name in files:
      if name.endswith('-key.zip'):
        zname = os.path.join(root, name)

        key_name = zname.replace('.zip', '.ipynb')
        pyminizip.uncompress(zname, password, None, 0)

        lab_name = zname.replace('-key.zip', '.ipynb')
        nb = nbformat.read(key_name, as_version=4)
        cells = []
        in_answer_key = False
        for cell in nb.cells:
          if in_answer_key:
            if cell.cell_type == 'markdown' and cell.source == '---':
              in_answer_key = False
            if cell.cell_type == 'markdown' and cell.source.startswith('#'):
              raise Exception(dest_f, cell)
          else:
            if cell.cell_type == 'markdown' and '# Answer Key' in cell.source:
              in_answer_key = True
            else:
              cells.append(cell)
        nb.cells = cells
        nbformat.write(nb, lab_name)
        os.remove(key_name)

if __name__ == '__main__':
  app.run(main)
