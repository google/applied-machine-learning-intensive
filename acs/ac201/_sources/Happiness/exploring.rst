
..  Copyright (C)  Google, Runestone Interactive LLC
    This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/4.0/.


.. _h651bd6f7d3125664c517b446bc5d4b:

Part I Exploring the Data
=========================

#. Before class you should read about the data science processing pipeline and exploratory data analysis, and the other resources on spreadsheets and summary statistics linked in the previous section.

Introducing the Happiness Report
--------------------------------

The World Happiness Report is a landmark survey of the state of global happiness. The World Happiness Report 2018, ranks 156 countries by their happiness levels, and 117 countries by the happiness of their immigrants.  Many factors may lead to the happiness of a country and we will use spreadsheets to help us explore these factors to try to discover what factors may be most important in determining a country's happiness.

We will start by loading the `happiness_2017.csv <../_static/happiness_2017.csv>`_ file into Google Sheets.  The table below gives a bit of detail about each of the columns on the spreadsheet.

The following definitions are reproduced from `World Happiness Report 2018 <http://worldhappiness.report/ed/2018/>`_

1. GDP per capita is in terms of Purchasing Power Parity (PPP) adjusted to constant 2011 international dollars, taken from the World Development Indicators (WDI) released by the World Bank in September 2017. See Appendix 1 for more details. GDP data for 2017 are not yet available, so we extend the GDP time series from 2016 to 2017 using country-specific forecasts of real GDP growth from the OECD Economic Outlook No. 102 (Edition November 2017) and the World Bank’s Global Economic Prospects (Last Updated: 06/04/2017), after adjustment for population growth. The equation uses the natural log of GDP per capita, as this form fits the data significantly better than GDP per capita.

2. The time series of healthy life expectancy at birth are constructed based on data from the World Health Organization (WHO) and WDI. WHO publishes the data on healthy life expectancy for the year 2012. The time series of life expectancies, with no adjustment for health, are available in WDI. We adopt the following strategy to construct the time series of healthy life expectancy at birth: first we generate the ratios of healthy life expectancy to life expectancy in 2012 for countries with both data. We then apply the country-specific ratios to other years to generate the healthy life expectancy data.

3. Social support is the national average of the binary responses (either 0 or 1) to the Gallup World Poll (GWP) question “If you were in trouble, do you have relatives or friends you can count on to help you whenever you need them, or not?”

4. Freedom to make life choices is the national average of binary responses to the GWP question “Are you satisfied or dissatisfied with your freedom to choose what you do with your life?”

5. Generosity is a function of the national average of GWP responses to the question “Have you donated money to a charity in the past month?” on GDP per capita.

6. Perceptions of corruption are the average of binary answers to two GWP questions: “Is corruption widespread throughout the government or not?” and “Is corruption widespread within businesses or not?” Where data for government corruption are missing, the perception of business corruption is used as the overall corruption-perception measure.

7. Positive affect is defined as the average of previous-day affect measures for happiness, laughter, and enjoyment for GWP waves 3-7 (years 2008 to 2012, and some in 2013). It is defined as the average of laughter and enjoyment for other waves where the happiness question was not asked.

8. Negative affect is defined as the average of previous-day affect measures for worry, sadness, and anger for all waves.

In this first part we will review and practice some spreadsheet calculations by doing some exploratory data analysis.  If you have never used a spreadsheet before don't worry, you will catch on quickly.  Also, remember that at this point we are just exploring so there isn't necessarily a right answer. In fact most of the time we don't know what the right answers are when we are in exploring mode.  You might even be wondering what does it mean to be in exploring mode.  The main thing we are doing is looking around at the data and seeking out things that look 'interesting' bits of statistics that stand out.  We wonder about how things might correlate or what variables might be interdependent on others.  Two of the primary tools we use in this exploring mode are:

.. mchoice:: dat_cat

   Which of the columns in the happiness spreadsheet represent categorical (Nominal) data?

   - Country

     + Correct

   - Region

     + Correct

   - Rank

     - Incorrect

   - Generosity

     - Incorrect, categorical data is generally classes of things not real numbers


.. mchoice:: dat_ord

   Which of the columns in the happiness spreadsheet represent ordinal data?

   - Generosity

     - incorrect

   - Happiness Score

     - Incorrect

   - Rank

     + Correct

   - Country

     - Incorrect


.. mchoice:: dat_ratio

   Which of the columns in the happiness spreadsheet represent ratio data?

   - Happiness Score

     + Correct

   - Generosity

     + Correct

   - Rank

     - Incorrect

   - Confidence in national Government

     + Correct


