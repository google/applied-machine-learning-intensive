# AMLI Development Guide

## Setting up your environment

The AMLI libraries and scripts require some non-core Python modules in order to
function. We recommend that you install those modules in a virtual environment.

In order to create the environment, run the following commands from the
directory that contains this README.md file:

```
  export ENV_DIR=$HOME/amli
  ls $ENV_DIR 1>/dev/null 2>/dev/null || mkdir $ENV_DIR
  python3 -m venv $ENV_DIR
  source $ENV_DIR/bin/activate
  pip install wheel
  pip install -r requirements.txt
```

## Running tests

AMLI has tests to exercise library functionality and to audit the course
content. To run the tests use the following commands:

```
  export ENV_DIR=$HOME/amli
  PYTHONPATH="amli" python3 tests.py
```

## Content Development

*Note that all time estimates assume 45 hours of in-class time per week*

AMLI is constructed of "units" of learning. These units are topical and should
take anywhere from 15 minutes to 1 day of classroom time to complete. The units
are grouped together into "tracks". Each track ends in a capstone project that
reinforces the material learned throughout the units of the track.

A unit can consist of any combination of slides, colabs, and activities. The
unit should contain a facilitator guide which helps the person or persons
conductng the class understand how to present the material and how to handle
commonly encoutered challenges.

### Slides

Slides are written in a very specific subset of markdown specified in the
[md2googleslides](https://github.com/gsuitedevs/md2googleslides) project. The
slides should be stored in the related unit folder and should be named
`slides.md`.

All slides should consist of a content section that will be shown in the
presented slide and a speaker notes section. The speaker notes should contain
information that would help the instructor conduct the class. Expect that the
slides will be shared with the students.

If a slide contains images there should be an 'Image Details' section in the
speaker notes that references the original image and the image license. If the
image is original work owned by Google note that with 'Copyright Google'.

Sites approved for finding stock images with open licenses are:

   * [Unsplash](https://unsplash.com) using the
     [Unsplash License](https://unsplash.com/license)
   * [Pexels](https://pexels.com) using the
     [Pexels License](https://www.pexels.com/photo-license/)
   * [Pixabay](https://pixabay.com) using the
     [Pixabay License](https://pixabay.com/service/license/)

Here is an example slide:

```
  # Decision Trees

  ![](res/tree.png)

  <!--
  Before we talk about Random Forests we should take some time to review what we have already learned
  about Decision Trees.

  Image Details:
  * [tree.png](https://pixabay.com/vectors/tree-silhouette-winter-plant-3979965/): Pixabay License
```

Before submitting slides, be sure to run the `md2gslides` utility found at
[md2googleslides](https://github.com/gsuitedevs/md2googleslides) and make sure
that the slides render correctly.

```
  $HOME/node_modules/md2gslides/bin/md2gslides.js --use-fileio slides.md
```

### Colabs

#### Datasets

### Facilitator Guides

### Activities

