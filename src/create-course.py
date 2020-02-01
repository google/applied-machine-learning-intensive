#!/usr/bin/python3

"""
Copyright 2020 Google Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on angit "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
"""

from absl import app
import os, sys, re, time
import json
import subprocess
import nbformat

from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload, MediaUpload
from google.auth.transport.requests import Request
from tools import drive_integration, format_colab

CONTENT = "./v2" 


def md_to_slides(file: str, name: str, parent: str, service):
    """ Converts a markdown file to a powerpoint using Marp and uploads it to
    Google Drive.
    
    Inputs:
        file:   str - A markdown file to be converted to slides using Marp.
        name:   str - The desired name for the file on Google Drive.
        parent: str - The id of the parent folder for the slides to be uploaded
                      into on Google Drive.
        service:      An API resource.

    Returns:
        The file id of the powerpoint on Google Drive.
    """
    with open(file, "r") as f:
        head = f.read(40)
    
    marp = False
    if re.search(r"marp:\strue",head):
        marp = True
    
    if marp:
        print(f"Converting {file} to Powerpoint...")
        gslides = subprocess.run(
            [
                "marp",
                "--pptx",
                "--allow-local-files", # Not Secure
                "--title", 
                "'slides'",
                file
            ],
            capture_output=True,
            text=True,
            timeout=120 # Time out if process takes > 2 min
        )
        # Un-escape stderr from subprocess and print it.
        stderr = (gslides.stderr
                  .encode('latin1')
                  .decode('unicode-escape')
                  .encode('latin1')
                  .decode("utf-8")
                 )
        print("\x1b[33m"
              f"{stderr}"
              "\x1b[0m")

        # upload Powerpoint file
        newFile = file[:-2]+"pptx"
        presentation_id = upload(service, 
                                 name, 
                                 newFile, 
                                 parent, 
                                 "powerpoint"
                                )
        os.remove(newFile)
    else:
        print("\x1b[31m"
              f"{file} not configured for Marp, skipping"
              "\x1b[0m")
        presentation_id = None
    return presentation_id



def get_sub_folders(folder: str = ""):
    """ Returns a list of subfolders folders as strings. Defaults to the top 
    level content folder if not given an argument.

    Inputs:
        folder: str - specifies a folder to open. Optional, Defaults to the 
                      top-level content folder
    Returns:    
        a list of subfolders within the given folder.
    """
    path = f"{CONTENT}/{folder}"
    contents = [sub_folder for sub_folder 
                in os.listdir(path) 
                if os.path.isdir(f"{path}/{sub_folder}")]
    return contents


def get_id_from_link(url: str) -> str:
    """ Returns the id for a file on Google Drive when given a link to that file

    Input:
        url: a link to a file on Google Drive
    Returns:
        a string containing a file id
    """
    if url[-12:] == "?usp=sharing": # Convert share links to direct links
        url = url[:-12]
    folder_id = re.split(r"[/.]",url)[-1] # extract id from drive link
    return folder_id


def create_folder(service, filename: str, parent: str, level: str) -> str:
    """Creates a new folder in a specified parent directory in Google Drive 
    using the API

    Inputs:
        service:        An API resource that the call is being made to 
        filename: str - A name for the folder to be created
        parent:   str - The id of the parent directory for the file to be 
                        created in
        level:    str - Folder is either a 'track' folder or a 'unit' folder
    Returns:    
        The id of the newly created folder
    """
    file_metadata = {
            "name": filename,
            "mimeType": "application/vnd.google-apps.folder",
            "parents": [parent]
        }
    print( "\x1b[32m"
          f"Creating {level} folder: {file_metadata['name']}"
           "\x1b[0m"
          )
    file = service.files().create(body=file_metadata,
                                  fields="id",
                                  supportsAllDrives=True).execute()
    file_id = file.get("id")
    return file_id

