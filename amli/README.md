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

### Colabs

#### Datasets

### Facilitator Guides

### Activities

