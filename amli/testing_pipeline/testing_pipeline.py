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

#All things imported in josh's spellcheck
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
import hashlib
import logging
from os import path
import nbformat
#from ratelimiter import RateLimiter #need to find what to install to make this one work
#from google3.i18n.encodings.inputconverter import pywrapinputconverter
#from google3.net.rpc.python import pywraprpc
#from google3.net.rpc.python import rpcutil
#from google3.net.rpc.python.contrib import rpc_retry
#from google3.pyglib import gfile
#from google3.spelling.spelling2.red_underline.proto import spelling_check_pb2
#from google3.spelling.spelling2.red_underline.proto import spelling_check_service_pb2
#from google3.testing.pybase import googletest

import os # for navigating folders
import json # for parsing the metadata files
import re # for regex
from spellchecker import SpellChecker
#got this from 'pip install pyspellchecker'

spell = SpellChecker()

okwords = [
  "we're",
  "doesn't",
  "that's",
  "bulleted",
  "markdown",
  "markdowns",
  "we've",
  "we'll",
  "pyplot",
  "jupyter",
  "colab",
  "url",
  "emailed",
  "notebook's",
  "github",
  "matplotlib",
  "colaboratory",
  "cell's",
  "numpy",
  "you're",
  "clickable",
  "syntaxes",
  "you'll",
  "aren't",
  "placeholders",
  "initializes",
  "code's",
  "initialize",
  "isn't",
  "lowercase",
  "bools",
  "hasn't",
  "placeholder",
  "it's",
  "cosines",
  "modulos",
  "concatenates",
  "troubleshoot",
  "haven't",
  "function's",
  "optimizations",
  "you've",
  "cannot",
  "won't",
  "computer's",
  "bool",
  "shouldn't",
  "hashtag",
  "modeled",
  "google",
  "employee's",
  "dunder",
  "holdouts",
  "initializer",
  "paycheck",
  "todo",
  "lambdas",
  "pythonic",
  "comprehensions",
  "heatmap",
  "seaborn",
  "graphing",
  "heatmaps",
  "visualizations",
  "toblerone",
  "snickers",
  "myveryownerror",
  "datapoints",
  "datatable",
  "python's",
  "snickerdoodle",
  "row's",
  "dataframe",
  "empanadas",
  "mochi",
  "store's",
  "company's",
  "unit's",
  "yournumber",
  "ellabelle",
  "groupby",
  "chain's",
  "dataframes",
  "dicetograph",
  "barheights",
  "numsides",
  "yaxisheight",
  "numrolls",
  "dicerolls",
  "xlabels",
  "chocbarstograph",
  "chocbarpops",
  "unweighted",
  "getbars",
  "sumpop",
  "numbars",
  "frequencybar",
  "barprobs",
  "chocbars",
  "misidentified",
  "butterfinger",
  "algorithm's",
  "plagiarized",
  "misidentify",
  "uber",
  "kde",
  "euler's",
  "labeling",
  "measureable",
  "pearson's",
  "who've",
  "multicategory",
  "kelvin's",
  "student's",
  "youtube's",
  "pearsonr",
  "pseudorandom",
  "distribution's",
  "signups",
  "multiclass",
  "protists",
  "archaebacteria",
  "csv",
  "they've",
  "we'd",
  "cacao",
  "boxplot",
  "nulls",
  "iterating",
  "unicode",
  "dataset's",
  "upload",
  "bar's",
  "here's",
  "aftermelt",
  "flavors",
  "uploaded",
  "bean's",
  "dspl",
  "programmatically",
  "hyperparameters",
  "transportation's",
  "datatype",
  "walkthrough",
  "delaybymonth",
  "preprocessor",
  "matplotlib's",
  "graphed",
  "user's",
  "setosa",
  "sepal",
  "colabs",
  "versicolor",
  "mse",
  "virginica",
  "preprocessing",
  "sklearn",
  "regressor",
  "optimizer",
  "sgd",
  "wasn't",
  "rmse",
  "sgdregressor",
  "pseudoinverse",
  "coef",
  "scikit",
  "linearregression",
  "overfitting",
  "elasticnet",
  "standardscaler",
  "logisticregression",
  "autoplay",
  "cmap",
  "iterates",
  "model's",
  "eigenpairs",
  "intialize",
  "minmaxscaler",
  "normalizes",
  "lightgreen",
  "idx",
  "scaler",
  "overfit",
  "underpredict",
  "tensorflow",
  "initialization",
  "initialized",
  "linearregressor",
  "learnings",
  "predctions",
  "terabytes",
  "optimizers",
  "tensorflow's",
  "panda's",
  "optmizer",
  "preprocess",
  "machine's",
  "resized",
  "resizing",
  "coloring",
  "website",
  "resize",
  "pillow's",
  "sneaker",
  "rgba",
  "uploading",
  "shutil",
  "unpacks",
  "opencv",
  "fourcc",
  "iterable",
  "lgtm",
  "elif",
  "opencv's",
  "orig",
  "prebuilt",
  "bgr",
  "autograding",
  "pixabay",
  "entrypoint",
  "people's",
  "situps",
  "tarfile",
  "tensorboard",
  "gzipped",
  "standouts",
  "linux",
  "rfid",
  "mobilenet",
  "stratifying",
  "tpr",
  "ungraded",
  "precisions",
  "ovo",
  "eyeballing",
  "auc",
  "classifer",
  "bucketized",
  "bucketization",
  "rumored",
  "appetizers",
  "bucketize",
  "costco",
  "dichotomizing",
  "individual's",
  "downloads",
  "holdout",
  "simplicity's",
  "what's",
  "predefinedsplit",
  "stringio",
  "movieproperties",
  "popularitydistance",
  "movielens",
  "skinthickness",
  "knn",
  "recode",
  "popularitya",
  "movienumratings",
  "movieid",
  "movienormalizednumratings",
  "avgrating",
  "id's",
  "bloodpressure",
  "scipy",
  "diabetespedigreefunction",
  "dist",
  "story's",
  "tiis",
  "konstan",
  "genresb",
  "they're",
  "movie's",
  "popularityb",
  "genredistance",
  "genresa",
  "moviedict",
  "acm",
  "wikimedia",
  "inbox",
  "multicollinearity",
  "phishing",
  "gmail",
  "regex",
  "zipfile",
  "alphago",
  "modeling",
  "parameterize",
  "rng",
  "svm",
  "hyperparameter",
  "svc",
  "mnist",
  "iterator",
  "dnnclassifier",
  "logits",
  "hardcode",
  "passengerid",
  "linearclassifer",
  "labelencoder",
  "kaggle",
  "cormat",
  "wip",
  "convolutional",
  "vertial",
  "ksize",
  "preprocessed",
  "endindex",
  "unstacking",
  "keras",
  "zalando",
  "reformats",
  "colorbar",
  "thisplot",
  "unlabeled",
  "ints",
  "inertias",
  "versicolour",
  "backpropagation",
  "embeddings",
  "maxlen",
  "imdb",
  "truncate",
  "metadata",
  "there's",
  "rnn",
  "ipo",
  "sess",
  "rnns",
  "tf",
  "yb",
  "xb",
  "yesterday's",
  "spacy",
  "vectorize",
  "it'd",
  "learn's",
  "usernames",
  "zfile",
  "tokenizer",
  "zipdata",
  "filepath",
  "vectorization",
  "vectorizer",
  "spellcheck",
  "keras's",
  "decompressor",
  "variational",
  "augmenters",
  "imgaug",
  "autoencoders",
  "denoising",
  "nrows",
  "denoised",
  "colorize",
  "vae",
  "augmenter",
  "denoise",
  "rescale",
  "vaes",
  "autoencoder",
  "neighborhoods",
  "autoencoder's",
  "image's",
  "async",
  "deepfake",
  "sobel",
  "obama",
  "vgg",
  "reinitialize",
  "pretrained",
  "grad",
  "layer's",
  "imagenet",
  "functools",
  "noised",
  "blog",
  "khandelwal",
  "trainable",
  "tqdm",
  "renu",
  "lstms",
  "lstm",
  "timesteps",
  "trainscore",
  "day's",
  "testscore",
  "sqlite",
  "timestamp",
  "newspaper's",
  "mysql",
  "facebook's",
  "sensical",
  "postgresql",
  "bikeid",
  "google's",
  "bigquery",
  "abbbc",
  "abbbbc",
  "abbbbbc",
  "diggity",
  "abbbbbbc",
  "abbbbbbbc",
  "literals",
  "abbc",
  "refactor",
  "lookups",
  "tradeoffs",
  "trienode",
  "svd"
]

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
            testResults = spellCheck(track, unit, colabs)
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