# PREVENT MERGE CONFLICTS - TEXT BEFORE WORKING!

# Suggested Components from starting document:
# Enforce rules mentioned in Style Guide ()
# Implement Spelling and Grammar Checks
# All exercises and challenges have answer key
# Colabs all use Python 3
# Colabs don't have saved outputs on


# Notes
# Use Python 3: Done!
# Spell Check: Blocked
# Contains Answer Key: Think about if there are multiple answer keys
# Outputs Off: Working on now 


import os #lets us navigate folders
import json #for parsing the metadata files more easily (hopefully)
import re #for regex because I don't want to come up with all of the ways to denote an exercise by hand


# Global Variables
outputFile = "TestResults.md"
contentFolder = "../content"
inContentFolder = "../content/"

#def if __name__ == "__main__":
#    main()

def spellCheck():
    ''' Checks spelling and grammar of Colabs and Slides
        BLOCKED: We don't know if they have one
    '''
    pass

def containAnswerKey():
    ''' This will ensure all exercises and challenges have an answer key
    '''
    pass

def usePython3(track, unit, colabs):
    ''' This function will tell us if colaboratory notebooks use Python 3 or not
        Checks the 'kernelspec' name is python3
    '''
    #toPrint = "# Are Colabs using Python 3?\n"
    toPrint = ""
    for colab in colabs:
        colabfile = open(inContentFolder + str(track) + "/" + str(unit) 
            + "/" + colab)
        colabcontent = colabfile.read()
        if not ("\"name\":\"python3\"" in colabcontent) and not ("\"name\": \"python3\"" in colabcontent):
            toPrint += track + "/" + unit + "/" + colab + " is not using python 3.\n\n" 
    return toPrint

def outputsOff(track, unit, colabs):
    ''' This function will tell us if the colaboratory notebooks have saved
        outputs turned on or not
    '''
    #toPrint = "# Are Colabs cleared of all outputs?\n"
    toPrint = ""
    for colab in colabs:
        colabfile = open(inContentFolder + str(track) + "/" + str(unit) 
            + "/" + colab)
        colabcontent = colabfile.read()
        if ("\"outputs\": [{" in colabcontent) or ("\"outputs\":[{" in colabcontent):
            toPrint += track + "/" + unit + "/" + colab + " has an uncleared output.\n\n" 
    return toPrint

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

    #create empty strings to record problems
    py3check = ""
    outputcheck = ""

    #goes through each track, gets official track name and unit names
    for track in sequencetracks:
        units = [dI for dI in os.listdir(inContentFolder + track) if os.path.isdir(
            os.path.join(inContentFolder + track,dI))]
        units.sort()
        for unit in units:
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
                colabs += parsed_json["colabs"]
            elif "colab" in parsed_json.keys():
                colabs += parsed_json["colab"]
            
            # Make calls to our helper functions that check colabs
            testResults = usePython3(track, unit, colabs)
            py3check += testResults
            testResults = outputsOff(track, unit, colabs)
            outputcheck += testResults

            jsonfile.close()
    
    #Write out our test results for each
    outmd.write("### Are Colabs using python 3?\n")
    if (py3check == ""):
        py3check = "Success!\n\n"
    outmd.write(py3check)

    outmd.write("### Are Colabs cleared of all outputs?\n")
    if (outputcheck == ""):
        outputcheck = "Success!\n\n"
    outmd.write(outputcheck)

    outmd.close()


main()