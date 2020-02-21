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

# from pygithub import Github # currently unused
import os, sys, getopt, re, json
from tools import drive_integration



# TODO make this work when executed from root directory of repository
CONTENT = "../content" 

def get_sub_folders(folder: str = ""):
    """
    Returns a list of subfolders folders as strings. Defaults to the top level
    content folder if not given an argument.

    Args:
        folder: specifies a folder to open. Optional, Defaults to the top-level
            content folder

    Returns:
        a list of subfolders within the given folder.
    """
    path = f"{CONTENT}/{folder}"
    contents = [sub_folder for sub_folder 
                in os.listdir(path) 
                if os.path.isdir(f"{path}/{sub_folder}")]
    return contents


def update_colabl_link():
    f = open("slidesTest.md","r", encoding="latin1")
    md = f.read()
    f.close()
    newLink = "test"
    x = re.sub(r'https://colab.research.google.com/drive/[a-zA-Z0-9\-]+', 
        "https://colab.research.google.com/drive/" + newLink, md) #mathces for re- 

    with open("slidesTest.md", 'w') as f:    
        f.write(x)

def scan_metadata():
    with open("metadata.json", "r+") as f:
        data = json.load(f)
        for label in data:
            if 'slides' in label:
                data[label] = ["link"] #need to change to be correct
    with open("metadate.json", 'w') as f:
        f.write(json.dumps(data))


def main():
    # TODO configure commandline arguments

    opts, args = getopt.getopt(sys.argv[1:],"g")
    if opts and "-g" in opts[0]:
        drive = args[0]
    elif len(args) > 1:
        repo = args[0]
        drive = args[1]
    else:
        raise SystemExit("\x1b[31m" # Set text color to red
                         "Error: No source or destination given.\n"
                         "\x1b[32m" # Set text color to green
                         "Usage: create-course.py [-g | <repo folder>] "
                         "<Google-Drive folder shareable link>"
                         "\x1b[0m" # Reset text color
                        )
    if drive[-12:] == "?usp=sharing":
        drive = drive[:-12]
    print(drive)
    # TODO authenticate google drive
    drive_integration.authenticate()
    # TODO mount drive folder
    tracks = get_sub_folders()
    for track in tracks:
        path = f"{CONTENT}/{track}"
        units = get_sub_folders(track)
        track_info = json.load(open(f"{path}/metadata.json"))
        track_name = track_info["name"]
        # TODO create track folder in drive

        # debugging
        print(track_name)

        for unit in units:
            unit_info = json.load(open(f"{path}/{unit}/metadata.json"))
            unit_name = unit_info["name"]
            
            # debugging
            print(f"\t{unit_name}")
            # TODO create unit folder in drive

            if (colabs := unit_info.get("colabs")):
                for nb in colabs:
                    # TODO copy to drive
                    # TODO update metadata.json to link to copy
                    pass

if __name__ == "__main__":
    main()