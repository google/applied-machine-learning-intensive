import numpy as np

FRUIT_COUNT = 5000

ORANGE = {
  'diameter': {
    'min': 6,
    'max': 12,
    'avg': (12 + 6) / 2,
  },
  'weight': { # grams
    'min': 96,
    'max': 210,
    'avg': 150,
  },
  'color': {
    'r': 157,
    'g': 82,
    'b': 4,
  },
}

GRAPEFRUIT = {
  'diameter': {
    'min': 9,
    'max': 14,
    'avg': (14 + 9) / 2,
  },
  'weight': { # grams
    'min': 100,
    'max': 280,
    'avg': 206,
  },
  'color': {
    'r': 151,
    'g': 70,
    'b': 15,
  },
}

def generate_sorted_values(attribute, configuration, variance_reduction):
  value_scale = max(
    configuration[attribute]['max'] - configuration[attribute]['avg'],
    configuration[attribute]['avg'] - configuration[attribute]['min']
  ) / variance_reduction

  values = np.random.normal(
    loc=configuration[attribute]['avg'],
    scale=value_scale,
    size=FRUIT_COUNT,
  )
  return sorted(values)

def generate_color_values(color, variance):
  return np.random.normal(
    loc=color,
    scale=variance,
    size=FRUIT_COUNT,
  )

def main():
  fruit = {
    'orange': ORANGE,
    'grapefruit': GRAPEFRUIT
  }

  print('name,diameter,weight,red,green,blue')
  for name, config in fruit.items():
    diameters = generate_sorted_values('diameter', config, 2)
    weights = generate_sorted_values('weight', config, 3)

    reds = generate_color_values(config['color']['r'], 10)
    greens = generate_color_values(config['color']['g'], 10)
    blues = generate_color_values(config['color']['b'], 10)

    for i in range(FRUIT_COUNT):
      diameter = round(diameters[i], 2)
      weight = round(weights[i], 2)
      red = int(round(max(min(reds[i], 255), 2)))
      green = int(round(max(min(greens[i], 255), 2)))
      blue = int(round(max(min(blues[i], 255), 2)))
      print(f'{name},{diameter},{weight},{red},{green},{blue}')

if __name__ == '__main__':
  main()
