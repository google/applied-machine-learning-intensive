# PREVENT MERGE CONFLICTS - TEXT BEFORE WORKING!

# Suggested Components from starting document:
# Enforce rules mentioned in Style Guide ()
# Implement Spelling and Grammar Checks
# All exercises and challenges have answer key
# Colabs all use Python 3
# Colabs don't have saved outputs turned on


# Notes


import os #lets us navigate folders
import json #for parsing the metadata files more easily (hopefully)
import re #for regex because I don't want to come up with all of the ways to denote an exercise by hand


# Global Variables
outputFile = "TestResults.txt"
contentFolder = "../content"
inContentFolder = "../content/"

def if __name__ == "__main__":
    main()

def spellCheck():
    ''' Checks spelling and grammar of Colabs and Slides
    '''
    pass

def containAnswerKey():
    ''' This will ensure all exercises and challenges have an answer key
    '''
    pass

def usePython3():
    ''' This function will tell us if colaboratory notebooks use Python 3 or not
    '''
    pass

def outputsOff():
    ''' This function will tell us if the colaboratory notebooks have saved
        outputs turned on or not
    '''
    pass

def main():
    #opening a markdown file to write all of the output to
    outmd = open(outputFile, "w")
    
    #get all folders in the content folder
    tracks = [dI for dI in os.listdir(contentFolder) if os.path.isdir(
    os.path.join(contentFolder,dI))]

    #Separating the numbered tracks from the extra content
    sequencetracks = []
    extratracks = []
    for track in tracks:
        if (track[0:2] == "t0") or (track[0:2] == "t1"):
            sequencetracks += [track]
        else:
            extratracks += [track]

    sequencetracks.sort()
    extratracks.sort()

    #adding title to markdown file
    outmd.write("## Test Results\n")

    #goes through each track, gets official track name and unit names
    for track in sequencetracks:
        jsonfile = open(inContentFolder + str(track) + "/metadata.json", "r")
        lines = jsonfile.readlines()
        for line in lines:
            if "name" in line:
                linelist = line.split('"')
                string = "### " + track[1:3] + ": " + linelist[-2] + "\n"
                delayprint += string
        jsonfile.close()
        units = [dI for dI in os.listdir(inContentFolder + track) if os.path.isdir(
            os.path.join(inContentFolder + track,dI))]
        units.sort()
        for unit in units:
            unitcount = unitcount + 1
            jsonfile = open(inContentFolder + str(track) + "/" + str(unit) 
            + "/metadata.json", "r")
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
            string = " * **" + unit[0:2] + ": " + parsed_json["name"] + "**\n"
            delayprint += string
            colabs = []
            if "colabs" in parsed_json.keys():
                #print(str(len(parsed_json["colabs"])) + " Colab notebooks")
                string = "   * " + str(len(parsed_json["colabs"])) 
                + " Colab notebooks\n"
                delayprint += string
                colabs += parsed_json["colabs"]
            elif "colab" in parsed_json.keys():
                #print(str(len(parsed_json["colab"])) + " Colab notebooks")
                string = "   * " + str(len(parsed_json["colab"])) 
                + " Colab notebooks\n"
                delayprint += string
                colabs += parsed_json["colab"]
            #in colabs, exercises denoted by ##Exercise number or ## Exercise number
            #This section counts all of the exercises from all colabs
            exercisecount = 0
            mins = 0
            for colab in colabs:
                colabfile = open(inContentFolder + str(track) + "/" + str(unit) 
                + "/" + colab)
                colabcontent = colabfile.read()
                saved_colabcontent = colabcontent[:]
                m = re.search(r'## *[Ee]xercise ', colabcontent)
                while m != None:
                    exercisecount += 1
                    colabcontent = colabcontent[m.end():]
                    m = re.search(r'## *[Ee]xercise ', colabcontent)
                colabcontent = saved_colabcontent[:]
                m = re.search(r'minutes?', colabcontent)
                if (m != None):
                    where_minutes_are = colabcontent[:m.start()]
                    where_minutes_are = where_minutes_are[-5:]
                    min_list = where_minutes_are.split('"')
                    minutes = min_list[-1][:-1]
                    mins += int(minutes)
            if len(colabs) > 0:
                string = "     * " + str(exercisecount) + " Exercises\n"
                delayprint += string
                string = "     * " + str(mins) + " minutes\n"
                delayprint += string
            if ("slides" in parsed_json.keys()) and (len(parsed_json["slides"]) > 0):
                string = "   * Slides:\n"
                delayprint += string
                slides = parsed_json["slides"]
                for slideshow in slides:
                    string = "     * " + slideshow + "\n"
                    delayprint += string
            #Gets materials, resources, and handouts links from json file
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

    #prints other track and unit information stored
    outmd.write(delayprint)

    outmd.write("## Extra Tracks\n")

    #goes through each track, gets official track name
    for track in extratracks:
        jsonfile = open(inContentFolder + str(track) + "/metadata.json", "r")
        lines = jsonfile.readlines()
        for line in lines:
            if "name" in line:
                linelist = line.split('"')
                outmd.write("### " + linelist[-2] + "\n")
        jsonfile.close()

    outmd.close()
