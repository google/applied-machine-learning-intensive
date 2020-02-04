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
outputFile = "TestResults.md"
contentFolder = "../content"
inContentFolder = "../content/"

def if __name__ == "__main__":
    main()

def spellCheck():
    ''' Checks spelling and grammar of Colabs and Slides
        BLOCKED: We don't know if they have one
    '''
    pass

def containAnswerKey():
    ''' This will ensure all exercises and challenges have an answer key
    '''
    pass

def usePython3(colabs):
    ''' This function will tell us if colaboratory notebooks use Python 3 or not
        Checks the 'kernelspec' name is python3
    '''
    toPrint = "# Are Colabs using Python 3?\n"
    problems = ""
    for colab in colabs:
        colabfile = open(inContentFolder + str(track) + "/" + str(unit) 
            + "/" + colab)
        colabcontent = colabfile.read()
    if problems == "":
        toPrint += "Success!"
    return toPrint

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
            
            # Make calls to our helper functions that check colabs
            testResults = usePython3(colabs)
            outmd.write(testResults)
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
