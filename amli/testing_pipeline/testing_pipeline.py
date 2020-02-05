####################################################
## PREVENT MERGE CONFLICTS - TEXT BEFORE WORKING! ##
####################################################

# Components from starting document:
# Enforce rules mentioned in Style Guide
# Implement Spelling and Grammar Checks
# All exercises and challenges have answer key
# Colabs all use Python 3
# Colabs don't have saved outputs on
# All referenced images have an appropriate liscensing


# Notes
# Use Python 3: Done!
# Outputs Off: Done!
# Spell Check: Blocked
# Contains Answer Key: Pretty Close - worried about wording (exercise v. challenge) (solutions v. answer keys)
# Style Guide Rules: there is no syle guide at the link they gave
# Referenced Images: Not entirely sure whether we should just be checking urls or trying to actually find
#   source of image - look more into image liscense notes in colabs + slides


import os # for navigating folders
import json # for parsing the metadata files
import re # for regex

# Global Variables
outputFile = "TestResults.md"
contentFolder = "../content"
inContentFolder = "../content/"

def spellCheck():
    ''' Checks spelling and grammar of Colabs and Slides
        Output: string of colabs and slides with spelling and grammar issues
    '''
    return ""

def containAnswerKey(track, unit, colabs):
    ''' Ensures all exercises and challenges have an answer key
        Inputs: Track, Unit, List of Colab notebooks
        Output: string of all colabs missing answer keys
    '''
    toPrint = ""
    for colab in colabs:
        exercisecount = 0
        answerkeycount = 0
        colabfile = open(inContentFolder + str(track) + "/" + str(unit) 
            + "/" + colab)
        colabcontent = colabfile.read()
        saved_colabcontent = colabcontent[:]
        # Count the number of Exercises
        m = re.search(r'## *[Ee]xercise ', colabcontent)
        while m != None:
            exercisecount += 1
            colabcontent = colabcontent[m.end():]
            m = re.search(r'## *[Ee]xercise ', colabcontent)
        colabcontent = saved_colabcontent[:]
        # Count the number of Answer Keys
        m = re.search(r'(###? *Solutions?)|(###? *Answer Key)', colabcontent)
        while m != None:
            answerkeycount += 1
            colabcontent = colabcontent[m.end():]
            # Currently checking for Solution, Solutions, Answer Key
            m = re.search(r'(###? *Solutions?)|(###? *Answer Key)', colabcontent)
        # Print if the two numbers don't match
        if exercisecount != answerkeycount:
            toPrint += track + "/" + unit + "/" + colab + " has " + str(exercisecount) + " exercises, and " + str(answerkeycount) + " answer keys.\n\n"

    return toPrint

def usePython3(track, unit, colabs):
    ''' This function will tell us if colaboratory notebooks use Python 3
        Inputs: Track, Unit, List of Colab notebooks
        Output: string of all colabs not using Python 3
    '''
    toPrint = ""
    for colab in colabs:
        colabfile = open(inContentFolder + str(track) + "/" + str(unit) 
            + "/" + colab)
        colabcontent = colabfile.read()
        # Check metadata of colab to ensure running Python 3
        if not ("\"name\":\"python3\"" in colabcontent) and not ("\"name\": \"python3\"" in colabcontent):
            toPrint += track + "/" + unit + "/" + colab + " is not using python 3.\n\n" 
    return toPrint

def outputsOff(track, unit, colabs):
    ''' This function will tell us if the colaboratory notebooks have saved
        outputs turned on or not
        Inputs: Track, Unit, List of Colab notebooks
        Output: string of all colabs with outputs left in them
    '''
    toPrint = ""
    for colab in colabs:
        colabfile = open(inContentFolder + str(track) + "/" + str(unit) 
            + "/" + colab)
        colabcontent = colabfile.read()
        # Checks to ensure all colab outputs in metadata are empty (denoted [])
        if ("\"outputs\": [{" in colabcontent) or ("\"outputs\":[{" in colabcontent):
            toPrint += track + "/" + unit + "/" + colab + " has an uncleared output.\n\n" 
    return toPrint

def main():
    # Setting up a markdown file to write all of the output to
    outmd = open(outputFile, "w")
    outmd.write("## Test Results\n\n")
    
    # Get all folders in the content folder
    tracks = [dI for dI in os.listdir(contentFolder) if os.path.isdir(
    os.path.join(contentFolder,dI))]

    # Separating the numbered tracks from the extra content, sorting then reappending
    sequencetracks = []
    extratracks = []
    for track in tracks:
        if (track[0:2] == "t0") or (track[0:2] == "t1"):
            sequencetracks += [track]
        else:
            extratracks += [track]

    sequencetracks.sort()
    extratracks.sort()
    alltracks = sequencetracks + extratracks

    # Create empty strings to record our testing results
    py3check = ""
    outputcheck = ""
    spellcheck = ""
    answerkeycheck = ""

    # Goes through each track, gets track name, unit name, list of colabs
    for track in alltracks:
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
            content = content.replace("  ", " ") #three lines were necessary :/
            content = content.replace("  ", " ") #can be prevented by fixing all jsons
            content = content.replace('" "', '","')
            parsed_json = json.loads(content)

            colabs = []
            if "colabs" in parsed_json.keys():
                colabs += parsed_json["colabs"]
            elif "colab" in parsed_json.keys():
                colabs += parsed_json["colab"]
            
            # Make calls to our helper functions that test colabs
            testResults = usePython3(track, unit, colabs)
            py3check += testResults
            testResults = outputsOff(track, unit, colabs)
            outputcheck += testResults
            testResults = spellCheck()
            spellcheck += testResults
            testResults = containAnswerKey(track, unit, colabs)
            answerkeycheck += testResults

            jsonfile.close()
    
    # Write out our test results for each
    outmd.write("### Are Colabs using Python 3?\n")
    if (py3check == ""):
        py3check = "Success!\n\n"
    outmd.write(py3check)

    outmd.write("### Are Colabs cleared of all outputs?\n")
    if (outputcheck == ""):
        outputcheck = "Success!\n\n"
    outmd.write(outputcheck)

    outmd.write("### Are all Colabs and Slides free of spelling errors?\n")
    if (spellcheck == ""):
        spellcheck = "Tests not yet implemented!\n\n"
    outmd.write(spellcheck)

    outmd.write("### Do all exercises have an answer key?\n")
    if (answerkeycheck == ""):
        answerkeycheck = "Success!\n\n"
    outmd.write(answerkeycheck)

    outmd.close()

# Call our main function to run our script!
main()