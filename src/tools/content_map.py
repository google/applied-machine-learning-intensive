# python3

"""content_map is responsible for rebuilding the content_map.md file.

Usage:

  blaze run engedu/fuzzy/amli/tools:content_map
    > engedu/fuzzy/amli/g3doc/content_map.md
"""

import json
import os
from absl import app
from absl import flags

CONTENT_DIR = '/google/src/head/depot/google3/engedu/fuzzy/amli/content/'
CONTENT_MAP_FILE = './engedu/fuzzy/amli/g3doc/content_map.md'
FLAGS = flags.FLAGS
RESOURCE_TYPES = ('slides', 'colabs', 'materials', 'handouts', 'resources')


def main(_):
  tracks = get_tracks()
  page_header(tracks)
  for track in tracks:
    track_info(track)


def get_tracks():
  """Gets a list of dictionaries containing track information.

  Returns:
    Sorted list of track dictionaries.
  """
  tracks = []
  for file in os.listdir(CONTENT_DIR):
    full_path = os.path.join(CONTENT_DIR, file)
    if os.path.isdir(full_path):
      track = dirname_to_track(file, full_path)
      load_units(track)
      tracks.append(track)
  sorted_tracks = sorted(tracks, key=lambda t: t['track'])
  for i in range(len(sorted_tracks)):
    sorted_tracks[i]['order'] = i+1
  return sorted_tracks


def dirname_to_track(dirname, full_path):
  track, name = dirname.split('_', 1)

  with open(os.path.join(full_path, 'metadata.json'), 'r') as f:
    json_data = json.load(f)
    name = json_data['name']

  return {
      'track': track,
      'name': name,
      'location': full_path,
      'units': []
  }


def page_header(tracks):
  """Prints content map header.

  Args:
    tracks: list of dictionaries of tracks.
  """
  print('# AMLI Content Map\n\n[TOC]\n')
  summary_table(tracks)


def summary_table(tracks):
  """Creates a summary table of high-level data about the course.

  Args:
    tracks: list of dictionaries of tracks.
  """
  counts = [0] * len(RESOURCE_TYPES)
  for track in tracks:
    for unit in track['units']:
      for i, resource_type in enumerate(RESOURCE_TYPES):
        if resource_type in unit:
          counts[i] += len(unit[resource_type])

  print(' | '.join(map(lambda s: s.capitalize(), RESOURCE_TYPES)))
  print(':----:' + ('|:----:'*len(RESOURCE_TYPES)))
  print(' | '.join(map(str, counts)))
  print('\n')


def load_units(track):
  """Loads a sorted list of units into a track.

  Args:
    track: track dictionary to load units into.
  """
  for file in os.listdir(track['location']):
    full_path = os.path.join(track['location'], file)
    if os.path.isdir(full_path):
      unit = load_unit(file, full_path)
      track['units'].append(unit)
    track['units'] = sorted(track['units'], key=lambda u: u['id'])
    for i in range(len(track['units'])):
      track['units'][i]['order'] = i+1


def load_unit(dirname, full_path):
  """Loads a unit from the filesystem.

  Args:
    dirname: name of the unit directory.
    full_path: absolute path to the unit directory.
  Returns:
    Dictionary containing unit information.
  """
  unit = {}

  with open(os.path.join(full_path, 'metadata.json'), 'r') as f:
    unit = json.load(f)

  unit['id'], _ = dirname.split('_', 1)

  if 'bug' not in unit:
    unit['bug'] = 'b/247625584'

  for resource_type in RESOURCE_TYPES:
    if resource_type in unit:
      for i in range(len(unit[resource_type])):
        url = unit[resource_type][i]
        if not url.startswith('http://') and not url.startswith('https://'):
          url = os.path.join(full_path, url).replace(
              '/google/src/head/', 'https://cs.corp.google.com/piper///')

        unit[resource_type][i] = {
            'name': 'X',
            'url': url,
        }

  return unit


def track_info(track):
  """Prints information about the track.

  A track is a collection of units. Each unit has and ID, name, and one or more
  sets of slides, colabs, or other supporting material. We print the track as
  a table of units, which the completeness of each item of a unit colored
  according to its status: red = not done; green = done.

  Args:
    track: dictionary containing track information.
  """
  track_table_styles(track)
  track_heading(track)
  track_table_header(track)
  for unit in track['units']:
    unit_info(unit)


def track_table_styles(track):
  """Prints the style block for an individual track.

  Args:
    track: dictionary containing track information.
  """
  print('<style>')
  for unit in track['units']:
    col = 3
    for resource_type in RESOURCE_TYPES:
      cell_style(track_id=track['track'],
                 row=unit['order'],
                 column=col,
                 present=resource_type in unit)
      col = col + 1
  print('</style>\n')


def cell_style(track_id, row, column, present):
  """Prints the style for an individual cell in a track.

  Args:
    track_id: ID of the track that the style applies to.
    row: Row in the table that the style applies to.
    column: Column in the table that the style applies to.
    present: Boolean indicating if a unit material is present.
  """
  color = 'c00'
  if present:
    color = '0c0'
  print(f'''.table-{track_id} tr:nth-child({row}) td:nth-child({column}) {{
  background: #{color}; color: #fff; }}''')


def track_heading(track):
  """Prints the heading for the track section.

  Args:
    track: dictionary containing track information.
  """
  print('## {}: {}\n'.format(track['track'].upper(), track['name']))


def track_table_header(track):
  """Prints the track table heading.

  Args:
    track: dictionary containing track information.
  """
  track_id = track['track']
  columns = ['ID', 'Name'] + list(map(lambda s: s.capitalize(), RESOURCE_TYPES))
  columns_md = ' | '.join(columns)
  print(f'{columns_md} {{.table-{track_id}}}')
  print('----' + ('|----'*len(columns)))


def unit_info(unit):
  """Prints information about an individual unit in as a table row.

  Args:
    unit: dictionary containing unit information.
  """
  unit_id = unit['id']
  bug = unit['bug']
  name = unit['name']
  row = f'[{unit_id}](http://{bug})|{name}'
  for resource_type in RESOURCE_TYPES:
    row = row + '|' + resources_list(unit, resource_type)
  print(row)


def resources_list(unit, resource_type):
  """Returns a list of resources of a given type for a unit.

  Args:
    unit: dictionary containing unit information.
    resource_type: resource type to extract from unit dictionary.
  Returns:
    Sring containing markdown link to all resources of requested type in unit.
  """
  items = []
  if resource_type in unit:
    if not isinstance(unit[resource_type], list):
      unit[type] = [unit[resource_type]]
    for item in unit[resource_type]:
      name = item['name']
      url = item['url']
      items.append(f'[{name}]({url})')
  return ', '.join(items)


if __name__ == '__main__':
  app.run(main)
