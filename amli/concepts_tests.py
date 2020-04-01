"""Tests for the AMLI concepts YAML."""

from absl.testing import absltest
from yaml import load, scanner


class ConceptsTest(absltest.TestCase):

  def test_yaml(self):
    try:
        from yaml import CLoader as Loader, CDumper as Dumper
    except ImportError:
        from yaml import Loader, Dumper
    with open('amli/concepts.yaml', 'r') as stream:
      try:
        _ = load(stream, Loader=Loader)
      except scanner.ScannerError:
        self.fail('Unable to parse concepts.yaml')
