import numpy as np

FRUIT_COUNT = 10000

ORANGE = {
  'diameter': {
    'min': 6,
    'max': 10,
    'avg': (10 - 6) / 2,
  },
  'weight': { # grams
    'min': 96,
    'max': 184,
    'avg': 131,
  },
  'color': {
    'r': 157,
    'g': 87,
    'b': 4,
  },
}

GRAPEFRUIT = {
  'diameter': {
    'min': 10,
    'max': 15,
    'avg': (15 - 10) / 2,
  },
  'weight': { # grams
    'min': 100,
    'max': 300,
    'avg': 246,
  },
  'color': {
    'r': 151,
    'g': 63,
    'b': 15,
  },
}

def main():


  diameter_adjustments = np.random.normal(
    loc=ORANGE['diameter']['avg'],
  )

  for _ in range(FRUIT_COUNT):
    print("orange,")

#  for _ in range(FRUIT_COUNT):
#    print("grapefruit,")

if __name__ == '__main__':
  main()
