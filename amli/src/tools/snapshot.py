"""TODO(jmcadams): DO NOT SUBMIT without one-line documentation for snapshot.

TODO(jmcadams): DO NOT SUBMIT without a detailed description of snapshot.
"""

from absl import app
from absl import flags
import json
import os
from os import walk
from google3.pyglib import gfile
import nbformat
from shutil import copyfile
import sys


def snapshot(args):
  for expected in ('src', 'dest'):
    if expected not in args:
      raise Exception('"{}" is a required argument'.format(expected))

  print('Extracting AMLI content from {src} and placing it in {dest}'.format(
      src=args.src, dest=args.dest))

  tracks = load_content_index(args.src)

  for track in tracks:
    #if track['id'].upper() != 'T05':
    #  continue
    for unit in track['units']:
      if 'colabs' in unit:
        for colab in unit['colabs']:
          notebook = nbformat.read(colab['path'], as_version=4)

          name_w_solutions = '{track}-{unit} [00] {name} [Colab] - SOLUTIONS.ipynb'.format(track=track['id'].upper(), unit=unit['id'], name=notebook['metadata']['colab']['name'])
          name_wo_solutions = '{track}-{unit} [00] {name} [Colab].ipynb'.format(track=track['id'].upper(), unit=unit['id'], name=notebook['metadata']['colab']['name'])

          print(colab['path'], os.path.join(args.dest, name_w_solutions))

          copyfile(colab['path'], os.path.join(args.dest, name_w_solutions))

          to_delete = []
          in_answer_key = False
          for i, cell in enumerate(notebook.cells):
            if cell.cell_type == 'markdown':
              if cell.source.startswith('### Answer Key'):
                if in_answer_key:
                  raise Exception('Double-answer key in {}-{}'.format(track['id'], unit['id']))
                in_answer_key = True
                #to_delete.append(i)
              elif cell.source.startswith('## '):
                if in_answer_key:
                  in_answer_key = False
              elif cell.source.startswith('# '):
                if in_answer_key:
                  in_answer_key = False
            if in_answer_key:
              to_delete.append(i)
          #print("Deleting ", to_delete)
          for i in reversed(to_delete):
            del notebook.cells[i]
          nbformat.write(notebook, os.path.join(args.dest, name_wo_solutions))



def load_content_index(base):
  tracks = []
  for file in os.listdir(base):
    full_path = os.path.join(base, file)
    if os.path.isdir(full_path):# and 't02' not in full_path:
      track = dirname_to_track(file, full_path)
      load_units(track)
      tracks.append(track)
  return tracks

def dirname_to_track(dirname, full_path):
  id, name = dirname.split('_', 1)

  print('Opening {}'.format(os.path.join(full_path, 'metadata.json')), file=sys.stderr)
  with open(os.path.join(full_path, 'metadata.json'), 'r') as f:
    if 't02' in full_path:
      name = 'Data Analysis and Manipulation'
    else:
      json_data = json.load(f)
      name = json_data['name']

  return {
      'id': id,
      'name': name,
      'location': full_path,
      'units': []
  }

def load_units(track):
  for file in os.listdir(track['location']):
    full_path = os.path.join(track['location'], file)
    if os.path.isdir(full_path):
      unit = dirname_to_unit(file, full_path)
      track['units'].append(unit)

def dirname_to_unit(dirname, full_path):
  unit = {}

  print('Opening {}'.format(os.path.join(full_path, 'metadata.json')), file=sys.stderr)
  with open(os.path.join(full_path, 'metadata.json'), 'r') as f:
    unit = json.load(f)

  unit['id'], _ = dirname.split('_', 1)

  if not 'bug' in unit:
    unit['bug'] = 'b/247625584'

  if 'colabs' in unit:
    for i in range(len(unit['colabs'])):
      unit['colabs'][i] = {
          'file_name': unit['colabs'][i],
          'path': os.path.join(full_path, unit['colabs'][i]),
          'cs_url': os.path.join(full_path, unit['colabs'][i]).replace('/google/src/head/', 'https://cs.corp.google.com/piper///')
      }

  return unit
