#text before you start working on this to make sure there will be no merge conflicts

import os #lets us navigate folders

tracks = [dI for dI in os.listdir('../amli/content') if os.path.isdir(os.path.join('../amli/content',dI))]
print(tracks)