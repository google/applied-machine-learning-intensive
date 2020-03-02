#!/usr/bin/python3

"""
Copyright 2020 Google Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
"""

# Agenda:
"""
The script should accept a git repository and Google Drive folder URL as
arguments

$ amli create-course \
$   https://github.com/google/applied-machine-learning-intensive \
$   https://drive.google.com/drive/u/0/folders/0Bz9sbDA

The drive folder referenced is a folder created by the operator that will be
shared with an instructor who will be teaching an instance of the course. The
script will:
-   Scan the git repository for course materials.

-   Create sub-folders in the Google Drive folder for each track and unit in
    the repository.

-   For each unit:

    -   Open the unit metadata.json file.

    -   If there are IPython notebooks referenced in the metadata:

        -   Put a copy of each notebook in the appropriate unit folder after
            stripping out metadata such as "Concepts" blocks. This will be the
            instructor copy of the notebook.

        -   Change the notebook metadata in drive to ensure that the notebook
            opens in Colab.

        -   Create a second copy of each notebook in the appropriate unit
            folder. The second copy will be student copy of the notebook. The
            notebook should have all answer keys and concept blocks removed.

    -   If there are slides referenced in the metadata:

        -   Scan the slide markdown for links to colabs. If found, modify the
            link to reference the student version of the colab created earlier.

        -   Run those slides through ​md2googleslides​ to convert markdown to
            slide
        -   Put the Google Slides in the appropriate unit folder.

    -   If there are documents referenced in the metadata:

        -   Convert the markdown to a Google Doc and place it in the
            appropriate unit folder.
    -   Create a single course map document that links to all of the generated
        content for the course. This course map should exist at the top level
        of the Google Drive passed to the script.
"""

from absl import app
import os, sys, shutil, getopt, re
import json
import nbformat

from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from tools import drive_integration, format_colab



# TODO make this work when executed from root directory of repository
CONTENT = "../content" 

def get_sub_folders(folder: str = ""):
    """ Returns a list of subfolders folders as strings. Defaults to the top 
    level content folder if not given an argument.

    Args:
        folder: str
            specifies a folder to open. Optional, Defaults to the top-level 
            content folder
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


def create_file(service, filename: str, parent: str) -> str:
    """Creates a new folder in a specified parent directory in Google Drive 
    using the API

    Inputs:
        service:        An API resource that the call is being made to 
        filename: str - A name for the file to be created
        parent:   str - The id of the parent directory for the file to be 
                        created in
    Returns:    
        The id of the newly created file
    """
    file_metadata = {
            "name": filename,
            "mimeType": "application/vnd.google-apps.folder",
            "parents": [parent]
        }
    print(f"Creating File: {file_metadata['name']}" \
          f" in folder with ID: {file_metadata['parents']}")
    file = service.files().create(body=file_metadata,   # pylint: disable=no-member
                                  fields="id",
                                  supportsAllDrives=True)
    file = file.execute()
    file_id = file.get("id")
    # print(f"Track ID: {file_id}")
    return file_id

def upload(service, filename: str, parent: str):
    """ Uploads a file to Google Drive using the API
    
    Inputs:

    Returns:

    """
    if re.match(r".ipynb",filename):
        mimeType = "application/vnd.google.colaboratory"
    elif re.match(r".md",filename):
        mimeType = "text/markdown"
    else:
        mimeType = "text/plain"
    file_metadata = {"name": filename,
                     "mimeType": mimeType,
                     "parents": [parent]
                    }
    
    file = service.files().create(body=file_metadata,
                                  uploadType="multipart",
                                  fields="id").execute()
    print(f"File ID: {file.get('id')}")


def update_colab_link():
    f = open("slidesTest.md","r", encoding="latin1")
    md = f.read()
    f.close()
    newLink = "test"
    x = re.sub(r"https://colab.research.google.com/drive/[a-zA-Z0-9\-]+", 
        "https://colab.research.google.com/drive/" + newLink, md) #matches for re- 

    with open("slidesTest.md", "w") as f:    
        f.write(x)

def scan_metadata():
    with open("metadata.json", "r+") as f:
        data = json.load(f)
        for label in data:
            if 'slides' in label:
                update_colab_link()
                #data[label] = ["link"] #need to change to be correct
            if 'documents' in label: # would they be label documents or materials, handouts etc
                # do they have convertor for docs similar to mg2sldies
                print("")
    with open("metadate.json", 'w') as f:
        f.write(json.dumps(data))

def edit_colabmd():
    with open("test.ipynb", "r+") as f:
        notebook = nbformat.read(f, as_version=4)
        for cell in notebook.cells:
            if cell.source.startswith('> Concepts'):
                ## delete concepts block
                print("la")
    
    #nbformat.write(notebook, f)


def main(args):
    edit_colabmd()
    # Get arguments for source and destination folders
    # opts, args = getopt.getopt(sys.argv[1:],"g")
    # if opts and "-g" in opts[0]: # Can use "-g" to specify local repository
    #     drive = args[0]
    if len(args) > 1:
        # repo = args[0]
        folder_id = get_id_from_link(args[1])
        print(folder_id)
    else:
        raise SystemExit("\x1b[31m" # Set text color to red
                         "Error: No source or destination given.\n"
                         "\x1b[32m" # Set text color to green
                         "Usage: create-course.py [-g | <repo folder>] "
                         "<Google-Drive folder shareable link>"
                         "\x1b[0m" # Reset text color
                        )
    
    # authenticate google drive
    creds = drive_integration.authenticate()

    # Connect to drive api
    service = build("drive", "v3", credentials=creds)

    tracks = get_sub_folders()
    for track in tracks:
        path = f"{CONTENT}/{track}"
        
        track_info = json.load(open(f"{path}/metadata.json"))
        track_name = track_info["name"]
        
        # Create track folder in drive
        track_id = create_file(service, track, folder_id)

        units = get_sub_folders(track)
        for unit in units:
            unit_id = create_file(service, unit, track_id)
            
            unit_info = json.load(open(f"{path}/{unit}/metadata.json"))
            unit_name = unit_info["name"]
            
            # debugging
            # print(f"\033[KGenerating: {unit_name}",end="\r",flush=True)
            # TODO create unit folder in drive
        #     os.mkdir((dest := f"{temp_folder}/{track}/{unit}"))

        #     if (colabs := unit_info.get("colabs")):
        #         for nb in colabs:
        #             src = f"{path}/{unit}/{nb}"
        #             dest_nb = f"{dest}/{nb}"                        
        #             shutil.copy(src,dest_nb)
        #             format_colab.format_colab(dest_nb)
        #             # TODO update metadata.json to link to copy
        #             pass
    # print("\033[KDone")
    print("Done")

if __name__ == "__main__":
    app.run(main)