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

import os
import json

# from amli import drive

CONTENT_FOLDER = "../content"

def get_course_folders(folder: str = ""):
    """
    Returns a list of course folders as strings. Defaults to the top level
    content folder if not given an argument.

    Args:
        folder: specifies a folder to open. Optional.

    Returns:
        a list of file/folder names of contents of the given folder.
    """
    contents = os.listdir(f"{CONTENT_FOLDER}/{folder}")
    return contents

if __name__ == "__main__":
    # get input from user
    # authenticate google drive
    # mount drive folder
    tracks = get_course_folders()
    for track in tracks:
        # create folder in drive
        path = f"{CONTENT_FOLDER}/{track}"
        if os.path.isdir(path):
            units = get_course_folders(track)

            # debugging
            print(track)
            [print(f"\t{unit}") for unit in units]

            for unit in units:
                # make folder in drive
                metadata = json.load(f"{path}/{unit}/metadata.json")