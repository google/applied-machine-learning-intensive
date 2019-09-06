
..  Copyright (C)  Google, Runestone Interactive LLC
    This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/4.0/.

Challenge:  Calculating a Correlation matrix
============================================

Early on in our exploration of the happiness data we calculated the correlation between the happiness score and the different factors.  Now we have more data and more factors to continue and we might ask a more general question about which of our columns are correlated with each other.  A common way to do this is to build a correlation matrix.  Where the rows and the columns of the matrix represent each of our different factors and the individual values in the cells of the matrix represent the correlation between each pair of factors.

The following table illustrates what we mean.  Suppose we have three factors A, B, and C.  A and B have a correlation of 0.7, A and C have a correlation of -0.5, B and C have a correlation of 0.9.

.. csv-table::
    :header: ,A,B,C
    :stub-columns: 1

    A,1.0,0.7,-.5
    B,0.7,1.0,.9
    C,-.5,.9,1.0

Notice that the diagonal of this matrix has all 1.0 values.  Each factor is perfectly correlated with itself.

In the next steps you will build a correlation matrix between the various factors of our happiness data.  This will challenge your use of the $ in defining ranges as well as your ability to think about having several cells of a spreadsheet work together.

#. To calculate a correlation matrix we will make use of sheets INDEX and CORREL functions.  The correl function expects two ranges -- in our case two columns of numbers to compute the correlation between.  For example the happiness score and the Economy.  But to make our correlation matrix we need to compute the correlation between all pairs of columns.  Using the column letters is more compact so lets write out a few:

   1. EE, EF, EG, EH, EI, EJ, EK, EL, FE, FF, FG, FH, FI, FJ, FK, FL, …

   2. Here is a Python snippet that should give you the full idea:

   .. code-block:: python

      For i in "EFGHIJKL":
          For j in "EFGHIJKL":
              print("correlate column ", i, " with column ", j)

   3. The aptly named INDEX function is what allows us to do this by writing one clever function and then copying and pasting it to fill out our matrix.

#. It may take a bit of experimentation to get the indexes and the $ correct but you will eventually end up with a matrix where the diagonal is 1.  This is a good indicator that you have things right.  This \ |LINK2|\  may also be useful for getting this right.

#. Once you have the numbers we can make a rough heat map by using conditional formatting.  Using some conditional formatting rules we can change the foreground and background color of the cells.  Lets start by adding  a rule that says if the correlation is between 0.75 and 1.0 then color the background green.

#. You can add other rules to cover different ranges, but you will immediately see which cells we might want to focus on the most.


.. fillintheblank:: act_corr_free_gen

   What is the correlation between Freedom to Make life choices and Generosity?

   - :0.317: Is the correct answer
     :x: catchall feedback


.. fillintheblank:: act_corr_cols

   Which two factors have the largest positive correlation (not including the diagonal) |blank| and |blank|

   - :HappinessScore: Is the correct answer
     :x: catchall feedback

   - :Life Ladder: Is the correct answer
     :x: Make sure you have capitalization correct.


.. fillintheblank:: act_corr_small_cols

   Which two factors have the largest negative correlation?

   - :Negative Affect: Is the correct answer
     :x: List the column first

   - :Social Support: Is the correct answer
     :x: Maybe your order is wrong?

**Lesson Feedback**

.. poll:: LearningZone_2_4
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_2_4
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_2_4
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_2_4
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...

.. |LINK2| raw:: html

    <a href="https://www.youtube.com/watch?v=uc55cnr8A14" target="_blank">video</a>
