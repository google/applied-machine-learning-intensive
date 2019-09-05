Module B
========

Project Description
-------------------

In this project, you will:

-   Choose one of the provided datasets
-   Conduct a statistical analysis
-   Write a report summarizing your findings

Here are the steps you’ll need to complete. **Under each step are sub-bullets
detailing questions you need to answer in your report.**

1.  Form a group of no more than 4 people. (You may want to form a group with
    people who are in a similar major or have similar interests as this may make
    dataset selection easier).
2.  Choose one of the provided datasets. If you feel strongly about another
    dataset that is not included in the list, please make sure to have it
    approved by the instructor before proceeding.

    -   What made you choose this dataset?
    -   What aspects of this dataset did you expect to find challenging?

3.  Clean the data and account for the incorrect / missing data as you see fit.

    -   How did you clean the data? What steps were taken? Be sure to reference
        data types in your discussion.
    -   Are there any ethical issues with the way you cleaned the data? What are
        they?
    -   Did you make any trade-offs as you were cleaning? What and why?

4.  Join the multiple sheets across a common column. You will need to join
    datasets using vlookup.

    -   What did you choose as the joining key? Why?

5.  Using the joined dataset, find summary statistics for the population.

    -   For all of the numeric variables, what are the population-wide mean,
        median, variance, standard deviation?

6.  Choose subsets of the data that you find interesting. Find summary
    statistics for the numeric variables, within those subsets of the data.

    -   Explain why you chose this set of groups.
    -   Within subsets of interest, what are the count, mean, median, variance,
        standard deviation?
    -   Is the sample size enough within each group? What does this imply for
        reliability of summary statistics, and for privacy considerations?

7.  Present the grouped summary statistics in the report.

    -   Include both a pivot table and a visualization that compares summary
        statistics across groups.
    -   What comparisons are particularly interesting? Why?

8.  Determine two quantitative variables that have either a strong or an
    interesting relationship.

    -   How did you determine that this relationship was particularly
        interesting?
    -   Identify any potential lurking variables. How did you find them?

9.  Fit a regression on the data.

    -   What is the equation for the line of best fit?
    -   Does the line of best fit fit the data well? If not, why not?
    -   If you are getting surprising results, what is surprising and why?

10. Interpret the coefficients of the linear model, in the context of the chosen
    variables.

    -   What does this imply for the variable being predicted? Be sure to
        include references to “correlation” and “causation” effects.

11. Choose some data points to predict using your regression.

    -   For which data points is it appropriate to use this regression model?
        Why?
    -   In a short paragraph, report your predictions in the context of the
        problem.

        1.  Good example: We predict that someone with a shoe size of 6.5 will
            be 5’4”.
        2.  Inadequate example: Only reporting the point (6.5, 64”).

    -   Is the prediction logical? Why or why not?

12. Include a conclusion summarizing your findings.

13. Submit your report **and your sheets** reflecting your analysis by **[Due
    Date]**.

14. **Optional** (faculty can decide whether to include or not): After
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
     -
     - Report does not include a rationale for why the dataset was chosen.
     - The dataset was not approved by the instructor.


   * - **Data Cleaning (8)**
     - All missing/unclean data is found and accounted for in a way that makes
       sense. The report references data types, any ethical tradeoffs, and
       outlines what steps were taken and why.
     - Some crucial steps are not taken. Steps outlined to clean the data are
       ambiguous.
     - There is an attempt at data cleaning, but it does not get far. Large
       chunks of missing/unclean data are untreated. Key steps of cleaning
       process were not reported.
     - Report does not include any reference to data cleaning (independently of
       whether data cleaning was done).


   * - **Joining (4)**
     - An appropriate join key was chosen. VLOOKUP was used successfully to
       create a joined table.
     -
     - There was an attempt at joining, but the wrong formula was used or the
       wrong key was used.
     - There was no attempt at using VLOOKUP.


   * - **Population Summary Statistics (6)**
     - The summary statistics are accurately calculated and reported. There is
       some comment on what these values mean for the distribution.
     - Almost all of the important summary statistics are correctly calculated
       and reported.
     - There is an attempt at calculating summary statistics, but they are
       incorrect or not referenced in the report.
     - There is no attempt at calculating the population summary statistics.


   * - **Grouped Summary Statistics (8)**
     - A pivot table was used to calculate relevant summary statistics per
       group. The pivot table is presented in the report in a clean way.
       There is some other visualization showing some important summary
       statistics. There is some mention of sample size within groups, as well
       as why the specific grouping was chosen.
     - There is a working attempt at a pivot table, and it is presented in the
       report. Not all numbers are accurate, and there is no extra
       visualization. There is some mention on sample size within groups.
     - There is an attempt at a pivot table, but it uses the wrong dimensions
       and measures. The grouped summary statistics are incorrect or
       non-existent.
     - There is no attempt at a pivot table.


   * - **Regression (8)**
     - Report includes both the scatter plot and the line-of-best-fit equation,
       and these values are (close to) correct. The report includes a discussion
       of  why the particular variables were chosen, the meaning of the
       coefficients, and correlation versus causation. There is some mention of
       whether regression is appropriate for the sample size.
     - The line of best fit is not completely correct The scatter plot is
       missing from or wrongly formatted in the report The discussion on
       variable selection, coefficient interpretation, and correlation vs.
       causation is not sufficiently detailed or accurate.
     - There is some attempt at a line of best fit, but the values are
       completely wrong. The scatter plot or the equation are not included.
       There is no proper discussion on variable selection, coefficient
       interpretation, or correlation vs causation.
     - There is no attempt at fitting a regression.


   * - **Prediction (6)**
     - The equation of the line of best fit is used to predict these values. The
       report correctly identifies and explains which points are suitable for
       prediction. The ethics of prediction are mentioned, and the report includes
       the pros and cons of using a linear regression to predict.
     - Values are chosen for prediction that are largely appropriate. The report
       struggles with why some points are not suitable for prediction.  There is
       some mention of the ethics of using prediction from a linear model.
     - There is an unsuccessful attempt at prediction. There is little or no
       mention of suitability of prediction of certain points, or the chosen
       points are not usable with this model.
     - There is no attempt at prediction using the line of best fit.


   * - **Conclusion (4)**
     - The report contains a conclusion section summarizing key findings from
       other rubric areas. It is concise and complete.
     -
     - The report contains a conclusion section, but it is incomplete or doesn’t
       accurately reflect previous findings.
     - The report does not contain a conclusion section.


   * - **Readability (4)**
     - The report is structured by section, with appropriate headings. The
       report has very few spelling/grammar errors.
     -
     - The report’s structure lacks clarity or is otherwise difficult to read.
       The report has several spelling/ grammar errors.
     - There is no report.


   * - **Total (50)**
     -
     -
     -
     -