Summary statistics
------------------

.. dragndrop:: dd_summarystats
   :feedback: Check the Reading list for the introduction to summary statistics
   :match_1: Mean|||The sum of all values, divided by the number of values
   :match_2: Median|||The middle value in all your data
   :match_3: Mode|||The value that occurs most often
   :match_4: Standard Deviation|||A measure of how spread out your data is

   Match the Term on the left with the description on the right.


#. Although the countries are ranked from most happy to least happy we might want start by looking at some summary statistics for the happiness score.

   #. Use the AVERAGE function of sheets to calculate the mean in column D.  Scroll down and click in cell D143 -- that should be an empty cell below the column of numbers for the happiness score.  Now type =AVERAGE(D2:D141) You can also type =AVERAGE( and then click and drag the numbers you want.  D2:D141 specifies a range.  From Column D Row 2 down to Column D Row 141.

      .. fillintheblank:: fb_avghappiness

         After calculating the average happiness score enter it in the blank |blank|, you should include three digits to the right of the decimal point.

         - :5.399: Is the correct answer
           :5.398: 5.3989 should be rounded up to 5.399
           :5.398907144: Be careful with your range, you should not include the column title
           :x: USE the AVERAGE function and the range from D2 to D 141

      Since you are going to be entering numbers to 3 digits, you can use a custom number format under the Format menu, to have Sheets automatically display your values correctly rounded to just three digits to the right of the decimal point.

   #. Many formulas in Sheets use ranges.  Ranges can span cells in a single column like we did in a.  Or they can span cells in a single row such as A1:L1 they can even span rows and columns to form a rectangle such as A1:L141.

   #. Now calculate the STDEV and MEDIAN for the Happiness Score column as well.  If you are fuzzy about standard deviation `this article <https://runestone.academy/runestone/static/cppds/index.html>`_ is a nice intuitive explanation.

      .. fillintheblank:: fb_stdhappiness

         What is the standard deviation of the happiness score? |blank| Again you only need to include three digits to the right of the decimal point.

         - :1.110: Is the correct answer
           :1.109: 1.1098 should be rounded up to 1.110
           :1.094: Careful about how you copy and paste, check your range carefully
           :x: Make sure you use the STDEV function.

   #. We can calculate the same statistics for the other columns by copying and pasting the formula to the cells under the other columns.  As a shortcut you can also click on the square in the lower right corner of the currently selected cell and drag it.

   #. After you have copied and pasted the formula for average to cells E143 to N143 click in N143.  The formula there looks like: =AVERAGE(N2:N141) -- Notice that Sheets is smart about changing the cell references when you copy/paste

      .. fillintheblank:: fb_life_exp

         The mean value for healthy life expectancy is |blank| and the standard deviation is |blank|.

         - :63.441: Is the correct answer
           :x: Incorrect, make sure you are using the correct range

         - :7.596: Is the correct answer
           :x: Make sure you are using the correct range

   #. If you do NOT want Sheets to change the cell references when you are copy/pasting you can use a $ in front of the row or the column and that tells sheets to "leave this reference alone"  We see some examples of this later.


Visualization
-------------

#. The `STDDEV <https://runestone.academy/runestone/static/cppds/index.html>`_ value tells us that the majority of the values are between 4.0 and 6.6 so let us check that graphically.   It is easy to make a histogram of the values in Sheets.  Note: To do this same thing in Excel you would need to install an extension.

   #. Click on the insert graph icon
   #. Choose chart type of histogram
   #. Enter or drag the rows in column D
   #. Does it look like most of the bars are between 4 and 6.6 on your histogram?  It should.
   #. Try editing the details of the histogram to look at the distribution in other columns.

