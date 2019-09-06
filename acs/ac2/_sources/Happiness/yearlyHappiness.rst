
..  Copyright (C)  Google, Runestone Interactive LLC
    This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/4.0/.

.. _h756a797b286237b36797fb1f277d18:

Part III Comparing Happiness Data across years
==============================================

We have two files of happiness data, one for 2017 that you have been using, and another for `2012 <../_static/happiness_2012.csv>`_ so you can do some comparisons across a span of five years.

#. Start a new workbook and get each of the csv files for the happiness data loaded into a separate sheet.

#. Now lets create a table on a new sheet that shows the happiness rank for each country for each year.  You'll have 4 columns country name, 2012 rank, and 2017 rank.  Hint: Use VLOOKUP  -- But wait!  What is the deal with these `#N/A` values?  Shouldn't the happiness report have the same countries for every year?  Apparently just like regular people not all countries participated in the survey every year.  Lets press on and hope for best for the moment...

Now create a column where you calculate the change between the 2017 rank and the 2012 rank.  Then create a new cell where you find the max value of this new column.

Oh dear, hoping for the best is rarely a good strategy.  You will notice that the result of looking for the max value in column that contains one of these `#N/A` values results in the function returning `#N/A` as well!  It appears we will have to find a better strategy.

The right way to handle this problem is to use the IFERROR function of Google Sheets.  This is one area where Google and Excel are slightly different.  In Excel the function is called ONERROR, but they behave the same in any case.  The IFERROR function takes two parameters.  A function or calculation, and a value to insert in the case of an error.  In our case we want to adjust our subtraction so that if there is an error we will set the difference to be 0.  We'll change the calculation to look something like `=IFERROR(C2-P2, 0)` Now you will see that wherever we had an `#N/A` value before we now have a 0.  You will also see that we get interesting values for max and min.

.. fillintheblank:: act_fb_bigmoversrank

   What is the name of the country with the largest positive change in their happiness rank? |blank| What about the largest negative change? |blank|?

   - :Albania: Is the correct answer
     :x: Remember to use the MATCH and INDEX functions for this part

   - :Bulgaria: Is the correct answer
     :x: Remember to use the MATCH and INDEX functions for this part

#. Next let us find the biggest changes in the happiness scores from 2012 to 2017

.. mchoice:: act_mc_samechange

   Are the countries that with the largest change in rank the same as the countries with the largest change in score?

   - False

     + Surprisingly yes.

   - True

     - No, the countries are different.  If you are guessing you better complete this part to find out who they are and investigate why that might be.

.. fillintheblank:: act_fb_bigmoversscore

   What is the name of the country with the largest positive change in their happiness score? |blank| What about the largest negative change? |blank|?

   - :Nepal: Is the correct answer
     :x: Remember to use the MATCH and INDEX functions for this part

   - :Ghana: Is the correct answer
     :x: Remember to use the MATCH and INDEX functions for this part

.. shortanswer:: act_why_diff

    Give an explanation for why you think the two are different?  Outline an experiment or calculation that you can do with a spreadsheet to back up your answer.

#. For the five countries with the largest changes changes in ranking between 2012 and 2017 what are the factors that changed the most? For this part you can do this by making comparisons between sheets rather than creating a huge number of new columns on this summary sheet.

.. shortanswer:: act_big_factors

    What did you learn in the previous investigation?  What were the factors that changed the most?


\ |STYLE2|\

#. The choropleth gave us some insight into how happiness may be related to the continent.  It was pretty clear that African nations were less happy than many others.  Lets see if we can quantify that.

   a. First we need to find a file that helps us map from `country to continent <../_static/country_codes.csv>`_.  Lets add this to our file as a new worksheet.

   b. How can we add a column (or a few columns) to our happiness spreadsheet from this spreadsheet?   -- VLOOKUP

   c. Once we have the continent name added to the spreadsheet can we find the average happiness score for each continent?




**Lesson Feedback**

.. poll:: LearningZone_2_3
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_2_3
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_2_3
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_2_3
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...

.. |STYLE2| replace:: **Challenge**
