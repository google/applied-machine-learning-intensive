# AMLI Development Guide

## Setting up your environment

The AMLI libraries and scripts require some non-core Python modules in order to
function. We recommend that you install those modules in a virtual environment.

In order to create the environment, run the following commands:

```
  export ENV_DIR=$HOME/amli
  ls $ENV_DIR 2>/dev/null || mkdir $ENV_DIR
  python3 -m venv $ENV_DIR
  source $ENV_DIR/bin/activate
  pip install wheel
  pip install -r amli/requirements.txt
```

## Running tests

AMLI has tests to exercise library functionality and to audit the course
content. To run the tests use the following commands:

```
  export ENV_DIR=$HOME/amli
  PYTHONPATH="amli/lib" python3 amli_tests.py
```
