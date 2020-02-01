import sys
from PIL import Image

def avg_rgb(img_file):
  img = Image.open(img_file, 'r')
  w, h = img.size
  pixels = img.load()
  r, g, b = 0, 0, 0
  for i in range(w):
    for j in range(h):
      r += pixels[i, j][0]
      g += pixels[i, j][1]
      b += pixels[i, j][2]
  ttl = w * h
  print(f'{img_file}\n\tr: {round(r/ttl)}\n\tg: {round(g/ttl)}\n\tb: {round(b/ttl)}\n\n')

def main():
  for img_file in sys.argv[1:]:
    avg_rgb(img_file)

if __name__ == '__main__':
  main()
