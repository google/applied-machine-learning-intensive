# python3

"""format_colab reads a .ipynb file and writes it in a human-readable format.

Some tools save .ipynb files in a compact format. When this happens, it can be
difficult to diff the changes in the file. This tool reads an .ipynb file and
writes it out in a "pretty" format that can be more easily read by humans and
more easily processed by diff tools.
"""

# https://developers.google.com/drive/api/v3/reference/
# https://developers.google.com/drive/api/v3/manage-uploads
# https://developers.google.com/api-client-library/python/apis/drive/v2

from absl import app
from absl import flags

from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
#from google3.apiserving.clients.python.google.auth import corp_credentials

import pickle
import os.path
import os
import re
from googleapiclient.http import MediaFileUpload

FLAGS = flags.FLAGS

SCOPES = [
    'https://www.googleapis.com/auth/drive',
#    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.metadata.readonly',
#    'https://www.googleapis.com/auth/drive.photos.readonly',
#    'https://www.googleapis.com/auth/drive.readonly'
]


def authenticate():
  creds = None
#  creds = corp_credentials.get_corp_credentials(
#        None,  # Defaults to the current LOAS user.
#        SCOPES)
  user = os.path.expanduser('~')

  if os.path.exists(f'{user}/token.pickle'):
    with open(f'{user}/token.pickle', 'rb') as token:
      creds = pickle.load(token)

  if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
      creds.refresh(Request())
    else:
      flow = InstalledAppFlow.from_client_secrets_file(
          f'{user}/scripts/google3/credentials.json', SCOPES)
      creds = flow.run_local_server()
    # Save the credentials for the next run
    with open(f'{user}/token.pickle', 'wb') as token:
      pickle.dump(creds, token)

  return creds


def base_folder(service):
  BASE_FOLDER_ID = '163TmN-h5e2R5lZd9TXVi-yje_NlPDa6f'
  folder = service.files().get(fileId=BASE_FOLDER_ID).execute()

  # print(folder)
  # {'kind': 'drive#file', 'id': '163TmN-h5e2R5lZd9TXVi-yje_NlPDa6f', 'name': '[Content] Summer 2019', 'mimeType': 'application/vnd.google-apps.folder'}

  if folder['mimeType'] != 'application/vnd.google-apps.folder' or folder['kind'] != 'drive#file':
    raise Exception(folder)

  print(folder['name'])
  return folder

def track_folders(service, base):
  track_pattern = re.compile(r'([A-Z]+[0-9]*):\s.*')
  #track_pattern = re.compile('([A-Z]+07):\s.*')
  results = service.files().list(q='"' + base['id'] + '" in parents and trashed = false', pageSize=1000).execute()
  track_folders = {}
  for _, r in enumerate(results['files']):
    m = track_pattern.match(r['name'])
    if m:
      track_folders[m.group(1)] = r['id']
  return track_folders

# application/vnd.google.colaboratory
def find_colabs(service, fileId):
#  track_pattern = re.compile('([A-Z]+[0-9]*):\s.*')
  results = service.files().list(q='"' + fileId + '" in parents and trashed = false', pageSize=1000).execute()
  colabs = {}
  #print(results)
  for _, r in enumerate(results['files']):
    if r['name'].endswith('.ipynb') or r['mimeType'] == 'application/vnd.google.colaboratory':
      colabs[r['name']] = r['id']
    #print(i, r)
  #  m = track_pattern.match(r['name'])
  #  if m:
  #    track_folders[m.group(1)] = r['id']
  return colabs#track_folders


def main(argv):
  if len(argv) != 1:
    raise app.UsageError('Please specify the file to format.')

  creds = authenticate()
  service = build('drive', 'v3', credentials=creds)

  #bid = '1E7iNc6lcX8BUiWDcJP6bfEniS-0qqZhr'

 # print(service.files().get(fileId='1n8gmQDYlSQYtbDC6VZ1ESioCHVfkyOf2').execute())
 # print(service.files().get(fileId='1S8A5iZZk3L0lHCWZoq3bpWgbKibvFtaG').execute())
 # print(service.files().get(fileId='1rmaX8ws1jlF3BT_FIviXGhtjoVR1ArjG').execute())
 # exit()

  base = base_folder(service)
  tracks = track_folders(service, base)
  bucketized_id = None
  colabs_in_drive = {}
  for track, trackFileId in tracks.items():
    #print(track)
    for colab, colabFileId in find_colabs(service, trackFileId).items():
      if colab in colabs_in_drive:
        raise Exception(colab)
      colabs_in_drive[colab] = {
        'colabFileId': colabFileId,
        'track': track,
        'trackFileId': trackFileId,
      }

  #print(colabs_in_drive.keys())
  #exit()

  user = os.path.expanduser('~')

  for f in os.listdir('/tmp/amli'):
    if f.endswith('.ipynb'):# and f.startswith('T07'):
      just_name = f[0:len(f)-6]
      file_metadata = {
        'name': just_name,
        'mimeType': 'application/vnd.google.colaboratory'
      }
      local = os.path.join(f'{user}/tmp/amli', f)
      media = MediaFileUpload(local,
          mimetype='application/vnd.google.colaboratory',
          resumable=True)
      #print(file_metadata)
      if f in colabs_in_drive: # UPDATE
        print("Updating based on full name")
        print(service.files().update(fileId=colabs_in_drive[f]['colabFileId'], body=file_metadata, media_body=media).execute())
      elif just_name in colabs_in_drive: # UPDATE
        print("Updating based on just name")
        print(service.files().update(fileId=colabs_in_drive[just_name]['colabFileId'], body=file_metadata, media_body=media).execute())
      else: # CREATE
        print("Creating")
        file_metadata['parents']=[tracks[f[0:3]]]
        print(service.files().create(body=file_metadata, media_body=media).execute())

    #print(r['name'])
    #print(r)
    #print(f'{i}: {r}')
    #print(service.files().get(fileId=r['id']).execute().keys())
    #exit()
  #print(results)
  #files = results['files']
  #for file in files:
  #  print(file['name'])
#    if file['mimeType'] == 'application/vnd.google.colaboratory':
#      print(file['name'])
  #    permissions = service.permissions().list(fileId=file['id']).execute()
  #    for permission in permissions['permissions']:
  #      if permission['role'] == 'writer':
  #        service.permissions().update(fileId=file['id'], permissionId=permission['id'], body='role:reader').execute()
  #        #print(permission)
  #print(dir(folder))
  #results = service.children().list(folderId=CHECKPOINT_FOLDER).execute()
  #print(results)
  #results = service.files().list(
  #    pageSize=10,
  #    fields='nextPageToken, files(id, name)',
  #    driveId='163TmN-h5e2R5lZd9TXVi-yje_NlPDa6f',
  #    includeItemsFromAllDrives=True,
  #    supportsAllDrives=True,
  #    corpora='drive').execute()
  #items = results.get('files', [])
  #
  #if not items:
  #  print('No files found.')
  #else:
  #  print('Files:')
  #  for item in items:
  #    print(u'{0} ({1})'.format(item['name'], item['id']))

if __name__ == '__main__':
  app.run(main)
