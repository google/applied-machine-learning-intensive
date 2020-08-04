import numpy as np

FRUIT_COUNT = 5000

ORANGE = {
  'diameter': { # cm
    'min': 6,
    'max': 11,
    'avg': (11 + 6) / 2,
  },
  'weight': { # grams
    'min': 95,
    'max': 210,
    'avg': (210+95)/2,
  },
  'color': {
    'r': 157,
    'g': 82,
    'b': 4,
  },
}

GRAPEFRUIT = {
  'diameter': { # cm
    'min': 9,
    'max': 14,
    'avg': (14 + 9) / 2,
  },
  'weight': { # grams
    'min': 140,
    'max': 255,
    'avg': (255+140)/2,
  },
  'color': {
    'r': 151,
    'g': 70,
    'b': 15,
  },
}

LEMON = {
  'diameter': { # cm
    'min': 5,
    'max': 11,
    'avg': (11 + 5) / 2,
  },
  'weight': { # grams
    'min': 90,
    'max': 200,
    'avg': 140,
  },
  'color': {
    'r': 185,
    'g': 160,
    'b': 3,
  },
}

LIME = {
  'diameter': { # cm
    'min': 5,
    'max': 11,
    'avg': (11 + 5) / 2,
  },
  'weight': { # grams
    'min': 90,
    'max': 200,
    'avg': 140,
  },
  'color': {
    'r': 113,
    'g': 148,
    'b': 36,
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
    'grapefruit': GRAPEFRUIT,
#    'lemon': LEMON,
#    'lime': LIME,
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
