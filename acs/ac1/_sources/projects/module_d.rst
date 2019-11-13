.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


Module D
========

Project Description
-------------------

In this project, you will complete a statistical analysis of a dataset using
Pandas, then summarize your findings and charts in a notebook.

**Your final submission will be an iPython notebook. Do not hide any code in the
notebook, and do not do any analysis outside this submitted notebook. You may
use any Python functionality, even if it was not covered during class. If you
found a piece of code online, make sure to reference where you found it.**

Here are the steps you’ll need to complete.  **Under each step are sub-bullets
detailing questions you need to answer in your report.**

1.  Form a group of no more than 4 people.

    -   You may want to form a group with people who are in a similar major or
        have similar interests as this may make dataset selection easier.

2.  Choose one of the provided datasets. If you feel strongly about using
    another dataset that is not included in the list, please make sure to have
    it approved by the instructor before proceeding.

    -   What made you choose this dataset?
    -   What aspects of this dataset did you expect to find challenging?

3.  **Using pandas**, import the data into python.

    -   What hurdles did you encounter?

4.  **Clean the data** and account for any incorrect / missing data as you see
    fit.

    -   How did you clean the data? What steps were taken? Be sure to reference
        data types in your discussion.
    -   Are there any ethical issues with the way you cleaned the data? What are
        they?
    -   Did you make any trade-offs as you were cleaning? What and why?

5.  **Using pandas**, join the multiple data frames across a common column.

    -   What did you choose as the joining key? Why?
    -   Did you encounter any issues?

6.  **Calculate summary statistics** for the quantitative variables.

    -   What are the count, mean, median, variance, standard deviation?
    -   Are there other statistics that are useful here?

7.  **Use pandas filters** to choose subsets of the data that you find
    interesting. Find summary statistics for the numeric variables, within those
    subsets of the data.

    -   Explain why you chose this set of groups.
    -   Within subsets of interest, what are the count, mean, median, variance,
        standard deviation?
    -   Is the sample size enough within each group? What does this imply for
        reliability of summary statistics, and for privacy considerations?

8.  **Use pandas sorting** to find the top *n* and bottom categories of
    interest.

    -   What quantitative metric did you sort by?
    -   How did you choose an appropriate value of *n*?

9.  **Use pandas pivot tables** to summarize and present your data and its
    summary statistics.

10. **Use altair** to visualize the pivot tables from (8), to present what you
    consider to be the most interesting findings in this dataset.

    -   How did you choose which findings were interesting?

11. **Use altair** to graph any other findings from your dataset. Be sure to
    include **at least one bar chart and at least one scatter plot**.

12. Submit your notebook by **[Due Date]**.

13. **Optional (faculty can decide whether to include or not)**: After
    completing and submitting your project, complete the group work self
    assessment and group assessment.


Grading Rubric
--------------

.. list-table::
   :widths: 20 20 20 20 20
   :header-rows: 1
   :stub-columns: 1
   :align: left

   * -
     - **Excellent**
     - **Developing**
     - **Beginning**
     - **NA / Not Present**

   * - **Dataset (2)**
     - Report includes a rationale for why the dataset was chosen. If students
       selected a different dataset, the dataset must have been approved by the
       instructor.
     - The report includes a rationale for why the dataset was chosen, but it is
       not clear or is not sufficiently relevant.
     -
     - The dataset was not approved by the instructor, or the report does not
       include a rationale for why the dataset was chosen.

   * - **Data Importing and Cleaning (8)**
     - Data is successfully imported into the notebook. All missing/unclean data
       is found and accounted for in a way that makes sense. The report
       references data types, any ethical tradeoffs, and outlines what steps
       were taken and why.
     - Data is successfully imported into the notebook. Some crucial steps to
       clean the data are not taken. Steps outlined to clean the data are
       ambiguous.
     - There is an attempt at data cleaning, but it does not get far. Large
       chunks of missing/unclean data are untreated. Key steps of cleaning
       process were not reported.
     - The data was not imported successfully into the notebook.

   * - **Joining (8)**
     - An appropriate join key was chosen. pd.join or pd.merge was used
       successfully to create a joined table.
     - An appropriate join key was used.
     - There was an attempt at joining, but the wrong formula was used or the
       wrong key was used.
     - There was no attempt at using pd.join or pd.merge.

   * - **Population Summary Statistics (6)**
     - The summary statistics are accurately calculated and reported.
     - Almost all of the important summary statistics are correctly calculated.
     - There is an attempt at calculating summary statistics, but they are
       incorrect.
     - There is no attempt at calculating the population summary statistics.

   * - **Grouped Summary Statistics (8)**
     - df.pivot was used to calculate relevant summary statistics per group. The
       pivot table is presented in the report in a clean way.
     - There is a working attempt at a pivot table, but not all numbers are
       accurate. There is some mention on sample size within groups.
     - There is an attempt at a pivot table, but it uses the wrong dimensions
       and measures. The grouped summary statistics are incorrect or
       non-existent.
     - There is no attempt at using df.pivot.

   * - **Plotting Pivot Table (6)**
     - The grouped summary statistics from pivot tables are plotted using
       altair. An appropriate type of graph is chosen.
     - There is an attempt at plotting the pivot table, but there are minor
       inconsistencies, errors, or misunderstandings.
     - There is an attempt at plotting the pivot table, but the chart type is
       inappropriate or the numbers are incorrect.
     - There is no attempt at plotting the grouped summary statistics.

   * - **Using Altair (8)**
     - At least two extra charts are plotted using altair. There is some
       description of why these charts are chosen, and what the results are.
     - At least two extra charts are plotted using altair. The charts are either
       not particularly interesting or inconsistent with the report. There is
       some description of why these charts are chosen, and what the results
       are.
     - There is an attempt at plotting extra information from the dataset. There
       is either less than two datasets, or the chosen datasets are
       inappropriate. There is insufficient description as to why these charts
       were chosen.
     - There is no attempt at plotting using altair.

   * - **Readability (4)**
     - The notebook is structured well. There are descriptions where necessary.
       There are very few spelling/grammar errors.
     - The notebook is structured fairly well, but there a few inconsistencies
       or errors.
     - The notebook lacks structure, and is hard to follow. There are several
       spelling/grammar errors.
     - There is no notebook.

   * - **Total (50)**
     -
     -
     -
     -