#text before you start working on this to make sure there will be no merge conflicts

import os #lets us navigate folders

tracks = [dI for dI in os.listdir('../content') if os.path.isdir(os.path.join('../content',dI))]
print(tracks)