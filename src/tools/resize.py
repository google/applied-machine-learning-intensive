import os
import cv2 as cv

max_dim = 450
for (root, dirs, files) in os.walk('.'):
  for f in files:
    if f.endswith('.jpeg') or f.endswith('.jpg') or f.endswith('.gif') or f.endswith('.png'):
      img_path = os.path.join(root, f)
      img = cv.imread(img_path)
      if img is None:
        print("Unable to detect size:", img_path)
      else:
        height, width, _ = img.shape
        if height > max_dim or width > max_dim:
          m = max(height, width)
          ratio = max_dim / m
          new_dimensions = (int(width * ratio), int(height * ratio))
          new_img = cv.resize(img, new_dimensions)
          #print(img_path, img.shape, ratio, new_dimensions)
          print(img_path, img.shape, '=>', new_img.shape)
          cv.imwrite(img_path, new_img)
      #print(type(img))
      #img.close()

