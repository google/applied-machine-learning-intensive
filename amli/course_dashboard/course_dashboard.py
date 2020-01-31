#text before you start working on this to make sure there will be no merge conflicts

import os #lets us navigate folders
import json #for parsing the metadata files easier

outmd = open("Dashboard.md", "w")

#get all folders in the content folder
tracks = [dI for dI in os.listdir('../content') if os.path.isdir(os.path.join('../content',dI))]

sequencetracks = []
extratracks = []
for track in tracks:
    if (track[0:2] == "t0") or (track[0:2] == "t1"):
        sequencetracks += [track]
    else:
        extratracks += [track]

sequencetracks.sort()
extratracks.sort() #figured it won't be very useful, but at least nice to have them in the same order each time

outmd.write("# Course Dashboard\n")

outmd.write("## Sequence Tracks\n")

for track in sequencetracks:
    jsonfile = open("../content/" + str(track) + "/metadata.json", "r")
    lines = jsonfile.readlines()
    for line in lines:
        if "name" in line:
            linelist = line.split('"')
            outmd.write("### " + track[1:3] + ": " + linelist[-2] + "\n")
    jsonfile.close()
    units = [dI for dI in os.listdir('../content/' + track) if os.path.isdir(os.path.join('../content/' + track,dI))]
    units.sort()
    for unit in units:
        jsonfile = open("../content/" + str(track) + "/" + str(unit) + "/metadata.json", "r")
        lines = jsonfile.readlines()
        for line in lines:
            if '"name":' in line:
                linelist = line.split('"')
                outmd.write(" * " + unit[0:2] + ": " + linelist[-2] + "\n")
        jsonfile.close()

