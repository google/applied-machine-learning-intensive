# AC1 Instructor Guide

-   [Overview](#overview)
-   [Module A](#module-a)
    *   [1.1 Class Data Activity](#11-class-data-activity)
    *   [1.2 Community Guidelines & Pretest](#12-community-guidelines---pretest)
    *   [2.1 Visualizations](#21-visualizations)
    *   [2.2 Creating Visualizations](#22-creating-visualizations)
    *   [3.1 Sheets Basics](#31-sheets-basics)
    *   [3.2 Basic Descriptive Statistics](#32-basic-descriptive-statistics)
    *   [4.1 Basic Descriptive Statistics](#41-basic-descriptive-statistics)
    *   [4.2 Filtering and Grouping](#42-filtering-and-grouping)
    *   [5.1 Module A Project](#51-module-a-project)
    *   [5.2 Module A Project](#52-module-a-project)
-   [Module B](#module-b)
    *   [1.1 Scatter Plots and Correlation](#11-scatter-plots-and-correlation)
    *   [1.2 Regression and Predictions](#12-regression-and-predictions)
    *   [2.1 Regression Best Practices](#21-regression-best-practices)
    *   [2.2 Filtering](#22-filtering)
    *   [3.1 Pivot Tables](#31-pivot-tables)
    *   [3.2 Pivot Tables](#32-pivot-tables)
    *   [4.1 Joining Data](#41-joining-data)
    *   [4.2 Overflow](#42-overflow)
    *   [5.1 Cleaning for Project Prep](#51-cleaning-for-project-prep)
    *   [5.2 Module B Project](#52-module-b-project)

## Overview

This is an instructor’s guide for facilitating AC101 class sessions. Each
section covers one class day, including learning objectives, a hook, activities,
and datasets used. As described in the
[course guide](https://github.com/google/applied-machine-learning-intensive/blob/master/acs/ac1/doc/course-guide.md),
opportunities for livecoding will be marked with **[DEMO]**, for ethics
discussion marked with **[ETHICS]**, and for practice with hypothesis forming
and testing marked with **[HYP]**.

## Module A

### 1.1 Class Data Activity

#### Learning Objectives

*   Students will differentiate the uses for and privacy levels of a complete
    data set compared with summary information. (E)
*   Students will identify potential sources of bias in research and survey
    questions. (E)
*   Students will critique and refine the appropriateness of survey and research
    questions. (E)

#### Hook

Expected time: 10 minutes

*   Icebreaker
*   Introduce yourself and the purpose and idea of the class in a few sentences.
    Make sure students know what this class is and isn’t (you can use
    [What is AC101?](https://github.com/google/applied-machine-learning-intensive/blob/master/acs/ac1/doc/course-guide.md)
    as a guide).
*   Give students a taste of what they will be doing and learning at the end of
    the course by talking through Module C project work. Be mindful of not
    intimidating them but exciting them to learn more.
*   Walk through the textbook preface, including the AC101 Intro Video.

#### Activities

<span style="text-decoration:underline;">Class Data Activity</span>

Expected time: 35 minutes

1.  Form students into groups of 3-4, have them get to know each other.
1.  Have each group answer the question: What does your group have in common
    that the rest of the class might not?
    1.  Encourage them to think about non-visible traits (i.e. avoid something
        like “we’re the only ones with glasses”). We want them to start getting
        to know each other.
    1.  **[ETHICS]** Let groups know that they’ll be sharing with the class, so
        consider assumptions they may be making about the class and any
        questions that may be sensitive.
1.  **[DEMO]** Demonstrate using Google Forms to write (good) questions. Write
    1-2 bad questions as well and have the class discuss what is wrong with
    those questions.
    1.  Example of bad questions (too vague, probing, uncomfortable, etc.):
        1.  How many places have you lived? (What counts?)
        1.  Have you ever been arrested? (Can we expect honest answers?)
        1.  What would you not ask someone in a face to face conversation?
    1.  Example of good questions (well defined, easy to answer):
        1.  How many different cities have you lived in for more than 3 months?
        1.  Are you on a school sports team (club or varsity)?
1.  **[HYP]** Have each group come up with 3 questions to ask the class, to
    confirm/support their original hypothesis in Step 1.
    1.  At least one of the questions should have a numeric response (e.g. “How
        long does it take you to get to class?”), and at least one should have a
        worded response (e.g. “What is your favorite color?”).
1.  Collect each group’s questions into an anonymous Google Forms survey and
    have everyone in the class fill out the survey.
    1.  This is also a chance to introduce working with Google Forms, to prepare
        students to create their own surveys in the project.

<span style="text-decoration:underline;">Analyzing Class Data</span>

Expected time: 35 minutes

1.  Have each group view their summarized collected data using the Forms
    analysis tab.
    1.  Can you identify yourself in the summarized data?
    1.  **[HYP]** Any surprising results?
    1.  [Optional] What questions were confusing? How could you refine them?
        Lead a Think-Pair-Share (TPS) with each group suggesting 1-2 changes.
1.  **[DEMO]** Show the raw collected data in Sheets.
    1.  Can you identify yourself?
    1.  **[ETHICS]** Is this different from the summarized data? Why? Discuss
        potential privacy concerns if they can identify themselves in the data
        (either summarized or not).
1.  **[HYP]** Brainstorm with your group - three questions you might ask about
    our class based on this collected data.
1.  [Optional] Refine Survey and Redeploy
    1.  Using refinement suggestions and questions, modify and redeploy survey.

<span style="text-decoration:underline;">Homework</span>

1.  Fill out a survey on community guidelines (for discussion in the next
    class). [Here is a sample survey](https://forms.gle/VAuoGjsGsQke12xY9) you
    can use.
1.  Read syllabus if you provide one.

#### Datasets

*   N/A: Students will collect their own data from the class.

### 1.2 Community Guidelines & Pretest

#### Learning Objectives

*   N/A

#### Hook

Expected time: 10 minutes

*   Discuss any questions students have about the syllabus/course.
*   Discuss the importance of designing community guidelines/norms for the
    course.
*   Discuss what the pretest is and why it is important.

#### Activities

<span style="text-decoration:underline;">Community Guidelines</span>

Expected time: 40 minutes

1.  **[DEMO]** Display community guidelines survey results (from homework).
1.  Facilitate
    [community guidelines discussion](https://github.com/google/applied-machine-learning-intensive/blob/master/acs/ac1/doc/course-guide.md#setting-community-guidelines).

<span style="text-decoration:underline;">Pretest</span>

Expected time: 30 minutes

1.  Facilitate pretest.

<span style="text-decoration:underline;">Homework</span>

1.  Read: A2.1 Introduction to Visualizations up to the “Examples” section.
1.  Bring in 1-2 examples of interesting visualizations to discuss.
    1.  Think of a visualization that surprised you, that you found particularly
        interesting, or that you just think “looks cool”.
    1.  [Here’s a list ](https://fivethirtyeight.com/features/the-45-best-and-weirdest-charts-we-made-in-2018/)to
        choose from, if students want more guidance.
1.  [Optional] Finish up class data activity with your group:
    1.  Decide on a research question from your brainstorm.
    1.  Use the class data to answer your research question.
    1.  Create a short presentation (title slide + 1-2 minutes) to present to
        class.

#### Datasets

*   N/A: Students use previously collected class data.

### 2.1 Visualizations

#### Learning Objectives

*   Students will choose the most appropriate chart for their data type and
    research question. (V)
*   Students will critique visualizations and related reports (articles, news
    stories and student projects) for completeness, clarity, bias and narrative.
    (V)
*   Students will explain why making data visualizations accessible is
    important, and refine their graphs with accessibility best practices in
    mind. (V, E)

#### Hook

Expected time: 10-15 minutes

*   Example from textbook: “The five types of Nicolas Cage movies”
    *   **[DEMO]** display the visualization to students
    *   Think-pair-share (TPS):
        *   What do you think the key point of this visualization is?
        *   What has the author drawn attention to, and how?
        *   Does this visualization make the information easy to interpret?
    *   Have students read/skim the source FiveThirtyEight article (5 minutes)
    *   Group discussion:
        *   Did you read every word in the article?
        *   Did you look at every picture in the article?
        *   Did the visualization make this information easier to interpret than
            the text did?

#### Activities

<span style="text-decoration:underline;">Visualizations Checklist</span>

Expected time: 20 minutes

1.  Example from textbook: “What if only nonwhite people voted?”
    *   Have students work through this example on their own. If you want, you
        can display the 5 maps from the article before they start reading.
    *   As a class, walk through the “What should I look for when reading a
        visualization?” checklist from the textbook. Use this time to explain
        and clarify each step in the checklist.
    *   Point out that the checklist for “What should I keep in mind when
        creating a visualization?” can also be used to analyze a visualization.
        For example, “Make the visualization physically accessible to all”
        translates to “Is this visualization physically accessible to all?” when
        analyzing.

<span style="text-decoration:underline;">Analyze Student Visualizations</span>

Expected time: 45 minutes

1.  Form students into groups of 3-4. Each group should pick 1 of the
    visualizations they brought to share with the class.
1.  For each group’s visualization, walk through the visualization checklist
    with the class. Depending on the comfort level of the class, you may either
    need to ask specific questions (e.g. “Who is the author?”), or open-ended
    questions (e.g. “Describe this visualization”). The most important things
    students should be noticing are:
    1.  What point is the author trying to make? Who is the author?
    1.  What data was used to make this visualization? What questions might you
        have about the data or how it was collected?
        1.  Consider location, demographics, sampling, and time.
    1.  How trustworthy is this visualization? (e.g. How rigorously was it
        reviewed? What biases might the author have? Is there anything that this
        visualization is hiding or misrepresenting?)
    1.  Why did the author choose this type of visualization?
    1.  **[ETHICS]** Are there any accessibility concerns? Is this visualization
        the simplest way to express this information? How does bias affect
        ethics?
1.  Have the students share out any examples that they found ineffective or
    misleading after the analysis (prepare some bad examples to share in case
    there are none, [here’s a list](https://viz.wtf/) of several). Why are those
    examples ineffective or misleading?

<span style="text-decoration:underline;">Homework</span>

1.  Read: A2.1 Introduction to Visualizations “Checklists” section.
1.  Read [this article](https://www.dataquest.io/blog/design-tips-for-data-viz/)
    on tips for creating visualizations.
1.  Read A2.2 Histograms and Bar Charts up to “What is the difference between a
    histogram and a bar chart?”

#### Datasets

*   N/A: you can choose other examples of visualizations (good or bad) to share
    if you want!

### 2.2 Creating Visualizations

#### Learning Objectives

*   Students will choose the most appropriate chart for their data type and
    research question. (V)
*   Students will use sheets to construct histograms and bar charts. (V)
*   Students will explain why making data visualizations accessible is
    important, and refine their graphs with accessibility best practices in
    mind. (V, E)

#### Hook

Expected time: 10 minutes

*   **[DEMO]** Show two visualizations using the same data. We like using map
    projections (also a good excuse to show
    [this wonderful clip](https://www.youtube.com/watch?v=vVX-PrBRtTY) from The
    West Wing), but feel free to pick your own. Lead a brief discussion.
    *   **[HYP]** What is communicated by each? Why might the creators have
        chosen one visualization over the other?
        *   (If you’re using map projections, the guiding principle is there’s
            always a tradeoff between accurate sizes vs. accurate shapes vs.
            aesthetics)
    *   **[ETHICS]** How can visualizations be misleading?

#### Activities

<span style="text-decoration:underline;">Histograms and Bar Charts</span>

Expected time: 20 minutes

1.  **[HYP]** Have a brief class discussion about the difference between a
    histogram and bar chart. (What do students think, based on seeing the 2
    charts in the textbook?)
1.  Explain the difference based on categories vs. numbers, discuss the question
    at the end of the section.

<span style="text-decoration:underline;">Visualizations in Sheets</span>

Expected time: 30 minutes

1.  All 3 examples are in
    [this spreadsheet](https://docs.google.com/spreadsheets/d/e/2PACX-1vRvSQRACxVLn_ub1CASmgMQw8G-6eB3196meAi2mgpID2MMmrQeAhosYfRfZgUIcbxuylCdfhq8Kar6/pubhtml#).
1.  **[DEMO]** Demo creating a bar chart using the “bar chart” sheet and a
    histogram using the “histogram” sheet. Show how to adjust text labels, text
    size, and bin size.
1.  Using the data in the “question” sheet, have students choose the appropriate
    graph and create the graph.
    1.  Students should create a histogram, since the x-axis is a number (time).
    1.  **[ETHICS]** As a group, discuss the “What should I keep in mind when
        creating a visualization?” checklist for their created graphs.

<span style="text-decoration:underline;">Accessibility Exercise</span>

Expected time: 10 minutes

*   **[ETHICS]** There are no hard and fast guidelines for what text size / what
    colors are most readable. Have students critique different color/font/size
    choices in visualizations.
    *   Some ideas for picking visualizations to critique: fiddle with the
        design of the histogram they’ll create in class (colors with low
        contrast, too small text, no / bad label texts, etc), using a pie chart
        instead of a histogram or bar chart, bar chart with less white space
        between bars, using a color legend vs. direct labeling
*   Encourage them to seek feedback if they’re unsure about a visualization in
    the future -- a second look by someone else can often uncover new insights

<span style="text-decoration:underline;">Homework</span>

1.  Read
    [this article](http://www.storytellingwithdata.com/blog/2018/6/26/accessible-data-viz-is-better-data-viz)
    on tips for creating accessible visualizations.
1.  Read
    [this article](https://professor-excel.com/mistakes-in-excel-the-5-biggest-spreadsheet-fails/)
    on famous spreadsheet errors.
1.  Read: A3.1 Sheets Basics up to the “Chocolate Cake” example.

#### Datasets

*   Choose two visualizations that communicate different results but use the
    same data.
    *   Example:
        [Mercator projection](https://en.wikipedia.org/wiki/Mercator_projection)
        vs.
        [Gall-Peters projection](https://en.wikipedia.org/wiki/Gall%E2%80%93Peters_projection)
        *   In this case, both visualizations are widely used but both are “bad”
            in their own way. Mercator distorts size while Peters distorts
            shape. If students are interested,
            [here’s a fun XKCD](https://xkcd.com/977/) that is a pretty good
            survey of all the popular projections out there.
*   We’ve created 3 small datasets to use with the Visualizations in Sheets
    activity:
    *   “bar chart”: survey of 42 students’ favorite ice cream shop, out of 5
        choices
    *   “histogram”: time (in minutes) between train arrivals. Each row is one
        observed time, generated using an exponential distribution with an
        average rate of 1 train per minute.
    *   “question”: time (in minutes) until students get bored in lecture. Each
        row is one student.

### 3.1 Sheets Basics

#### Learning Objectives

*   Students will identify, modify and explain the relationship between
    components within spreadsheets including cells, cell locations, formulas,
    and different data types. (PR)
*   Students will perform basic computations in sheets, and interpret and
    construct formulas in sheets. (PR, DT)
*   Students will relate the row and column structure of a spreadsheet to the
    individuals and variables of a dataset. (PR)
*   Students will differentiate the uses for and privacy levels of a complete
    data set compared with summary information. (E)

#### Hook

Expected time: 5-10 minutes

*   **[ETHICS]** Discuss the article on famous spreadsheet errors from homework.
    *   What surprised you? Why are spreadsheets so widely used if it’s so easy
        to make a “catastrophic” mistake?
        *   Answer: because sheets are massively useful. The rest of the class
            will showcase a few of these use cases.

#### Activities

<span style="text-decoration:underline;">Sheets Syntax</span>

Expected time: 25 minutes

1.  **[DEMO]** See if there are syntax questions from the reading, demoing them
    as needed using the
    [chocolate cake spreadsheet](https://docs.google.com/spreadsheets/d/e/2PACX-1vSO6-yeSWwvbmnGgvVX4umu-JgoeTPkwZ9fmtjPLYA250E6m6zySZCr5Al3n8MNQw0Vyt-GIgiv_iER/pubhtml#).
1.  **[DEMO]** Work through chocolate cake example. This example should be more
    scaffolded since it is their first introduction to Sheets, and a chance for
    you to show some good working practices.
    1.  The textbook walks through the example step-by-step. We recommend live
        coding up to entering the formula in cell D2 (amount of flour for custom
        servings)
        1.  To make this more interactive, ask students to come up with the
            formulas
    1.  **[HYP]** Discuss: What will happen if you drag the formula in column D
        down to the rows below?
    1.  Demo the dragging and discuss what happens vs. what they want to happen.
        Segue this into an explanation of absolute vs. relative referencing.
    1.  Change the “number of servings” to show how the amounts in column D
        automatically update.
1.  Work through Fibonacci example. The textbook walks through the example
    step-by-step, so if you want more interactive practice:
    1.  Introduce the Fibonnaci sequence and ask students to find the 50th
        Fibonnaci number (without Sheets). Give them a few minutes - they might
        not finish in time, this is fine.
    1.  Set up a sheet with the first two numbers in the sequence and have them
        work in small groups to come up with the formula / dragging (scaffolding
        as needed).

<span style="text-decoration:underline;">Sheets Practice</span>

Expected time: 45 minutes

1.  Work through
    [Painters example](https://docs.google.com/spreadsheets/d/e/2PACX-1vSO6-yeSWwvbmnGgvVX4umu-JgoeTPkwZ9fmtjPLYA250E6m6zySZCr5Al3n8MNQw0Vyt-GIgiv_iER/pubhtml#).
    The textbook walks through the example step-by-step, so if you want more
    interactive practice:
    1.  **[DEMO]** Introduce conditional formulas (e.g. “=H2>200”), AND, and IF.
    1.  Give students the dataset, the problem of finding prolific French
        painters, and set them loose in small groups to work on it.
    1.  **[HYP]** Naturally, errors should arise and students will have to debug
        them. Use these to lead a discussion on good debugging habits.
    1.  Students may wonder about the extra last step of printing authors’
        names -- connect this back to the “catastrophic” errors and imagine how
        much easier it’d be to miss a name in a giant dataset if they didn’t
        take this step.
1.  If you have extra time (or didn’t get to it during the Painters example),
    lead a demo around errors.

<span style="text-decoration:underline;">Homework</span>

1.  Read: textbook A3.1 Sheets Basics “Errors” section.
1.  Finish all questions from this chapter in the textbook.
1.  Read: textbook A3.2 Basic Descriptive Statistics up to the “Count and Sum”
    section

#### Datasets

*   **[Painters](https://docs.google.com/spreadsheets/d/e/2PACX-1vSO6-yeSWwvbmnGgvVX4umu-JgoeTPkwZ9fmtjPLYA250E6m6zySZCr5Al3n8MNQw0Vyt-GIgiv_iER/pubhtml#)**
    *   Description: Biographical information about 50 of the most influential
        painters of all time. We will use this example several times throughout
        this module.
    *   Source:
        [Kaggle](https://www.kaggle.com/ikarus777/best-artworks-of-all-time#artists.csv)
    *   Number of rows: 50
    *   Columns (ones we will use in this module are bolded):
        *   id: number, 0-indexed
        *   **name**: text
        *   years: text, “birth year - death year”
        *   **genre**: text, comma-separated list of all relevant art genres
        *   **nationality**: text, comma-separated list of all relevant
            nationalities
        *   bio: text, short paragraph bio from wikipedia
        *   wikipedia: text, link to wikipedia article for painter
        *   **paintings**: number, # of total paintings produced

### 3.2 Basic Descriptive Statistics

#### Learning Objectives

*   Students will explain how data science is important and give examples
    relevant to their own academic or personal interests. (S)
*   Students will use statistics to understand and describe univariate data,
    including descriptions of center and variation for quantitative and
    categorical variables. (DT)
*   Students will compare descriptive values for quantitative and categorical
    variables across subsetted groups and use these differences to identify
    relationships between variables. (DT, M)

#### Hook

Expected time: 10-20 minutes

*   Begin by seeing if there are lingering questions or material from Sheets
    Basics (there was a lot to cover!).
*   Collect the heights of each student in the room and make a quick bar chart
    in Sheets. Suppose a new student joins the class - ask students to predict
    the height of the new student.
    *   Now add two heights > 6.5 feet - assume two new, very tall students
        joined the class. Ask students to predict the height of a new student
        based on the new bar chart.
    *   The idea is to give an intuitive sense of how statistics are used.

#### Activities

<span style="text-decoration:underline;">Introduction to Statistics</span>

Expected time: 20 minutes

1.  Students should have read through the first “Weather” example. Review the
    difference between quantitative and categorical variables and see if there
    are questions.
1.  Define Count and Sum statistics.
    1.  **[HYP]** Discuss: What variables can you use Count/Sum with? What
        questions might you use Count/Sum to answer?
    1.  **[DEMO]** Introduce
        [Spotify Premium example](https://docs.google.com/spreadsheets/d/e/2PACX-1vSwJDi3X7SBfNPnqCle0JeFV5bAoxNvypf82m7mM4ITYF6HZbF4ek_O7Sy5x0YApav_KQxm8vNJf7iu/pubhtml#)
        and demo range notation using the COUNT function.
    1.  Ask students to create a function that sums all the values. Do you and
        your roommates have enough to get Spotify Premium this month?
    1.  Have students work in small groups on the 2 followup questions.
1.  Define Min and Max statistics.
    1.  **[HYP]** Discuss: What variables can you use Min/Max with? What
        questions might you use Min/Max to answer?
    1.  If students need more practice with range notation, demo the
        [Dice Roll example](https://docs.google.com/spreadsheets/d/e/2PACX-1vSwJDi3X7SBfNPnqCle0JeFV5bAoxNvypf82m7mM4ITYF6HZbF4ek_O7Sy5x0YApav_KQxm8vNJf7iu/pubhtml#).
    1.  Have students work in small groups on the
        [second Weather example](https://docs.google.com/spreadsheets/d/e/2PACX-1vSwJDi3X7SBfNPnqCle0JeFV5bAoxNvypf82m7mM4ITYF6HZbF4ek_O7Sy5x0YApav_KQxm8vNJf7iu/pubhtml#).

<span style="text-decoration:underline;">Measures of Center</span>

Expected time: 40 minutes

1.  **[HYP]** Connect this back to the Hook: how did they make their
    predictions? Define measure of center and connect it to a “best guess”.
1.  Define mean, median, and mode. Ask for students to offer examples.
    1.  **[HYP]** Discuss:
        1.  Suppose you are doing a study comparing Los Angeles (LA) and San
            Francisco (SF), and want to know whether families in one city make
            more than those in the other. What statistic(s) would you use?
        1.  You have a dataset on the birth country of all of your students. A
            new student joins your class, and you want to take a “best guess” at
            where she comes from. What measure of center would you use?
        1.  You want to do a study on whether Europeans live longer than North
            Americans. What dataset would you use, and what summary statistics
            would be useful?
    1.  At this point, students may be wondering about when to use mean vs.
        median (and the difference)... Leave them with that curiosity, for now,
        as it will motivate measures of skew / spread in the next class.
1.  **[DEMO]** Demo AVERAGE / MEDIAN functions using
    [Dice Roll example](https://docs.google.com/spreadsheets/d/e/2PACX-1vSwJDi3X7SBfNPnqCle0JeFV5bAoxNvypf82m7mM4ITYF6HZbF4ek_O7Sy5x0YApav_KQxm8vNJf7iu/pubhtml#).
1.  Work through Weather example in small groups. The textbook walks through the
    example step-by-step, so to make this interactive just give students the
    problem description: “Calculate and compare the mean maximum daily
    temperature in Seattle and NYC”.
    1.  **[HYP]** Does the result surprise you? Why, or why not?
    1.  **[HYP]** Could you use this statistic alone to compare the yearly
        temperature in both cities?

<span style="text-decoration:underline;">Homework</span>

1.  Read: textbook A4.1 Outliers and Skew up to “Skew in a Histogram” section.
1.  Read any parts of the textbook for today’s content that you didn’t get to
    finish in class.
1.  Start reading:
    [this article](https://longreads.com/2019/06/21/yentl-syndrome-a-deadly-data-bias-against-women/)
    on the dangers of data bias in medicine.
    1.  The article is quite long (~22 minutes read), and students should be
        ready to discuss it by Day 5.1 (in 3 class days, before introducing the
        Module A project).

#### Datasets {#weather-dataset}

*   **Weather
    ([NYC](https://docs.google.com/spreadsheets/d/e/2PACX-1vSwJDi3X7SBfNPnqCle0JeFV5bAoxNvypf82m7mM4ITYF6HZbF4ek_O7Sy5x0YApav_KQxm8vNJf7iu/pubhtml#),
    [Seattle](https://docs.google.com/spreadsheets/d/e/2PACX-1vSwJDi3X7SBfNPnqCle0JeFV5bAoxNvypf82m7mM4ITYF6HZbF4ek_O7Sy5x0YApav_KQxm8vNJf7iu/pubhtml#)**
    *   Description: Temperature data for each day in NYC and Seattle, from 1
        July 2014 through 30 June 2015. We will use this example several times
        throughout this module.
    *   Source:
        [FiveThirtyEight](https://github.com/fivethirtyeight/data/tree/master/us-weather-history)
        (KNYC.csv, KSEA.csv)
    *   Number of rows: 365
    *   [Columns](https://github.com/fivethirtyeight/data/blob/master/us-weather-history/README.md)
    *   For this module, we will only use “actual_min_temp”, “actual_max_temp”

### 4.1 Basic Descriptive Statistics

#### Learning Objectives

*   Students will explain how data science is important and give relevant
    examples to their own academic or personal interests. (S)
*   Students will use statistics to understand and describe univariate data,
    including descriptions of center and variation for quantitative and
    categorical variables. (DT)
*   Students will compare descriptive values for quantitative and categorical
    variables across subsetted groups and use these differences to identify
    relationships between variables. (DT, M)

#### Hook

Expected time: 5-15 minutes

*   Reflect back on the weather example from the end of last class. Recall that
    the mean max temperature in Seattle was 3 degrees higher than that of NYC.
    Ask students to calculate the _median_ maximum temperatures instead.
    *   **[HYP]** Discuss: do these statistics tell a different story? Why? What
        additional information might make this comparison more useful?
*   **[HYP]** Reflect back on the mean and median of a dice roll. Ask students
    to predict what will happen to each statistic if you replace the value of 6
    with 60.
    *   **[DEMO]** Demo the Dice Roll example, adding an outlier of 60.
    *   Think pair share and discuss how median is more “robust to outliers”
        than the mean.

#### Activities

<span style="text-decoration:underline;">Outliers and Skew</span>

Expected time: 30 minutes

1.  **[DEMO]** Show
    [the histogram](https://docs.google.com/spreadsheets/d/e/2PACX-1vSwJDi3X7SBfNPnqCle0JeFV5bAoxNvypf82m7mM4ITYF6HZbF4ek_O7Sy5x0YApav_KQxm8vNJf7iu/pubhtml#)
    from the “Skew in a Histogram” section. Have students explain the positive
    skew and right tail that it shows. Discuss the 3 follow-up questions as a
    class.** **
    1.  [Here](https://stats.stackexchange.com/questions/89179/real-life-examples-of-distributions-with-negative-skewness)
        are some examples of left-skewed datasets.
1.  **[DEMO]** Show the histogram of student heights from the last class.
    1.  Discuss: What ethical issues do outliers cause? (identifying
        individuals, making decisions, etc.)
1.  Reflect back on the income question from the last class (Comparing family
    incomes in LA and SF) for the Income example. Read the excerpt from the US
    census report.
    1.  Discuss: What kind of skew does the income distribution have? Would mean
        or median be a better statistic to use?

<span style="text-decoration:underline;">Measures of Spread</span>

Expected time: 30 minutes

1.  **[DEMO]** Introduce the Consistentville vs. Wonkytown graphic and example.
    Discuss the 2 questions as a class.
    1.  You could also act this out using fake money or tokens (e.g. give
        everyone in the class $50,000 to represent “Consistentville” then give
        half $0 and half $100,000 to represent “Wonkytown”).
1.  Define standard deviation. Discuss: when is this statistic useful?
    1.  **[DEMO]** Show
        [the histogram](https://docs.google.com/spreadsheets/d/e/2PACX-1vSwJDi3X7SBfNPnqCle0JeFV5bAoxNvypf82m7mM4ITYF6HZbF4ek_O7Sy5x0YApav_KQxm8vNJf7iu/pubhtml#)
        in “Standard Deviation in a Histogram”. Ask students which variable has
        a higher standard deviation and why.
1.  Work through Weather example in small groups. The textbook walks through the
    example step-by-step, so to make this interactive just give students the
    problem description: “Calculate and compare the standard deviation of the
    maximum daily temperature in Seattle and NYC”.
    1.  **[HYP]** Discuss: How would you interpret this result? What additional
        information might give a better idea of the year-round temperature of
        both cities?
    1.  Modify one of the data points and have students predict how that will
        affect the average, median and standard deviation.
    1.  Students may ask about the “P” at the end of “STDEVP” -- this is related
        to the difference between population and sample, which we don’t cover in
        this class. Tell them to always use STDEVP in this class, and to read
        the links in the textbook if they’re interested.

<span style="text-decoration:underline;">Homework</span>

1.  Read: textbook A4.2 Filtering and Grouping introduction sections in
    “Filtering” and “Grouping” (but not the examples).
1.  Continue reading
    [this article](https://longreads.com/2019/06/21/yentl-syndrome-a-deadly-data-bias-against-women/)
    on the dangers of data bias in medicine.

#### Datasets

*   [Weather](#weather-dataset)

### 4.2 Filtering and Grouping

#### Learning Objectives

*   Students will differentiate the uses for and privacy levels of a complete
    data set compared with summary information. (E)
*   Students will use sheets to filter data sets to examine the features of
    subsets. This includes filtering for exact, opposite, and comparison
    conditions for quantitative and categorical variables. (DT)
*   Students will use filtering and grouping to compare variables across groups
    and identify relationships between variables. (DT)

#### Hook

Expected time: 10 minutes

*   **[DEMO]** Show the spreadsheet of student heights in the class. This time,
    add a column for whether each student gets, on average, A) less than 7 hours
    of sleep, B) 7-9 hours, or C) more than 9 hours. Suppose a new student who
    sleeps on average 6 hours a night is joining the class: what would they
    predict the student’s height to be?
    *   This hook is meant to show intuitively why filtering/grouping is
        useful -- feel free to use another example! Some other ideas include
        filtering based on whether they play a sport in college, collecting time
        it takes to get to class and filtering based on method of
        transportation, or creating/using some existing dataset.

#### Activities

<span style="text-decoration:underline;">Filtering</span>

Expected time: 30 minutes

1.  This activity follows the Painters example in this section of the textbook.
1.  **[DEMO]** Add a filter for French painters (filter by nationality value =
    “French”). Then add a filter for paintings greater than 200. You should see
    the same 3 painters they found from using formulas: Renoir, Degas, and
    Gauguin.
1.  Have students work in small groups to find all prolific French painters, if
    “French” means at least one nationality is French. (They should use the
    “Text contains” condition).
1.  Have students work in small groups to count the number of French painters
    (using the original definition, so painters whose _only_ nationality is
    French), and the total number of paintings produced by those painters.
    1.  **[HYP]** They probably won’t know at first that they need to copy-paste
        the filtered data to new rows! If they don’t realize something is wrong
        with the count of French painters on their own, encourage them to always
        gut check their results. Then, ask them what they think happened and how
        to fix it.

<span style="text-decoration:underline;">Grouping</span>

Expected time: 40 minutes

1.  **[DEMO]** Review the syntax of COUNTIF, SUMIF, AVERAGEIF.
1.  In small groups, have students confirm their answers to the last exercise
    from Filtering using COUNTIF and SUMIF.
1.  Work through the Titanic example in small groups. You can walk through the
    example step-by-step as in the textbook, or make this more interactive:
    1.  Introduce the Titanic dataset, and overall question of whether some
        groups had a higher survival rate than others.
    1.  How would you calculate the overall survival rate of all passengers?
    1.  What is the survival rate for just men? Just women? Just children?
    1.  What is the survival rate for each passenger class?
1.  If they worked in groups, each group likely used a different process for
    calculating survival rate. Have each group describe their process, then
    discuss as a class what they prefer (consider ease / readability /
    flexibility). If no group used the process in the textbook, also demo that
    to the class.

<span style="text-decoration:underline;">Homework</span>

1.  Finish all textbook questions from this section.
1.  Finish reading:
    [this article](https://longreads.com/2019/06/21/yentl-syndrome-a-deadly-data-bias-against-women/)
    on the dangers of data bias in medicine. Submit a half-page reflection on
    the article before the start of the next class.
1.  Read the Module A Project description. Brainstorm 2-3 potential research
    questions.

#### Datasets

*   [Painters](#city-climate-and-college-datasets)
*   **Titanic**
    *   Description: Information on all people aboard the
        [HMS Titanic](http://www.encyclopedia-titanica.org). This dataset is
        very widely used in data science courses.
    *   Source:
        [Data And Story Library (DASL)](https://dasl.datadescription.com/datafile/titanic/)
    *   Number of rows: 2,208
    *   Columns (those used in this module are bolded):
        *   Name: text
        *   **Survived**: text, “Alive” or “Dead”
        *   Boarded: text, port where passenger boarded the ship
        *   **Class**: text, “1”, “2”, “3”, or “Crew” (where 1 is the highest
            class)
        *   **MWC**: text, “Man”, “Woman”, or “Child”
        *   Age: number
        *   Adut_or_Chld: text, “Adult” or “Child”
        *   Sex: text, “Male” or “Female”
        *   Paid: number, price of ticket (empty if Crew)
        *   Ticket_No: text (empty if Crew)
        *   Boat_or_Body: text, lifeboat used if Alive, empty if Dead, [number]
            if Dead but body recovered
        *   Job: text, empty if unknown
        *   Class_Dept: text, detailed description of passenger or crew class
        *   Class_Full: text, single character symbol for Class_Dept

### 5.1 Module A Project

#### Learning Objectives

*   Students will iteratively develop research questions and a corresponding
    survey. (S)
*   Students will deploy surveys to collect their own data. (S)
*   Students will critique and refine their research and survey questions for
    clarity, potential bias and the survey’s ability to answer the research
    question. (S, E)
*   Students will have knowledge of additional methods to reduce bias and
    protect participant privacy around sensitive topics, and employ those
    methods if and when appropriate. (E)
*   Students will compare descriptive values for quantitative and categorical
    variables across subsetted groups and use these differences to identify
    relationships between variables. (DT, M)
*   Students will choose the most appropriate chart for their data type and
    research question. (V)
*   Students will identify what information about data sources, collection and
    methods are necessary to report and integrate these into narratives. (S)
*   Students will construct and present narratives using their visualizations to
    address research questions. (S, V)

#### Hook

Expected time: 20 minutes

*   **[ETHICS]** Discuss the assigned article on the dangers of data bias in
    medicine. We recommend a think-pair-share based on these questions (and any
    others from you):
    *   What surprised you about this article?
    *   What passages or sections stood out to you?
    *   Did this change how you think about data science? How?
    *   How can we notice and reduce this kind of bias?

#### Activities

<span style="text-decoration:underline;">Project (Own Survey)</span>

Expected time: 60 minutes

1.  Connect to the hook: Now, they will get experience collecting, analyzing,
    and presenting a dataset of their own.
1.  Introduce the project, making sure students are clear on all requirements
    and the final deliverables.
1.  Have students form groups of 3-4 and start work!
    1.  [Here](https://github.com/google/applied-machine-learning-intensive/blob/master/acs/ac1/doc/course-guide.md#team-formation-and_dynamics)
        is a guide to project team formation and facilitation. Students should
        come to class with a few research question ideas in mind, so they can
        form groups based on similar ideas.

<span style="text-decoration:underline;">Homework</span>

1.  Finish the project. Let students know they’ll have the first half of the
    next class for any last-minute touches, but the last half will be for
    project presentations so they should get as much done then as possible.
    1.  At minimum before next class: Finalize their research question and
        survey questions. Deploy the survey and collect all responses. Begin
        cleaning and analyzing the data.

#### Datasets

*   Students presumably will not be publishing results from this project. But
    since students are conducting a research survey of people, there may be IRB
    considerations depending on your university guidelines.

### 5.2 Module A Project

#### Learning Objectives

*   Students will iteratively develop research questions and a corresponding
    survey. (S)
*   Students will deploy surveys to collect their own data. (S)
*   Students will critique and refine their research and survey questions for
    clarity, potential bias and the survey’s ability to answer the research
    question. (S, E)
*   Students will have knowledge of additional methods to reduce bias and
    protect participant privacy around sensitive topics, and employ those
    methods if and when appropriate. (E)
*   Students will compare descriptive values for quantitative and categorical
    variables across subsetted groups and use these differences to identify
    relationships between variables. (DT, M)
*   Students will choose the most appropriate chart for their data type and
    research question. (V)
*   Students will identify what information about data sources, collection and
    methods are necessary to report and integrate these into narratives. (S)
*   Students will construct and present narratives using their visualizations to
    address research questions. (S, V)

#### Hook

N/A

#### Activities

<span style="text-decoration:underline;">Finish Projects</span>

Expected time: 50 minutes

1.  Finish all data analysis, visualizations, and the slide deck. Submit all
    deliverables at the end of this work time.
1.  If you want, have them complete a group work self assessment and group
    assessment.

<span style="text-decoration:underline;">Present Projects</span>

Expected time: 20 minutes

1.  Have each group present their slides, with some short Q&A.

<span style="text-decoration:underline;">Homework</span>

1.  Read: textbook Module B introduction, “Importing and Exporting Data”
    section, and “Scatter Plots and Correlation” up to “Correlation”.
1.  Scan through slides on how
    [the news often confuses correlation and causation](http://www.rebeccabarter.com/cv/talks/Cal_Day_Presentation.pdf).
    These are slides without speaker notes, so some points might be confusing --
    you’ll discuss in class.

#### Datasets

*   Students presumably will not be publishing results from this project. But
    since students are conducting a research survey of people, there may be IRB
    considerations depending on your university guidelines.

## Module B

### 1.1 Scatter Plots and Correlation

#### Learning Objectives

*   Students will differentiate between correlation and causation, and describe
    associations between variables appropriately. (M, E)
*   Students will use sheets to construct histograms, bar charts, scatterplots,
    regression lines and variants. (V)
*   Students will use scatter plots and other visualizations to identify
    associations or causal relationships in bivariate data. (V)
*   Students will critique visualizations and related reports (articles, news
    stories and student projects) for completeness, clarity, bias and narrative.
    (S, V)

#### Hook

Expected time: 5-10 minutes

*   **[DEMO]** First show the bar chart for average January temperatures from
    the textbook. Use this to predict the weather of several cities not in the
    dataset, given their latitudes.
    *   Discuss: how could you get better predictions?
*   **[DEMO]** Now show the scatterplot from the next section and make new
    predictions -- which were more accurate?

#### Activities

<span style="text-decoration:underline;">Scatter Plots</span>

Expected time: 15 minutes

*   Review scatterplots reading. The three main sections covered were what a
    scatterplot is, how to create one in Sheets, and how to describe one.
*   Go over exercises from reading - especially good to go over matching scatter
    plots to their stories and description.

<span style="text-decoration:underline;">Correlation</span>

Expected time: 30 minutes

*   **[DEMO]** Define correlation coefficient and coefficient of determination.
    Show the figure of scatterplots vs. correlation coefficients.
*   **[HYP]** Have students pair up and play through
    http://guessthecorrelation.com/ for ~5 minutes.
    *   Discuss: How did they do? What did they notice?
*   Introduce the college scorecard dataset. Have students work in small groups
    on the “Correlation and College Data” example:
    *   **[DEMO]** using the CORREL function between completion rate and another
        variable.
    *   Students should calculate correlation between completion rate and all
        other variables. For the variable with strongest correlation, create a
        scatter plot between that variable and completion rate.
        *   Discuss: Did every group end up with the same variable / scatter
            plot?
    *   If you have time, work through the follow-up textbook questions in
        groups.

<span style="text-decoration:underline;">Correlation vs. Causation</span>

Expected time: 25 minutes

*   **[ETHICS]** Discuss: what conclusions can you draw from this scatterplot?
    Does a higher SAT score mean a student is more likely to graduate within 6
    years?
*   Discuss lurking variables and two questions from “Correlation vs. Causation”
    section.
*   In small groups, review slides from prework and examples of
    [spurious correlations](https://www.tylervigen.com/spurious-correlations).
    *   Discuss: what are other examples of correlation being confused with
        causation you’ve seen? How might you find lurking variables?

<span style="text-decoration:underline;">Homework</span>

1.  Finish reading and questions from “Scatter Plots and Correlation” section
1.  Read: textbook “Regression and Line of Best Fit” section up to “Outliers”

#### Datasets {#city-climate-and-college-datasets}

*   **City Climate**
    *   Description: Temperature and latitude, longitude data for various US
        cities.
    *   Source:
        [Data And Story Library (DASL)](https://dasl.datadescription.com/datafile/city-climate/?_sf_s=latitude&_sfm_cases=4+59943)
    *   Number of rows: 60
    *   Columns (those used in this module are bolded):
        *   **city**: text, formatted [city name], [state code]. Some entries
            have multiple city names or multiple state codes if they’re
            geographically close.
        *   **lat**: number, latitude
        *   long: number, longitude
        *   **JanTF**: number, average January temperature (degrees Fahrenheit)
        *   **JulyTF**: number, average July temperature (degrees Fahrenheit)
        *   RelHum: number, relative humidity (percentage)
        *   Rain: number, average annual precipitation (inches)
*   **College Scorecard Data**
    *   Description: Data collected by the DoE to compare the cost and value of
        US colleges. The full dataset contains data from 1996-2017 for all
        undergraduate degree-granting institutions of higher education. We have
        pre-processed a smaller sample of schools and statistics to work with,
        with school names removed.
    *   Source:
        [U.S. Department of Education](https://collegescorecard.ed.gov/data/)
    *   Number of rows: 1170
    *   Columns:
        *   STABBR: text, state where the school is located.
        *   TYPE: text, type of institution: public, private nonprofit, or
            private for-profit.
        *   SAT Verbal Median: number, median SAT scores for reading.
        *   SAT Math Median: number, median SAT scores for math.
        *   SAT Average: number, median overall SAT scores.
        *   Average Net Tuition Price: number, mean of the amount paid by
            students after applying scholarships and other forms of financial
            aid.
        *   **Percentage of Students Receiving Pell Grant**: number, percentage
            of enrolled students receiving Pell grants.
        *   **Percentage of Students Receiving Federal Loan**: number,
            percentage of enrolled students receiving federal loans.
        *   Median Earnings for Employed Students after 10 Years: number,
            considered 10 years after first enrolling.
        *   Median Debt of Graduates: number.
        *   Completion Rate (Full-time, First-time, within 6 years): number,
            percentage of full-time, first-time students who graduate within 6
            years.
    *   Note that the two **bolded** columns are meant to be percentages, but
        are currently expressed as decimals (e.g. 0.762 instead of 76.2%). This
        is an opportunity for students to practice data cleaning.

### 1.2 Regression and Predictions

#### Learning Objectives

*   Students will find regression equations in sheets, and use them to make
    predictions. (M)
*   Students will identify extrapolation in predictions made from regression
    equations, and explain why these predictions are unreliable. (M, E)
*   Students will use sheets to construct histograms, bar charts, scatterplots,
    regression lines and variants. (V)
*   Students will use scatter plots and other visualizations to identify
    associations or causal relationships in bivariate data. (V)

#### Hook

Expected time: 5-10 minutes

*   **[HYP]** Give half the class a scatter plot with regression line, and half
    the same with the equation. Ask them to make predictions based on input
    values. Compare results and predict which is more accurate.
    *   You can use the scatter plot on average SAT score vs. completion rate
        from last class.

#### Activities

<span style="text-decoration:underline;">Line of Best Fit</span>

Expected time: 40 minutes

*   See if there are questions from the reading (introduction to line of best
    fit and interpreting slope) or previous day.
*   **[DEMO]** Add a line of best fit in sheets, then add or remove points to
    predict and see how line is impacted (look at how slope and how y intercept
    changes). You can continue using the college data, maybe choosing 2
    different variables with some correlation. You could also play with adding
    outliers to start to introduce that section.

<span style="text-decoration:underline;">Practice Analyzing Data</span>

Expected time: 30 minutes

*   From the college data, use percentage of students receiving federal loans as
    the explanatory variable and completion rate as the explained variable. In
    small groups, have students:
    *   Find the correlation coefficient
    *   Make a scatter plot
    *   Find the equation of the line of best fit. Interpret the slope of this
        regression line.
    *   Use regression line to predict completion rate for a school where 60% of
        students receive federal loans.
        *   Compare this to an extrapolation prediction for a school where 10%
            or 100% of students receive federal loans. Which is going to be more
            reliable?
*   Discuss: how accurate were these predictions versus using average SAT score
    as the explanatory variable? Why?

<span style="text-decoration:underline;">Homework</span>

1.  Finish reading and questions from “Regression and Line of Best Fit” section.

#### Datasets

*   [College Scorecard Data](#city-climate-and-college-datasets)

### 2.1 Regression Best Practices

#### Learning Objectives

*   Students will identify extrapolation in predictions made from regression
    equations, and explain why these predictions are unreliable. (M, E)
*   Students will find regression equations in sheets, and use them to make
    predictions. (M)
*   Students will critique visualizations and related reports (articles, news
    stories and student projects) for completeness, clarity, bias and narrative.
    (S, V)

#### Hook

Expected time: 10-20 minutes

*   **[HYP]** Start with 2-3 data points from the weather dataset. Show one
    scatterplot with a straight line fit and one scatterplot with a polynomial
    fit. Have students place bets on the temperature of a city not included in
    the plot and the plot they used to predict. Compare which plot led to more
    accurate predictions, then add the city to the plots, update the trendlines,
    and get predictions on a new city.
    *   As you add more data, students should begin to see that the linear model
        generalizes better than the overfit one.

#### Activities

<span style="text-decoration:underline;">Extrapolation</span>

Expected time: 20 minutes

*   This
    [height versus age spreadsheet](https://docs.google.com/spreadsheets/d/e/2PACX-1vQknS-NHdPiFY0ivCGYiH_2bpi4E-nhl1WJaSC9mZd3OnqzMe2hYFtkGk7YZT7AID6olNR1RgE1WtoD/pubhtml)
    has ages and heights for children between the ages of 4 and 16. Have
    students find a regression line and use it to predict the heights for:
    *   someone 10 years old
    *   someone 30 years old
    *   someone 70 years old
        *   **[HYP]** Think-pair-share on what went wrong? How should we make
            more accurate predictions in this case?

<span style="text-decoration:underline;">Outliers</span>

Expected time: 20 minutes

*   Return to
    [height versus age](https://docs.google.com/spreadsheets/d/e/2PACX-1vQknS-NHdPiFY0ivCGYiH_2bpi4E-nhl1WJaSC9mZd3OnqzMe2hYFtkGk7YZT7AID6olNR1RgE1WtoD/pubhtml)
    data set. Yao Ming was 7’6” at 16.
    *   **[HYP]** TPS: If you add Yao Ming’s height to the data set, predict how
        this will impact the regression line.
    *   Add the new point and look at the impact of the outlier.
    *   **[ETHICS]** TPS: how should you handle outliers like this? Why are
        outliers a potential ethical concern?

<span style="text-decoration:underline;">Homework</span>

#### Datasets

*   [City Climate](#city-climate-and-college-datasets)
*   [Height and Age](https://docs.google.com/spreadsheets/d/e/2PACX-1vQknS-NHdPiFY0ivCGYiH_2bpi4E-nhl1WJaSC9mZd3OnqzMe2hYFtkGk7YZT7AID6olNR1RgE1WtoD/pubhtml)

### 2.2 Filtering

#### Learning Objectives

*   Students will use filtering, grouping and pivot tables to compare variables
    across groups and identify relationships between variables. (DT)
*   Students will compare descriptive values for quantitative and categorical
    variables across subsetted groups and use these differences to identify
    relationships between variables. (M)

#### Hook

Expected time: 20 minutes

*   Puzzle - where you expect a positive relationship between x and y but you
    aren’t seeing it. How do you hunt it down? Split students into small groups
    to investigate how each of the following examples could be possible.
    *   [Median wage growth up 1% overall, but down for each educational subset](https://blog.revolutionanalytics.com/2013/07/a-great-example-of-simpsons-paradox.html).
    *   [Gerald Ford lowered taxes for every income group, he also raised taxes
        on a nation-wide level from 1974 to
        1978.](https://towardsdatascience.com/simpsons-paradox-how-to-prove-two-opposite-arguments-using-one-dataset-1c9c917f5ff9)
    *   [UC Berkeley gender bias in admissions?](https://en.wikipedia.org/wiki/Simpson%27s_paradox)

#### Activities

<span style="text-decoration:underline;">Advanced Filtering</span>

Expected time: 40 minutes

*   **[DEMO]** Dig into personal trainer example from textbook (or an example
    from the hook) and use filtering to show simpson’s paradox.
    *   **[ETHICS]** Discuss: What would your conclusion be without filtering?
        With filtering? What is the responsibility in terms of reporting?
*   Return to college data: use filtering to determine if there are differences
    between private for profit, private nonprofit and public schools in terms of
    median debt? Completion rate?

<span style="text-decoration:underline;">Homework</span>

1.  Read: textbook “Filtering” section.
1.  Read: textbook “Pivot Tables” up to first Example.

#### Datasets

*   [Personal trainer data (generated)](https://docs.google.com/spreadsheets/d/e/2PACX-1vTICYg8KhO5eAv-Vr7xCO59FATyj_wDTzhBRnxzuP2sNofbACzHk1HCn3344yk3DUlA6s-lFzdEDpId/pubhtml)
*   [College Scorecard Data](#city-climate-and-college-datasets)

### 3.1 Pivot Tables

#### Learning Objectives

*   Students will use filtering, grouping and pivot tables to compare variables
    across groups and identify relationships between variables. (DT)
*   Students will compare descriptive values for quantitative and categorical
    variables across subsetted groups and use these differences to identify
    relationships between variables. (M)

#### Hook

Expected time: 10 minutes

*   **[DEMO]** Recreate the table summarizing
    [work assignments](https://docs.google.com/spreadsheets/d/e/2PACX-1vT1vnHCFc_3E-W4DiZ0hrDzlsP-Nh8vfD82fGMf7QT_YOJbdiKso31kLhxcSmlzEo0sLtLnksK6lDcj/pubhtml)
    from the last section made using SUMIF with
    [pivot tables in 30 seconds](https://docs.google.com/spreadsheets/d/e/2PACX-1vT1vnHCFc_3E-W4DiZ0hrDzlsP-Nh8vfD82fGMf7QT_YOJbdiKso31kLhxcSmlzEo0sLtLnksK6lDcj/pubhtml).
    Then repeat, taking time to explain row, column, value and filter options.

#### Activities

<span style="text-decoration:underline;">Introduction to Pivot Tables</span>

Expected time: 25 minutes

*   **[DEMO]** Livecode fairness question from work assignment data set using
    pivot table.

<span style="text-decoration:underline;">NCHS example</span>

Expected time: 45 minutes

*   Introduce NCHS data
    *   TPS: What questions naturally arise from this data?
        *   Save these. Answering them could be used as livecode examples in
            later classes.
    *   TPS: What are some issues you might predict with using this data?
    *   **[HYP]** What do you think is the most common cause of death in the US
        overall?
        *   This will be answered in the following demo, so students can check
            their predictions.
*   **[DEMO]** Code along: construct first pivot table from text.
    *   Discuss: what questions do you want to investigate next?
    *   Students either do independent investigations or follow along with text.

<span style="text-decoration:underline;">Homework</span>

1.  Read Example: National Center for Health Statistics

#### Datasets

*   [Work Assignments](https://docs.google.com/spreadsheets/d/e/2PACX-1vT1vnHCFc_3E-W4DiZ0hrDzlsP-Nh8vfD82fGMf7QT_YOJbdiKso31kLhxcSmlzEo0sLtLnksK6lDcj/pubhtml)
    (generated)
*   [NCHS data](https://docs.google.com/spreadsheets/d/e/2PACX-1vQKQmUx85LK0ksxP70dgJ0TMaAmHMZY0BGf45j8NPAwj6za-wTprUy0eq9XtPXKQDVQU5EeC5wh5Mof/pubhtml)
    *   Description:
    *   Source:
    *   Number of rows:
    *   Columns:

### 3.2 Pivot Tables

#### Learning Objectives

1.  Students will use filtering, grouping and pivot tables to compare variables
    across groups and identify relationships between variables. (DT)
1.  Students will compare descriptive values for quantitative and categorical
    variables across subsetted groups and use these differences to identify
    relationships between variables. (M)
1.  Students will explain why making data visualizations accessible is
    important, and will refine their graphs with
    [accessibility best practices in mind](http://www.storytellingwithdata.com/blog/2018/6/26/accessible-data-viz-is-better-data-viz).
    (V)

#### Hook

Expected time: 10 minutes

*   **[DEMO]** Construct a pivot table for state specific data about the causes
    of death. Compare to overall US rates and have students TPS about the
    reasons for the differences.

#### Activities

<span style="text-decoration:underline;">NCHS example continued</span>

Expected time: 40 minutes

*   Create a pivot table showing cause of death by year and construct line graph
    from table.
*   **[ETHICS]** Discussion - Readability of graph showing cause of death over
    time.
    *   What are the issues trying to read this graph? What would you change?
*   Discussion - What are some possible reasons why the death rate varies by
    state?
    *   Discussion - how could we confirm the influence of those factors? (Use
        discussion to motivate joining data in the next section.)

<span style="text-decoration:underline;">Homework</span>

1.  Read Grocery List Example

#### Datasets

*   [NCHS data](https://docs.google.com/spreadsheets/d/e/2PACX-1vQKQmUx85LK0ksxP70dgJ0TMaAmHMZY0BGf45j8NPAwj6za-wTprUy0eq9XtPXKQDVQU5EeC5wh5Mof/pubhtml)

### 4.1 Joining Data

#### Learning Objectives

1.  Students will use filtering, grouping and pivot tables to compare variables
    across groups and identify relationships between variables. (DT)

#### Hook

Expected time: 10-15 minutes

*   Discuss: In the reading, you learned about the VLOOKUP method. What are the
    benefits of using that method compared to copying the data you need by hand?
    What is the cost?
*   Return to question from end of previous class: explain the influence of
    factors on death rate by bringing in data about state population or median
    age.

#### Activities

<span style="text-decoration:underline;">Joining practice</span>

Expected time: 40 minutes

*   **[DEMO]** Code along - Death **_Rate_** by State by joining with state
    population
*   Cause of Death over Time
    *   **[HYP]** Discussion - what are some reasons why Alzheimer’s related
        death rates have increased over time? After discussion, students google
        investigate answers and report back to the group.

<span style="text-decoration:underline;">Homework</span>

1.  Review module B project description and rubric.
1.  Research and select possible datasets for Module B project.

#### Datasets

*   [NCHS data](https://docs.google.com/spreadsheets/d/e/2PACX-1vQKQmUx85LK0ksxP70dgJ0TMaAmHMZY0BGf45j8NPAwj6za-wTprUy0eq9XtPXKQDVQU5EeC5wh5Mof/pubhtml)
*   [State Population](https://docs.google.com/spreadsheets/d/e/2PACX-1vT4uCIwhPdW23iGY4b54YY8m8dew69PYqCa7x1fwVD702AlQb8ONHdd2I3kynGn4yG31HkCi_z5S7hg/pubhtml)
    *   Description:
    *   Source:
    *   Number of rows:
    *   Columns:
*   [Median age by State](https://drive.google.com/open?id=1Y9FeVkVNFwJrei0ndzhlN2AcF-ELMNxCy5ynqPUHGhA)
    *   Description:
    *   Source:
    *   Number of rows:
    *   Columns:

### 4.2 Overflow

#### Activities

Extra day alloted for catch up or other topics at instructor's discretion.

Form project teams for module B project.

Activity and Topic Ideas:

*   Review importing and exporting data
*   Need to fill in other extension ideas

<span style="text-decoration:underline;">Homework</span>

1.  Bring in data set and research questions for module B project.

### 5.1 Cleaning for Project Prep

#### Learning Objectives

#### Hook

*   Project prep

#### Activities

<span style="text-decoration:underline;">Homework</span>

1.  Continue to work on module B project.

#### Datasets

*   N/A

### 5.2 Module B Project

#### Learning Objectives

*   Students will identify potential sources of bias in research and survey
    questions, including response bias, confirmation bias, survivor bias,
    anchoring bias, selection bias, reporting bias and others. (E)
*   Students will critique and refine the appropriateness of survey and research
    questions. (E)
*   Students will differentiate between correlation and causation, and describe
    associations between variables appropriately. (B, E)
*   Students will find available data sets and identify how, when and why the
    data was collected. (A,B)
*   Students will assess if available data sets are appropriate, in terms of
    license, source, bias and relevance to the research question. (A,B)
*   Students will work with faculty in their major or in other classes to
    identify data sets of academic or personal interest. (B)
*   Students will use filtering, grouping and pivot tables to compare variables
    across groups and identify relationships between variables. (A, B)
*   Students will choose the most appropriate chart for their data type and
    research question. (A,B)
*   Students will use sheets to construct histograms, bar charts, scatterplots,
    regression lines and variants. (A,B)
*   Students will explain why making data visualizations accessible is
    important, and will refine their graphs with
    [accessibility best practices in mind](http://www.storytellingwithdata.com/blog/2018/6/26/accessible-data-viz-is-better-data-viz).
    (A,B)
*   Students will compare descriptive values for quantitative and categorical
    variables across subsetted groups and use these differences to identify
    relationships between variables. (A,B)
*   Students will use scatter plots and other visualizations to identify
    associations or causal relationships in bivariate data. (A,B)
*   Students will find regression equations in sheets, and use them to make
    predictions. (B)
*   Students will identify what information about data sources, collection and
    methods are necessary to report and will integrate these into narratives.
    (A,B)
*   Students will construct and present narratives using their visualizations to
    address research questions. (A,B)

#### Activities

<span style="text-decoration:underline;">Present Projects</span>

Expected time: 60 minutes

1.  Have each group present their project, with some short Q&A.

<span style="text-decoration:underline;">Homework</span>

1.  Read: Something from module C? Fill in as module C instructor guide is
    developed.

#### Datasets

*   N/A
