# python3
"""TODO(joshmcadams): DO NOT SUBMIT without one-line documentation for test.

TODO(joshmcadams): DO NOT SUBMIT without a detailed description of test.
"""

import unittest
from absl import app
from absl import flags


FLAGS = flags.FLAGS


def main(_):
  unittest.main(
      argv=['amli_tests.py', 'discover', '-s', 'amli/lib', '-p', '*_tests.py'],
      module=None
  )


if __name__ == '__main__':
  app.run(main)

