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

outmd.write("Track Count: " + str(len(sequencetracks)) + "\n\n")

delayprint = ""
unitcount = 0

delayprint += ("## Sequence Tracks\n")

for track in sequencetracks:
    jsonfile = open("../content/" + str(track) + "/metadata.json", "r")
    lines = jsonfile.readlines()
    for line in lines:
        if "name" in line:
            linelist = line.split('"')
            string = "### " + track[1:3] + ": " + linelist[-2] + "\n"
            delayprint += string
    jsonfile.close()
    units = [dI for dI in os.listdir('../content/' + track) if os.path.isdir(os.path.join('../content/' + track,dI))]
    units.sort()
    for unit in units:
        unitcount = unitcount + 1
        jsonfile = open("../content/" + str(track) + "/" + str(unit) + "/metadata.json", "r")
        lines = jsonfile.readlines()
        for line in lines:
            if '"name":' in line:
                linelist = line.split('"')
                string = " * " + unit[0:2] + ": " + linelist[-2] + "\n"
                delayprint += string
        #this section of commented out stuff might be useful but the json files 
        #in the colab have some issues, so maybe json parsing by hand
        #will be faster
        #content = "".join(lines)
        #content = content.replace("\n", "")
        #content = content.replace("\t", " ")
        #content = content.replace(r"\s", " ")
        #content = content.replace('" "', '","')
        #print(content)
        #parsed_json = json.loads(content)
        #print(parsed_json["name"])
        jsonfile.close()

outmd.write("Unit Count: " + str(unitcount) + "\n\n")

outmd.write(delayprint)
outmd.close()