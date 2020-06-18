import os
import re
import collections

summary = collections.defaultdict(int)
all_images = {}

def find_images(file_name):

  with open(file_name) as f:
    images = {}
    licenses = {}
    line = f.readline()
    while line:
      image_pattern = re.compile(r'.*!\[([^]*])*\]\(([^)]*)\)')
      license_pattern = re.compile(r'\s*\*\s*\[([^]]*)\]\(([^)]*)\):\s+(.*)')
      match = re.match(image_pattern, line)
      if match:
        image_file_name = os.path.split(match.group(2))[-1].strip()
        ifn = os.path.join(os.path.split(file_name)[0], match.group(2))
        ifn = 'https://github.com/google/applied-machine-learning-intensive/tree/master/v2/' + ifn[1:]
        images[image_file_name] = ifn
      match = re.match(license_pattern, line)
      if match:
        image_file_name = os.path.split(match.group(1))[-1].strip()
        url = match.group(2).strip()
        license = match.group(3).strip()
        licenses[image_file_name] = {
            'url': url,
            'license': license,
        }
      line = f.readline()

  for image in images:
    if image not in licenses:
      summary['Unlicensed'] += 1
      all_images[image] = {
        'file_path': images[image],
        'name': image,
        'license': 'Unlicensed',
      }
    else:
      license = licenses[image]
      summary[license['license']] += 1
      all_images[image] = {
        'file_path': images[image],
        'name': image,
        'license': license['license']
      }
  #print(images)
  #print(licenses)

for (root, dirs, files) in os.walk('.'):
  for f in files:
    if f.endswith('.md'):
      #print(os.path.join(root, f))
      find_images(os.path.join(root, f))


count = sum(summary.values())
print("# AMLI Image File Analysis")

print("There are " + str(count) + " total images.")
print("")
print("## Images per license:")
for license, count in summary.items():
  print("  * ", license, ": ", str(count))
print("")

print("## Images") 
for license in summary.keys():
  print('### ', license)
  for image, details in all_images.items():
    if details['license'] == license:
      print("  * [", details['name'], "](", details['file_path'], ")")
  print("")
