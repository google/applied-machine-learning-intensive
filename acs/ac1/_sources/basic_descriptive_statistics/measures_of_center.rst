.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


.. _measures_of_center:

Measures of Center
==================

Some of the most widely used statistics are “measures of center”. These
statistics describe where the data is centered. This type of statistic is
extremely useful, as it allows you to summarize all the data with one
number/category. (Statistics like this are called **summary statistics**.)

You can think of a measure of center as a “best guess”: if you had one guess at
the value of a new observation (e.g. the height of a new student who joins the
class), what would you guess?


.. admonition:: The Three Measures of Center

   The **mean** is the standard form of averaging.

   -   The mean is calculated by adding up all the values in the data, and
       dividing by the number of data points.
   -   Sometimes the mean is referred to simply as the “average” (for example in
       Sheets), but it is better to remember it as the mean.
   -   The mean is only defined for quantitative variables.

   The **median** is the middle value.

   -   If you order all the data points from lowest to highest, the median is
       the value that sits directly in the middle.
   -   If there are two “middle values” (which occurs when there is an even
       number of data points), the median is halfway between the two values.
   -   The median is the value such that half the values are below it, and half
       the values are above it.
   -   The median is only defined for quantitative variables.

   The **mode** is the most commonly occurring value in the data.

   -   If you count the number of times each category occurs, the mode is the
       category with the highest count.
   -   A dataset can have multiple modes, if multiple categories have the same
       count, and this count is higher than those of the other categories.
   -   Sometimes the mode is referred to simply as the most common value.
   -   The mode is only defined for categorical variables.


Whenever you have a categorical variable, the mode is your only choice for a
measure of center. For quantitative variables, the mean is usually the best
choice as a measure of center. The median is a useful alternative when your
dataset has several outliers or a skew. (There is a section dedicated to
outliers and skew :ref:`below<outliers_and_skew>`.)

Suppose you are doing a study comparing Los Angeles (LA) and San Francisco (SF),
and want to know whether families in one city make more than those in the other.
You could collect data on the family income of all families in both LA and SF
(which would take quite some time), but this would be too much data to look at!
Instead, you could look for an appropriate summary statistic, for example the
median (defined below). `The median family income in LA is $62,289, compared to
$93,391 in SF`_, so just this is probably enough to tell you that overall,
families in SF make more than families in LA. (If you are curious why the median
is a more appropriate measure of center when looking at family income,
see :ref:`the example below<outliers_and_skew_income>`.)


.. mchoice:: new_student_birth_country

   You have a dataset on the birth country of all of your students. A new
   student joins your class, and you want to take a “best guess” at where she
   comes from. What measure of center would you use?

   - Mean

     - Incorrect: What kind of variable is birth country?

   - Median

     - Incorrect: What kind of variable is birth country?

   - Mode

     + Correct


.. shortanswer:: do_europeans_live_longer_than_north_americans

   You want to do a study on whether Europeans live longer than North Americans.
   What dataset would you use, and what summary statistics would be useful?


The mean, median, and mode functions in Sheets all have the exact same syntax as
the ``MIN`` and ``MAX`` functions, defined earlier
:ref:`here<minimum_and_maximum_dice_roll>`. You can either input all relevant
values into the function separated by commas, or you can define a cell range.
The latter is far more convenient in most cases.


.. admonition:: Measures of Center in Sheets

   **The AVERAGE function returns the mean of a set of values.** You can either
   input several values separated by a comma (e.g.
   ``=AVERAGE(value1, value2, value3)``), or you can input a range of cells of
   which you want to know the mean (e.g. ``=AVERAGE(A1:A10)``).

   Note that mean is called AVERAGE in Sheets. It is nevertheless recommended to
   use the term “mean” to describe this measure of center wherever possible
   (e.g. in reports and articles), to disambiguate different measures of center.
   `See here for a longer discussion.`_

   **The MEDIAN function returns the median of a set of values.** You can either
   input several values separated by a comma (e.g.
   ``=MEDIAN(value1, value2, value3)``), or you can input a range of cells of
   which you want to know the median (e.g. ``=MEDIAN(A1:A10)``).

   **The MODE function returns the mode of a set of values.** You can either
   input several values separated by a comma (e.g.
   ``=MODE(value1, value2, value3)``), or you can input a range of cells of
   which you want to know the mode (e.g. ``=MODE(A1:A10)``).


Example: Dice Roll
------------------

.. TODO(raskutti): Embed
   https://docs.google.com/spreadsheets/d/17ve2CvqFOhyMUGO13S69duQEExW47bWBLtme4pONiWY/edit#gid=471054686


.. fillintheblank:: mean_dice_roll

   Given the sheet above, write a formula for the mean of a dice roll. |blank|

   - :=MEAN\(A1\:A6\): Correct
     :MEAN\(A1\:A6\): Incorrect: Remember formulas must start with ``=``.
     :x: Incorrect


.. fillintheblank:: median_dice_roll

   Given the sheet above, write a formula for the median of a dice roll. |blank|

   - :=MEDIAN\(A1\:A6\): Correct
     :MEDIAN\(A1\:A6\): Incorrect: Remember formulas must start with ``=``.
     :x: Incorrect


.. _measures_of_center_weather:

Example: Weather
----------------

In this example, you will calculate and compare the mean maximum daily
temperature in Seattle and New York City (NYC). The data for the two cities’
temperatures are in two different sheets.

.. TODO(raskutti):
   https://docs.google.com/spreadsheets/d/17ve2CvqFOhyMUGO13S69duQEExW47bWBLtme4pONiWY/edit#gid=0

The “actual_max_temp” is in column D, and tells you the maximum daily
temperature. Calculating the mean of that is as simple as using the ``AVERAGE``
function on that cell range. From this, you can see that the mean maximum
temperature in Seattle is 64.2 degrees.

You can now switch to the NYC sheet and use the exact same formula.


.. fillintheblank:: nyc_mean_max_temp

   What is the mean maximum temperature in NYC? (Use 1 decimal point.) |blank|

   - :61.7: Correct
     :x: Incorrect


This example indicates that on average, over the course of twelve months,
Seattle and NYC have fairly similar temperatures. One problem with using a
summary statistic is that you are compressing an entire dataset of information
into one number. That can sometimes be ok, as it was in the example comparing
income in San Francisco and Los Angeles above. However, you need to be careful,
as often such statistics can over-summarize the data.

In reality, for a given time of year, the temperatures of Seattle and NYC
usually differ significantly. NYC winters are considerably colder than Seattle
winters, and NYC summers tend to be warmer than Seattle summers. When averaged
over twelve months, however, these effects “cancelled out”, and, when looking
just at the mean, it may look as if Seattle and NYC have similar temperatures
all year round. The
:ref:`section below on measures of spread<measures_of_spread>`, dives deeper
into these cities’ temperatures.


.. shortanswer:: nyc_and_seattle_median_temperatures

   Calculate the median maximum temperatures for Seattle and NYC.
   Do these statistics tell a different story? Why?


.. _The median family income in LA is $62,289, compared to $93,391 in SF: https://en.wikipedia.org/wiki/List_of_California_locations_by_income#Counties
.. _See here for a longer discussion.: https://www.quora.com/What-is-difference-between-the-mean-and-the-average