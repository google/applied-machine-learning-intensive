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
# Spell Check: Copied in josh's code, but commented it all out because it was causing lots of errors. 
# looking at packages, I think we might have to start over with our own idea because these look like
# google only things we might not be able to download.
# Contains Answer Key: Pretty Close - they'll let us know what exact wording to look for
# Style Guide Rules: there is no syle guide at the link they gave
# Referenced Images: Not entirely sure whether we should just be checking urls or trying to actually find
#   source of image - look more into image license notes in colabs + slides

import os # for navigating folders
import json # for parsing the metadata files
import re # for regex
from spellchecker import SpellChecker
#got this from 'pip install pyspellchecker'
from spellcheck_exceptions import okwords

spell = SpellChecker()


# Global Variables
outputFile = "TestResults.md"
contentFolder = "../content"
inContentFolder = "../content/"

def spellCheck(track, unit, colabs):
    ''' Checks spelling and grammar of Colabs and Slides
        Output: string of colabs and slides with spelling and grammar issues
    '''
    toPrint = ""
    for colab in colabs:
      colabfile = open(inContentFolder + str(track) + "/" + str(unit) 
            + "/" + colab)
      colabcontent = colabfile.read()
      colabcontent = re.sub(r'\"id\": \"............\"', '', colabcontent)
      colabwords = colabcontent.split()
      newcolabwords = []
      for index in range(len(colabwords)):
        if(len(colabwords[index]) > 1):
          if(colabwords[index][0] == "(") or (colabwords[index][0] == "'") or (colabwords[index][0] == "\""):
            colabwords[index] = colabwords[index][1:]
          if(colabwords[index][-1] == ")") or (colabwords[index][-1] == "'") or (colabwords[index][-1] == "\"") or (colabwords[index][-1] == ".") or (colabwords[index][-1] == ",")or (colabwords[index][-1] == "?") or (colabwords[index][-1] == "!")or (colabwords[index][-1] == ":") or (colabwords[index][-1] == ";"):
            colabwords[index] = colabwords[index][:-1]
        if(len(colabwords[index]) > 1):
          if(colabwords[index][-1] == "'"):
            colabwords[index] = colabwords[index][:-1]
        if(len(colabwords[index]) > 1):
          if(colabwords[index][0] == "'"):
            colabwords[index] = colabwords[index][1:]
        m = re.search(r'[^a-zA-Z\']', colabwords[index])
        if(m == None) and (len(colabwords[index]) > 0):
          newcolabwords += [colabwords[index]]
      misspelled = spell.unknown(newcolabwords)
      for word in misspelled:
        if not word in okwords:
          toPrint += track + "/" + unit + "/" + colab + " contains nonword " + word + "\n\n"
    return toPrint


def imagesLicensed(track, unit, slides):
  toPrint = ""
  for slide in slides:
    #check number of images and number of image citations
    x = 0
  return toPrint



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
    licensecheck = ""

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
            
            slides = []
            #write code to get list of slide files
            
            # Make calls to our helper functions that test colabs
            testResults = usePython3(track, unit, colabs)
            py3check += testResults
            testResults = outputsOff(track, unit, colabs)
            outputcheck += testResults
            testResults = spellCheck(track, unit, colabs)
            spellcheck += testResults
            testResults = containAnswerKey(track, unit, colabs)
            answerkeycheck += testResults
            testResults = imagesLicensed(track, unit, slides)
            licensecheck += testResults

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
        spellcheck = "Success!\n\n"
    outmd.write(spellcheck)

    outmd.write("### Do all exercises have an answer key?\n")
    if (answerkeycheck == ""):
        answerkeycheck = "Success!\n\n"
    outmd.write(answerkeycheck)

    outmd.write("### Are all images correctly licensed?\n")
    if (licensecheck == ""):
        licensecheck = "Not written yet!\n\n"
    outmd.write(licensecheck)

    outmd.close()

# Call our main function to run our script!
main()