#. Because we are exploring you might also wonder "which country has the largest Economy.GDP or which country scores the highest on Family? Or Generosity?  This is a great question to ask, learning about minimum and maximum values can definitely lead you in interesting directions.  It is also a great chance to learn a couple of other really powerful functions.  Let's explore the question, what country has the highest score in the Generosity column?

   #. Start by finding the maximum value in the generosity column, putting the result in cell J146.

      .. fillintheblank:: gen_max

         What is the maximum value in the generosity column?

         - :0.629: Is the correct answer
           :0.9.*: Looks like you might be off by a column
           :x: Please check your ranges and try again.

   #. Knowing the max is one thing, but that does not tell us which country it is.  For that we will use the MATCH and INDEX functions.  Match allows us to search for a value in a range of cells.  Just like the search function in a word processor. In cell J147 type =match(J146,J2:J141,0) the match function says look for the value in cell J146 in the range J2:J141 and the 0 tells it that the data is not sorted. This is a really important detail.  If you leave the 0 off it will assume that the data is sorted and stop searching and return the first cell it finds that is greater than the value in J146.

      .. fillintheblank:: gen_max_row

         The index of the row containing the maximum value is:

         - :105: Is the correct answer
           :x: catchall feedback

   #. In cell J148 type =index(A2:A141,J147) This tells sheets to return the value from the range A2:A141 in the row specified by the value in J163.  In other words starting at A2 go down 105 rows and return the value.  As we will see later INDEX is really powerful for doing all kinds of things, but primarily for now we will think of the combination of match and index being our search and retrieve power tools.

      .. fillintheblank:: gen_max_country

         The name of the country that is most generous is:

         - :Myanmar: Is the correct answer
           :Mozambique: Not quite you are off by 1
           :Senegal: Not quite you are off by 1
           :x: Check your formula carefully

   #. We broke this process into three steps to make it clear what we were doing.  But they can be combined into a single cell by nesting the functions.  Let's figure out which country gets the lowest score for Generosity, but we'll do it in one cell.  In J165 enter =index($A2:$A141,match(min(J2:J141),J2:J141,0))   Here we are using the fact that match and min each return values and rather than have them visible in a cell for us to look at we can just use them directly as parameters to another function.  That probably seems pretty logical to you since you have done this in Python many times.

      .. fillintheblank:: gen_min

         The country with the lowest generosity score is

         - :Greece: Correct!  Whoever said "beware of Greeks bearing gifts" must have known different greeks than those who responded to the survey.
           :#REF!: Looks like you need to check your ranges

   #. Now you should practice by finding the names of the countries that have the min and max values for some other columns.

      .. fillintheblank:: gov_conf

         What is the name of the country that has the highest confidence in their national government?

         - :Uzbekistan: Is the correct answer
           :x: incorrect

      .. fillintheblank:: gov_conf_min

         What is the name |blank| and happiness score |blank| of the country with the lowest confidence in their national government?

         - :Ukraine: Is the correct answer
           :x: incorrect

         - :4.096: Is the correct answer
           :x: incorrect

   #. If you tried to copy/paste the functions from above you likely ran into some errors.  Check the ranges carefully and remember what sheets does when you copy and paste.  If you insist on copy/pasting then you are going to have to use $ to get it right.  But you'll have to figure that out.

#. One great way to get an overview of the data visually is to make a **choropleth**.  A choropleth combines the geographic data with some other data such as the happiness score.  Google sheets make it very easy to graph data by country.

   #. Click on the insert graph icon
   #. Choose Geo Chart
   #. Use the country column and the happiness score column
   #. Experiment with using other columns such as freedom or generosity

#. The exploration of the happiness scores and the different factors related may have you wondering, what factors lead to some people being happier than others?  Is it their level of freedom?  Their level of wealth?   One way we can answer this question is to calculate a correlation between the happiness index and the various factors. This will create a small table that computes a correlation score between of of our columns of data.  Happiness score to Economy, Happiness score to Family etc.

   #. First let's calculate a correlation between happiness score and each other factor.

   #. To do this we can use the CORREL function, which calculates a pearson correlation between two ranges of data.  Because we want to always keep the happiness index as one of the columns, we will anchor that column using $ and but not the other columns.  This will allow us to copy the formula across.

#. We might now try to focus in on the characteristics of the most happy countries and the least happy countries.

   #. Recompute the correlation scores but don't do it for all of the countries do it for the top 25 and bottom 25.  What stands out for you?

   #. Calculate the average value for each of the factors for the 25 and bottom 25 countries and then calculate a difference between these values.  Which have the largest difference?  The smallest?

#. Another interesting exercise we could do is to identify some countries where their scores in some category like generosity are significantly different from the countries around them.  For example the country of Myanmar stands out on a Choropleth as being the most generous country.  Yet its happiness rank is 114.  Its Generosity score is .8 but the country right above it has a score of .3 and the country below .1.

   #. For each country compute the total difference between its score and the country above it and below it. (have students pick a column for this)

   #. Then you can apply some conditional formatting to help visually pick out the outliers.

   #. You can also sort the region containing the rankings based on this column to gather together the countries with significant differences from their neighbors. WARNING  -- sorting by a calculated column like this will lead to unexpected results.  So copying this column and doing a paste special where you paste only the values is needed before you sort.

**Lesson Feedback**

.. poll:: LearningZone_2_1
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_2_1
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_2_1
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_2_1
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...
