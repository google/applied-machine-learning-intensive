# How to Think Like a Data Scientist

This is a project based course to get you to think like a data scientist, teach
you some of the tools of a data scientist and generally improve your problem
solving skills.

Course Outputs Learning Objectives

*   Articulate the data processing
*   Extract data using SQL
*   Gather data from the Internet; combine data from sources
*   Clean the data
*   Handle missing data/finding outliers/fixing data
*   Normalize the data
*   Visualize the data
*   Translate questions to analysis
*   Analyze data
*   Single variable regression, logistic regression
*   Market basket analysis
*   Cohort analysis
*   Sentiment analysis, exposure to Bayes
*   Time series
*   Geographic analysis
*   Simulations, Monte Carlo
*   Run basic statistical tests, set up null hypotheses

## Course Outline

### [Week 1-2] -- Module 1

*   Spreadsheets. Ex: Environmental studies, weather, happiness * data on
    countries

    *   Descriptive statistics
    *   Charts: Scatter plots, box plots, line plots, histograms

*   Using functions, including vlookup

*   Optimization using Solver

### [Weeks 3-4] -- Module 2

Review of Frequency Analysis for Textual Data. Data from United Nation dataset.

*   Brainstorming/Generating questions: What were hot topics? What topics are
    common?
*   Using Word Cloud & textatistic library in Python
*   Using Web APIs
*   Join two datasets

End-of-Module Exercise: Pick your favorite out-of-copyright data repository, and
analyze character references. Project Gutenberg.

*   Module Intro (1 day)

    *   Loading files
    *   This will be good review for python usage, e.g. reading files, working
        with dictionaries, etc.
    *   Give an example of a question on something simple: what were important
        topics discussed in 1970?
    *   From this dataset, ask students what other questions would they want to
        explore, jot down on the board. Add seeded questions to the board (from
        facilitator guide).
    *   Segue into answering student-driven questions using Pandas; framing
        Pandas as a way to address pain felt earlier

*   Pandas Intro

    *   Prework: Watch Tutorials to get intro to Pandas: \
        https://www.youtube.com/watch?v=5JnMutdy6Fw
    *   Data Exploration Exercise #1 (Do this, what happened?, modify it,
        repeat):
    *   Load data into data frame
    *   Use filtering to see only the data from 1970)
    *   see only data from 1970 from U.S.
    *   Group By Year
    *   Group By Country
    *   Answer one of the questions you generated above, using some of the
        things you just learned/explored.

*   Data Exploration #2: Quantify Text Data using

    *   Use wordcloud to create a visual, introduce that it’s minor data
        cleaning (removes ‘and’, ‘the’)
    *   Use textatistic to assign a number to each row (add a column to your
        dataset)
    *   Instructor-led debrief to review solution(s) and relay tips
    *   Plot the complexity calculated

*   Screen Scrape CIA data

    *   CIA data is available online but not very convenient. The CSV file we
        have is from 2006 so is quite outdated. We would like to update this
        data.
    *   Tutorial using requests python module
    *   https://towardsdatascience.com/data-analytics-with-python-by-web-scraping-illustration-with-cia-world-factbook-abbdaa687a84

*   Data Exploration #3:

    *   Add continent, region, GDP, life expectancy to our dataset
    *   Create a simple visualization using newly added data (e.g. showing each
        country on the map with life expectancy)
    *   Save the dataset by exporting to CSV so that you don't have to pull the
        data again

### [Weeks 5-6] Module 3

*   Review of Frequency Analysis for Numeric Data. A numeric-based exercise from
    say DataUSA, pop culture (movie gross?)
    *   Brainstorming/Generating questions: What were hot topics? What topics
        are common?
    *   Reading CSV/JSON
    *   Handle missing data
    *   Normalize the data
    *   Correlation
    *   Regression or classification
    *   Exercise: TBD

### [Week 7-8] Midterm Project Weeks

Work in pairs, choose your dataset In-class work on projects -- practice
applying concepts from modules above

### [Week 8-9] Module 4

Predictive -- simple recommender system. Ex: Insta-cart shopping basket
recommendation; MovieLens data; beer & diapers story; movies/music/books. *
Correlation * Pull in Heat maps * SQL basics * Bias

### [Week 10-11] Module 5

*   Time Series/Historical Data Analysis. Ex: Hamburger prices
    *   Currency converting
    *   Histograms
    *   Sampling
    *   Hypothesis testing

### [Week 12, Holiday Break, TBD & movable] Fun Model + Choosing Visualizations

*   Simulation -- Monte Hall -- 3 Doors, Prize
*   Choosing between chart types for reports
*   Dice or Roulette simulation
*   Extra alternatives: Cohort Analysis

### [Week 13-14] Final Project & Presentation Week

Work in pairs, choose your dataset Presentations (possibly a poster fair) &
feedback
