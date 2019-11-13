.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


Module E
========

Project Description
-------------------

In this project, you will create and compare the performance of different binary
classification models using scikit-learn.

**Your final submission will be an iPython notebook. Do not hide any code in the
notebook, and do not do any analysis outside this submitted notebook. You may
use any Python functionality, even if it was not covered during class. If you
found a piece of code online, make sure to reference where you found it.**

Here are the steps you’ll need to complete  **Under each step are sub-bullets
detailing questions you need to answer in your report.**

1.  Form a group of no more than 4 people.

    -   You may want to form a group with people who are in a similar major or
        have similar interests as this may make dataset selection easier.

2.  **Choose a dataset** from somewhere online. This dataset must have a binary
    outcome variable that will be predicted. Make sure to **have your dataset
    checked by your instructor before proceeding**, to ensure it is ok for use.

    -   What is the binary outcome variable to be used for prediction?
    -   What made you choose this dataset?
    -   What aspects of this dataset did you expect to find challenging? Were
        you right?

3.  **Using pandas**, import the data into python.

    -   What was your process?
    -   What hurdles did you encounter?

4.  **Clean the data** and account for any incorrect / missing data as you see
    fit.

    -   How did you know what needed to be cleaned?
    -   How did you clean the data? What steps were taken? Be sure to reference
        data types in your discussion.
    -   Are there any ethical issues with the way you cleaned the data? What are
        they?
    -   Did you make any trade-offs as you were cleaning? What and why?

5.  **Using scikit**, encode any necessary variables.

    -   Discuss whether any variables need encoding and why.
    -   If you encoded variables, what method did you choose and why.

6.  If necessary, **encode variables** so they can be used in scikit models.

7.  **Use scikit** to build a logistic regression to predict the outcome
    variable.

    -   What steps did you take for cross-validation?
    -   How did you choose the parameters?

8.  **Evaluate the success of the model**.

    -   Display the confusion matrix.
    -   Plot the ROC curve **using scikit and/or altair**.

9.  **Use scikit** to build at least two other types of classification models.

    -   What models did you choose to build, and why?
    -   Plot the performance metrics from (7) for each model.

10. **Choose** which one model outperforms the others.

    -   Which model did you choose, and why?
    -   What are the general pros and cons of the model that you finally chose?

11. **Submit** your notebook by **[Due Date]**.

12. **Optional (faculty can decide whether to include or not)**: After
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

   * - **Dataset (4)**
     - The dataset has a suitable binary response variable, that is mentioned in
       the notebook. Report includes a rationale for why the dataset was chosen.
     - The dataset has a suitable binary response variable, that is mentioned in
       the notebook. The rationale for why the dataset was chosen is not clear.
     - The dataset may not include an appropriate binary response variable.
     - The dataset was not approved by the instructor, or the report does not
       include a rationale for why the dataset was chosen.

   * - **Data Importing (2)**
     - Data is successfully imported into the notebook. The notebook documents
       the steps taken or relevant code.
     - Data is successfully imported into the notebook, but either the code is
       not included or the steps or not documented.
     -
     - The data was not imported successfully into the notebook.

   * - **Data Cleaning and Encoding (10)**
     - All missing/unclean data is found and accounted for in a way that makes
       sense. The report references data types, any ethical tradeoffs, and
       outlines what steps were taken and why.Any necessary variables are
       encoded, and there is a discussion as to whether/how variables are
       encoded.
     - There is a strong attempt at data cleaning, but some crucial steps to
       clean the data are not taken. Steps outlined to clean the data are
       ambiguous. There is a discussion as to whether/how variables are encoded,
       but it lacks detail or nuance.
     - There is an attempt at data cleaning, but it does not get far. Large
       chunks of missing/unclean data are untreated. Key steps of cleaning
       process were not reported. There is minimal discussion on variable
       encoding.
     - There is no attempt to clean the data.

   * - **Logistic Regression (6)**
     - Scikit is used to build a logistic regression. Cross-validation is used
       to choose parameters.
     - There is a reasonable attempt at building a logistic regression.
       Cross-validation may not be appropriately used.
     - There is an attempt at building a logistic regression. There is no
       cross-validation.
     - There is no attempt at building a logistic regression.

   * - **Model Evaluation (8)**
     - The confusion matrix is displayed and ROC curve is plotted. The notebook
       makes some comments on the implications of these performance metrics.
     - The confusion matrix is displayed and ROC curve is plotted, but may not
       be well-presented. There is minimal comment on the performance of the
       model.
     - The confusion matrix or the ROC curve is not in the notebook. There is no
       comment on the performance of the model.
     - Neither the confusion matrix nor the ROC curve is in the notebook.

   * - **Other Binary Classification Models (8)**
     - At least two other (not logistic regression) binary classification models
       are built. The notebook comments on why these were chosen.
       Cross-validation is used to choose parameters.
     - At least two other (not logistic regression) binary classification models
       are built, but the notebook may not explain why these were chosen.
       Cross-validation is attempted, but the report may be lacking comments on
       the implications.
     - There is an attempt at building at least one other (not logistic
       regression) binary classification model, but the notebook does not
       explain why these were chosen.  There may not be an attempt at
       cross-validation.
     - There is no attempt at building other binary classification models.

   * - **Model Selection (8)**
     - Confusion matrices and ROC curves are plotted for all models. These are
       used to choose which model is best. There is a discussion as to why the
       final model was chosen.
     - Confusion matrices and ROC curves are plotted for all models. The
       discussion as to which model is best is either lacking clarity or
       inconsistent with the plots.
     - There is an attempt at choosing a model, but it is misguided or too
       minimal.
     - There is no attempt to use performance metrics to choose a final model.

   * - **Readability (4)**
     - The notebook is structured well. There are descriptions where necessary.
       There are very few spelling/grammar errors.
     - The notebook is structured well, but there are no descriptions. There are
       some spelling/grammar errors.
     - The notebook lacks structure, and is hard to follow. There are several
       spelling/grammar errors.
     - There is no notebook.

   * - **Total (50)**
     -
     -
     -
     -