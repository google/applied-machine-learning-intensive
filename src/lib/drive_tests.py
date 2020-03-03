# python3

"""Tests for google3.engedu.fuzzy.amli.lib.drive."""

from google3.engedu.fuzzy.amli.lib import drive
from google3.testing.pybase import googletest


class DriveTest(googletest.TestCase):

  def test_get_client_secrets_file_path(self):
    file_path = drive._get_client_secrets_file_path()
    self.assertEqual(file_path[-len(drive.CLIENT_SECRETS_FILE_NAME):],
                     drive.CLIENT_SECRETS_FILE_NAME)

  def test_get_client_credentials_file_path(self):
    file_path = drive._get_credentials_file_path()
    self.assertEqual(file_path[-len(drive.CREDENTIALS_FILE_NAME):],
                     drive.CREDENTIALS_FILE_NAME)


if __name__ == '__main__':
  googletest.main()
