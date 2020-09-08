"""lock_labs.py zips and password-protects labs.

  $ tools/lock_labs.py
"""

from absl import app
from pathlib import Path

import getpass
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
      if name.endswith('-key.ipynb'):
        lname = os.path.join(root, name)
        zname = lname.replace('.ipynb', '.zip')
        if os.path.exists(zname):
          os.remove(zname)
        pyminizip.compress(lname, root, zname, password, 0)
        os.remove(lname)


if __name__ == '__main__':
  app.run(main)
