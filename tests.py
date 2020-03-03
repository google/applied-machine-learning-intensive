# python3
"""Tests for the AMLI project.
"""

import unittest
from absl import app
from absl import flags


FLAGS = flags.FLAGS


def main(_):
  unittest.main(
      argv=['tests.py', 'discover', '-s', 'amli', '-p', '*_tests.py'],
      module=None
  )


if __name__ == '__main__':
  app.run(main)