def upload(service, filename: str, loc: str, parent: str, ftype: str = ""):
    """ Uploads a file to Google Drive using the API
    
    Inputs:
        service:    The google API service
        filename:   The name for the uploaded file on google drive
        loc:        The location of the file to be uploaded
        parent:     The id of the parent folder on google drive
        ftype:      The type of the file being uploaded
    Returns:
        The id of the uploaded file
    """
    # Set MIME type for upload
    if ftype == "colab":
        mimeType = "application/vnd.google.colaboratory"
    elif ftype == "markdown":
        mimeType = "text/markdown"
    elif ftype == "powerpoint":
        mimeType = "application/vnd.openxmlformats-officedocument" \
                   ".presentationml.presentation"
    elif ftype == "slides":
        mimeType = "application/vnd.google-apps.presentation"
    else:
        mimeType = "text/plain"

    file_metadata = {"name": filename,
                     "mimeType": mimeType,
                     "parents": [parent]
                    }

    media = MediaFileUpload(loc, mimetype=mimeType)

    file = service.files().create(body=file_metadata,
                                  media_body=media,
                                  fields="id",
                                  supportsAllDrives=True
                                 ).execute()
  
    print( "\x1b[32m"
          f"Successfully uploaded {ftype} {loc}"
           "\x1b[0m")
    return file.get('id')

def create_student_colab(colab):
    notebook = nbformat.read(colab, nbformat.NO_CONVERT)

    notebookNew = notebook
    student = colab.replace(".ipynb", "[student].ipynb")

    notebookNew.cells = [cell for cell in notebook.cells if not 
                         cell.source.startswith('##### Answer Key')]
    nbformat.write(notebookNew, student, version=nbformat.NO_CONVERT)

# ------------------------------------------------------------------------------

def main(args):

    # Get argument for destination folder
    if len(args) > 1:
        folder_id = get_id_from_link(args[1])
    else:
        raise SystemExit("\x1b[31m" # Set text color to red
                         "Error: No source or destination given.\n"
                         "\x1b[32m" # Set text color to green
                         "Usage: create-course.py "
                         "[--clean] "
                         "<Google-Drive folder shareable link>"
                         "\x1b[0m" # Reset text color
                        )

    # Track elapsed time
    t_start = time.time()

    # Authenticate google drive
    creds = drive_integration.authenticate()

    # Connect to drive api
    service = build("drive", "v3", credentials=creds)

    tracks = get_sub_folders()
    for track in tracks:
        path = f"{CONTENT}/{track}"
        
        # Create track folder in drive
        track_id = create_folder(service, track, folder_id, "track")

        units = get_sub_folders(track)
        for unit in units:
            if not re.match(r"^res$", unit): # Don't check image folders

                # Create empty folder on google drive and get id
                unit_id = create_folder(service, unit, track_id, "unit")
                try:
                    unit_info = json.load(open(f"{path}/{unit}"
                                                "/metadata.json"))
                except Exception as error:
                    raise SystemExit("\x1b[31m"
                                        "invalid syntax in metadata.json for\n"
                                        f"track: {track}\n"
                                        f"\t∟ unit: {unit}\x1b[0m\n"
                                        f"{error}")

                # Upload colabs
                colab_id = ""
                colabs = unit_info.get('colabs')
                if colabs:
                    for colab in colabs:
                        create_student_colab(f"{path}/{unit}/{colab}")
                        student_colab = colab.replace(".ipynb", "[student]")
                        # Upload teacher version
                        colab_id = upload(service,
                                colab[:-6], # remove file extension from name
                                f"{path}/{unit}/{colab}",
                                unit_id,
                                "colab"
                                )
                        # Upload student version
                        colab_id = upload(service,
                                student_colab,
                                f"{path}/{unit}/{student_colab}.ipynb",
                                unit_id,
                                "colab"
                                )
                        # remove the student version after uploading
                        os.remove(f"{path}/{unit}/{student_colab}.ipynb")
                        
                
                # Upload slides
                slides = unit_info.get('slides')
                if slides:
                    for slide_deck in slides:

                        # check whether slide deck is a valid markdown file
                        if re.search(r"\.md$", slide_deck):
                            presentation_id = md_to_slides(
                                                f"{path}/{unit}/"
                                                f"{slide_deck}",
                                                slide_deck[:-3],
                                                unit_id,
                                                service
                                                )
                        else:
                            print("\x1b[31m"
                                    f"{slide_deck} is not a valid markdown "
                                    "file, skipping"
                                    "\x1b[0m")
                            presentation_id = None

        # For tracks without units, we still want to upload slides
        presentations = [filename for filename in os.listdir(path) 
                if re.search(r"\.md$", filename)]
        for pres in presentations:
            md_to_slides(f"{path}/{pres}", pres[:-3], track_id, service)

    # Stop timer
    t_stop = time.time()
    # Print elapsed time of process
    print("\x1b[33m"
          f"Process completed in {int((t_stop - t_start) / 60)} minutes, "
          f"{int((t_stop - t_start) % 60)} seconds"
          "\x1b[0m")

if __name__ == "__main__":
    app.run(main)