#text before you start working on this to make sure there will be no merge conflicts

# Suggested Components
# Overall Track Count
# Overall Unit Count
# Word Count for each type of document
# Duration of the course (sum expected durations of each unit)
# Exercise count

# Thoughts
# Track count and unit count done
# Word count: What counts as a word? Is this the sum of all words appearing in all colabs/etc.? How will instructors benefit?
# Duration: Seems very useful, will need to learn api stuff to get into colabs and slides
# Exercise count: Similar to duration, need api.
# also seems useful to include data on each unit (slide link, colab, any extra materials, duration) in 
# list of units for teachers to reference
# Some of these may be good telecon questions

import os #lets us navigate folders
import json #for parsing the metadata files more easily (hopefully)

#opening a markdown file to write all of the output to
outmd = open("Dashboard.md", "w")

#get all folders in the content folder
tracks = [dI for dI in os.listdir('../content') if os.path.isdir(os.path.join('../content',dI))]

#Separating the numbered tracks from the extra content
sequencetracks = []
extratracks = []
for track in tracks:
    if (track[0:2] == "t0") or (track[0:2] == "t1"):
        sequencetracks += [track]
    else:
        extratracks += [track]

sequencetracks.sort()
extratracks.sort() #figured it won't be very useful, but at least nice to have them in the same order each time

#adding first info to markdown file
outmd.write("# Course Dashboard\n")

outmd.write("Track Count: " + str(len(sequencetracks)) + "\n\n")

#since the next output line should be unit count, everything else goes into a string to be printed later
delayprint = ""
unitcount = 0

delayprint += ("## Sequence Tracks\n")

#goes through each track, gets official track name and unit names
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
        content = "".join(lines)
        content = content.replace("\n", "")
        content = content.replace("\t", "")
        content = content.replace(r"\s", " ")
        content = content.replace("  ", " ")
        content = content.replace("  ", " ")
        content = content.replace("  ", " ") #believe me, these three lines were necessary :/
        content = content.replace('" "', '","')
        parsed_json = json.loads(content)
        #print(parsed_json["name"])
        string = " * " + unit[0:2] + ": **" + parsed_json["name"] + "**\n"
        delayprint += string
        if "colabs" in parsed_json.keys():
            #print(str(len(parsed_json["colabs"])) + " Colab notebooks")
            string = "   * " + str(len(parsed_json["colabs"])) + " Colab notebooks\n"
            delayprint += string
        elif "colab" in parsed_json.keys():
            #print(str(len(parsed_json["colab"])) + " Colab notebooks")
            string = "   * " + str(len(parsed_json["colab"])) + " Colab notebooks\n"
            delayprint += string
        if ("slides" in parsed_json.keys()) and (len(parsed_json["slides"]) > 0):
            string = "   * Slides:\n"
            delayprint += string
            slides = parsed_json["slides"]
            for slideshow in slides:
                #print(" * " + slideshow)
                string = "     * " + slideshow + "\n"
                delayprint += string
        if ("materials" in parsed_json.keys()) and (len(parsed_json["materials"]) > 0):
            #print("Materials:")
            string = "   * Materials:\n"
            delayprint += string
            slides = parsed_json["materials"]
            for slideshow in slides:
                #print(" * " + slideshow)
                string = "     * " + slideshow + "\n"
                delayprint += string
        if ("resources" in parsed_json.keys()) and (len(parsed_json["resources"]) > 0):
            #print("Resources:")
            string = "   * Resources:\n"
            delayprint += string
            slides = parsed_json["resources"]
            for slideshow in slides:
                #print(" * " + slideshow)
                string = "     * " + slideshow + "\n"
                delayprint += string
        if ("handouts" in parsed_json.keys()) and (len(parsed_json["handouts"]) > 0):
            #print("Handouts:")
            string = "   * Handouts:\n"
            delayprint += string
            slides = parsed_json["handouts"]
            for slideshow in slides:
                #print(" * " + slideshow)
                string = "     * " + slideshow + "\n"
                delayprint += string
        jsonfile.close()

#prints total unit count
outmd.write("Unit Count: " + str(unitcount) + "\n\n")

#prints other track and unit information stored
outmd.write(delayprint)

outmd.write("## Extra Tracks\n")

#goes through each track, gets official track name
for track in extratracks:
    jsonfile = open("../content/" + str(track) + "/metadata.json", "r")
    lines = jsonfile.readlines()
    for line in lines:
        if "name" in line:
            linelist = line.split('"')
            outmd.write("### " + linelist[-2] + "\n")
    jsonfile.close()

outmd.close()
