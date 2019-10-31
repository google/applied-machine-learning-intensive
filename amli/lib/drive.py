# python3

"""Functions for AMLI integration with Google Drive."""

import os
import pathlib
import pickle

from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

# The secrets file contains data downloaded from the Google Cloud Console that
# is used to trigger an authentication flow.
CLIENT_SECRETS_FILE_NAME = '.amli-secrets.json'

# The credentials file contains expiring credentials that are cached after
# a valid authentication.
CREDENTIALS_FILE_NAME = '.amli.credentials'
SCOPES = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.metadata.readonly',
]


def _get_client_secrets_file_path():
  """Get the path to the client secrets file.

  Returns:
    A string containing the path to the client secrets file.
  """
  home = str(pathlib.Path.home())
  return os.path.join(home, CLIENT_SECRETS_FILE_NAME)


def _get_credentials_file_path():
  """Get the path to the credentials file.

  Returns:
    A string containing the path to the credentials file.
  """
  home = str(pathlib.Path.home())
  return os.path.join(home, CREDENTIALS_FILE_NAME)


def _get_cached_credentials():
  """Loads cached credentials.

  Returns:
    The credentials object or None if credentials were not found.
  """
  path = _get_credentials_file_path()

  if not os.path.exists(path):
    return None

  with open(path, 'rb') as creds_file:
    return pickle.load(creds_file)


def _valid_credentials(creds):
  """Checks the state of the provided credentials.

  Args:
    creds: credentials to check for validity.
  Returns:
    Returns True if the credentials are good and False otherwise.
  """
  return creds and creds.valid


def _can_refresh_credentials(creds):
  """Checks to see if the credentials can be refreshed.

  Args:
    creds: the credentials that might be eligible for refreshing
  Returns:
    Returns True if a refresh is possible, False if a new auth flow is needed.
  """
  return creds and creds.expired and creds.refresh_token


def _generate_new_credentials():
  """Runs the auth flow for new credentials.

  Returns:
    A new credentials object.
  """
  flow = InstalledAppFlow.from_client_secrets_file(
      _get_client_secrets_file_path(), SCOPES)
  return flow.run_local_server()


def _store_credentials(creds):
  """Caches updated credentials.

  Args:
    creds: credentials to cache.
  """
  with open(_get_credentials_file_path(), 'wb') as token:
    pickle.dump(creds, token)


def authenticate():
  """Authenticates command line users for AMLI/Google Drive integration."""
  credentials = None

  credentials = _get_cached_credentials()

  if _valid_credentials(credentials):
    return

  if _can_refresh_credentials(credentials):
    credentials.refresh(Request())
  else:
    credentials = _generate_new_credentials()
  _store_credentials(credentials)
