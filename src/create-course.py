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
import os, sys, shutil, getopt, re, time
import json
import subprocess
import nbformat

from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload, MediaUpload
from google.auth.transport.requests import Request
from tools import drive_integration, format_colab

# TODO make this work when executed from root directory of repository
CONTENT = "../v2" 

# Used for md2gslides
re_slides = re.compile(r"View your presentation at: https://docs\.google\.com/"
                       r"presentation/d/([a-zA-Z0-9-_]+)")

def md_to_slides(file: str, parent, service=None):
    """ Converts
    """
    with open(file, "r") as f:
        head = f.read(40)
    # print(head)
    
    marp = False
    if re.search(r"marp:\strue",head):
        marp = True
    
    if marp:
        print(file)
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
        newFile = file[:-2]+"pptx"
        presentation_id = upload(service, 
                                 "slides", 
                                 newFile, 
                                 parent, 
                                 "slides"
                                )
        os.remove(newFile)
    else:
        gslides = subprocess.run(
            [
                "md2gslides",
                "-n",
                "--use-fileio",
                "-t slides",
                file
            ],
            capture_output=True,
            text=True,
            timeout=120 # Time out if process takes > 2 min
        ) 
        # print(f"\x1b[31m{gslides.stdout=}\x1b[0m\n")
        match = re.search(re_slides,gslides.stdout)

        if match:
            presentation_id = match.group(1)
            # print(f"{presentation_id=}\n")
            # Retrieve the existing parents to remove
            file = service.files().get(fileId=presentation_id, # pylint: disable=no-member
                                        fields='parents',
                                        supportsAllDrives=True).execute()
            previous_parents = ",".join(file.get('parents'))
            # Move the file to the new folder
            file = service.files().update(fileId=presentation_id, # pylint: disable=no-member
                                            addParents=parent,
                                            removeParents=previous_parents,
                                            fields='id, parents',
                                            supportsAllDrives=True).execute()
            # print("Waiting for API rate limit...\n\n")
            # time.sleep(60) # Wait sixty seconds for API
        else:
            presentation_id = "error"
            print("\x1b[31mmd2gslides failed to upload\x1b[0m")
            # raise ChildProcessError("md2gslides failed to create presentation")
    return presentation_id



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
                                  supportsAllDrives=True).execute()
    file_id = file.get("id")
    # print(f"Track ID: {file_id}")
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
    elif ftype == "slides":
        mimeType = "application/vnd.google-apps.presentation"
    else:
        mimeType = "text/plain"

    print(f"\x1b[32m{mimeType=}\x1b[0m")
    file_metadata = {"name": filename,
                     "mimeType": mimeType,
                     "parents": [parent]
                    }
    # print(file_metadata)
    # media = {f"{loc}", 'mimetype': mimeType, resumable=True}

    file = service.files().create( #uploadType='multipart',
                                  body=file_metadata,
                                  media_body=f"{loc}",
                                #   fields="id",
                                  supportsAllDrives=True
                                  ).execute()
  
    # print(f"File ID: {file.get('id')}")
    return file.get('id')


def update_colab_link(slides, colab_id):
    with open(slides,"r", encoding="latin1") as f:
        md = f.read()
  
    x = re.sub(r"https://colab.research.google.com/drive/[a-zA-Z0-9\-]+", 
        "https://colab.research.google.com/drive/" + colab_id, md) #matches for re- 

    with open("slidesTest.md", "w") as f:    
        f.write(x)


def create_student_colab(colab):
    notebook = nbformat.read(colab, nbformat.NO_CONVERT)

    notebookNew = notebook
    student = colab.replace(".ipynb", "[student].ipynb")

    notebookNew.cells = [cell for cell in notebook.cells if not cell.source.startswith('##### Answer Key')]
    nbformat.write(notebookNew, student, version=nbformat.NO_CONVERT)
    
    


def main(args):

    # Get arguments for source and destination folders
    # opts, args = getopt.getopt(sys.argv[1:],"g")
    if len(args) > 1:
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
        if not re.match(r"^xx_.*", track):
            path = f"{CONTENT}/{track}"
        
            # track_info = json.load(open(f"{path}/metadata.json"))
            # track_name = track_info["name"]
            
            # Create track folder in drive
            track_id = create_file(service, track, folder_id)

            units = get_sub_folders(track)
            for unit in units:
                if not re.match(r"^res$", unit): # Don't check img folders
                    # Create empty folder on google drive and get id
                    unit_id = create_file(service, unit, track_id)
                    
                    unit_info = json.load(open(f"{path}/{unit}/metadata.json"))
                    # unit_name = unit_info.get('name')

                    # Upload colabs
                    colab_id = ""
                    if (colabs := unit_info.get('colabs')):
                        print("test")
                        for colab in colabs:
                            create_student_colab(f"{path}/{unit}/{colab}")
                            student_colab = colab.replace(".ipynb", "[student]")
                            # Upload teacher version
                            colab_id = upload(service,
                                   colab,
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
                    if (slides := unit_info.get('slides')):
                        for slide_deck in slides:
                            if not re.match(r"https://docs.google.com/presentation/d/[a-zA-Z0-9\-]+", slide_deck):
                                # update_colab_link(slide_deck, colab_id)
                                presentation_id = md_to_slides(
                                                    f"{path}/{unit}/{slide_deck}",
                                                    unit_id,
                                                    service
                                                  )
    print("\x1b[32mDone")

if __name__ == "__main__":
    app.run(main)