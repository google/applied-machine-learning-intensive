"""unlock_labs.py unzips password-protected labs.

  $ tools/unlock_labs.py
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
      if name.endswith('-key.zip'):
        zname = os.path.join(root, name)
        pyminizip.uncompress(zname, password, None, 0)


if __name__ == '__main__':
  app.run(main)
