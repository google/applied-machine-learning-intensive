Module C
========

Project Description
-------------------

In this project, you will:

-   Manipulate data from a SQL database
-   Visualize attributes of the dataset in sheets
-   Run a linear regression on variables in the dataset
-   Write a report summarizing your findings

Here are the steps you’ll need to complete. **Under each step are sub-bullets
detailing questions you need to answer in your report.**

1.  Form a group of no more than 4 people. (You may want to form a group with
    people who are in a similar major or have similar interests as this may make
    dataset selection easier).
2.  Choose one of the provided datasets in the provided SQL server.

    -   What made you choose this dataset?
    -   What aspects of this dataset did you expect to find challenging?

3.  **Using SQL**, account for any incorrect or missing data as you see fit.
    (This should include checking for data types and nulls.)

    -   What steps were taken? Be sure to reference data types in your
        discussion.
    -   Are there any ethical issues with the way you cleaned the data? What are
        they?

4.  Think of 2-3 interesting questions you would like to answer using these
    datasets. These should involve joining the datasets **using SQL** in order
    to link variables from different datasets.

    -   What were the questions you chose and why?
    -   Which datasets did you have to join?
    -   What are the primary keys on which you join?
    -   What type of JOIN was applicable for your questions?
    -   Explain how you verified that your datasets were merged in the way you
        expected.

5.  Think of 2-3 interesting statistical questions you would like to answer
    using these datasets. These should involve calculating the mean, median, and
    standard deviation **using SQL**.

    -   For example:

        1.  Compare the mean and standard deviation for two different variables.
        2.  Compare the mean and median for a single variable.

    -   What were the questions you chose and what were the results?

    -   What do these results mean in the context of the dataset?

6.  **Using SQL**, find summary statistics for the main groups within the
    dataset based on your chosen categorical variable.

    -   For groups of interest, what are the mean, median, variance, standard
        deviation within group?
    -   Is the sample size enough within each group?

7.  Export grouped data from the SQL server to sheets.

8.  **Using sheets**, visualize (what you consider to be) the most interesting
    results from (6).

    -   Why did you choose these visualizations? Be specific as to the types of
        visualization.
    -   Discuss how center and spread are impacted by the categorical variable.

9.  Determine two quantitative variables that have either a strong or an
    interesting relationship. **Using Sheets**, fit a regression on the data.

    -   How did you determine that this relationship was particularly
        interesting?
    -   Identify any potential lurking variables. How did you find them?
    -   What is the equation for the line of best fit, and does the line of best
        fit fit the data well? If not, why not?
    -   If you are getting surprising results, what is surprising and why?

10. Choose a categorical variable that you predict will have an interesting
    relationship with the other variables in the dataset.

    -   Why did you choose this variable?
    -   What led you to predict this variable would have an interesting
        relationship with the other variables?

11. Formulate a new question about how the relationship identified above may be
    influenced by another categorical variable.

    -   **Using Sheets**, create scatterplots and regression lines for each
        category (using either multiple graphs or multiple colors).
    -   In a short paragraph, compare and contrast how the regression analysis
        varies between these groups.

12. Include a conclusion summarizing your findings.

13. Submit your report, **including an appendix of all of your SQL code**, by
    **[Due Date]**.

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
     - Report states why the dataset was chosen.
     -
     -
     - Report does not state why dataset was chosen.

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
     - At least 2 questions were chosen and explanation was given as to why.
       These questions involve using JOIN. The correct JOIN was used and
       implemented to answer the stated questions. The merged dataset was
       verified for correctness. The report includes a correct discussion on the
       different types of JOIN.
     -
     - Questions may be lacking in complexity. The incorrect JOIN or join key
       was chosen/used. There is inadequate discussion on why the type and key
       of the JOIN are chosen.
     - There is no attempt at using JOIN.

   * - **Questions Answered Using Summary Statistics (4)**
     - At least 2 questions were chosen and explanation was given as to why.
       These questions involve calculating summary statistics. The summary
       statistics are accurately calculated, and used to answer the stated
       questions. There is some comment on what these values mean for the
       distribution.
     -
     - Questions may be lacking in complexity. There is an attempt at
       calculating summary statistics, but they are incorrect, not relevant to
       the stated question,  or not referenced in the report.
     - There is no question or attempt to answer the question via calculating
       the population summary statistics.

   * - **Grouped Summary Statistics (8)**
     - GROUP BY was used to calculate relevant summary statistics per group. The
       query result is presented in the report in a clean way. There is some
       other visualization showing some important summary statistics. There is
       some mention of sample size within groups, as well as why the specific
       grouping was chosen. There is a working attempt at using GROUP BY, and it
       is presented in the report.
     - Not all statistics are accurate, or there is no extra visualization.
       There is some mention of sample size within groups.
     - There is an attempt at a GROUP BY, but it uses the wrong dimensions or
       measures. The grouped summary statistics are incorrect or non-existent.
     - There is no attempt at a GROUP BY.

   * - **Visualization (8)**
     - There are multiple visualizations comparing summary statistics across
       groups to answer the questions posed. There is some comparison of center
       or spread across groups.
     - There are multiple visualizations, but they have issues, for example they
       do not directly address the questions posed.
     - There is at least one visualization comparing summary statistics across
       groups attempting to address the questions posed.
     - There are no visualizations comparing summary statistics across groups.

   * - **Regression (8)**

     - Report includes both the scatter plot and the line-of-best-fit equation,
       and these values are (close to) correct. The report includes a discussion
       of  why the particular variables were chosen, the meaning of the
       coefficients, and correlation versus causation. There is some mention of
       whether regression is appropriate for the sample size.
     - The line of best fit is not completely correct. The scatter plot is
       missing from or wrongly formatted in the report. The discussion on
       variable selection, coefficient interpretation, and correlation vs.
       causation is not sufficiently detailed or accurate.
     - There is some attempt at a line of best fit, but the values are
       completely wrong. The scatter plot or the equation are not included.
       There is no proper discussion on variable selection, coefficient
       interpretation, or correlation vs. causation.
     - There is no attempt at fitting a regression.

   * - **Categorical Variable Regression (10)**
     - Suitable variables are chosen, with justification presented. The
       regression and scatter plots are well presented in the report, and the
       appropriate conclusions are reached. There is a paragraph comparing the
       regression with and without the influence of the categorical variable.
     - There are some inaccuracies or some poor presentation in the regression
       and scatter plots. There is a paragraph comparing the regressions but it
       misses key points.
     - Inappropriate (e.g. all quantitative) variables were chosen. The
       regression and scatter plots were not done correctly. There is no
       paragraph comparing the regressions.
     - There is no attempt at regression on a categorical variable.

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
       The report has several spelling/grammar errors.
     - There is no report.