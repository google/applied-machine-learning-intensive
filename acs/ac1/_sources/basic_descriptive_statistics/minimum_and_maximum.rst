Minimum and Maximum
===================

The minimum and maximum of a dataset can be very useful statistics, and are
relatively simple to calculate. These statistics only apply to quantitative
variables.


.. admonition:: Minimum Definition

   The **minimum** value is the smallest value in the dataset, or the value that
   all other values in the dataset are greater than or equal to.


.. admonition:: Maximum Definition

   The **maximum** value is the largest value in the dataset, or the value that
   all other values in the dataset are less than or equal to.


The minimum or maximum value is sometimes the only value you need to know. For
example, suppose your university has organized a field trip for your class to a
concert, but the event is at a 21+ venue so people under the age of 21 are not
allowed in. In this case, knowing that the minimum age of the students in your
class is 21 is sufficient, as that tells you that everyone in the class is at
least 21 and that all members of the class can go on the field trip.


.. _minimum_and_maximum_dice_roll:

Example: Dice Roll
------------------

Consider rolling a standard dice.

-   There are six faces.
-   Each face is equally likely to land face up.
-   The faces are labelled as follows: 1, 2, 3, 4, 5, 6.

It might seem unnecessary to use Sheets to calculate the minimum and maximum
possible results of a dice roll, but when there are thousands of values instead
of six, using Sheets or some other tool will be a necessity.

You can calculate the minimum and maximum value in Sheets using the ``MIN`` and
``MAX`` functions respectively.


.. admonition:: Minimum and Maximum in Sheets

   **The MIN function returns the minimum value of a set of values.** You can
   either input several values separated by a comma (e.g.
   ``=MIN(value1, value2, value3)``), or you can input a range of cells of which
   you want to know the minimum (e.g. ``=MIN(A1:A10)``).

   **The MAX function returns the maximum value of a set of values.** You can
   either input several values separated by a comma (e.g.
   ``=MAX(value1, value2, value3)``), or you can input a range of cells for
   which you want to know the maximum (e.g. ``=MAX(A1:A10)``).


This example illustrates how to calculate the minimum value of a dice roll using
``MIN``, but the exact same logic and syntax applies to calculating the maximum
using ``MAX``. As stated above, there are two ways to calculate the minimum
value of a dice roll.

In the first way, each value is input into the ``MIN`` function, separated by a
comma.


.. https://screenshot.googleplex.com/wv9iEUPFF

.. image:: figures/minimum_using_values.png
   :align: center


Alternately, you can specify all the values in different cells, and input the
cell range into the ``MIN`` function.


.. https://screenshot.googleplex.com/NkogVUC3prp

.. image:: figures/minimum_using_cell_range.png
   :align: center


In future examples, you will see that specifying a cell range is the more
efficient way to use ``MIN``, ``MAX``, and other statistical functions.


Example: Weather
----------------

Suppose you want to know the minimum and maximum temperature that New York City
(NYC) generally experiences in a year.

The weather dataset previously seen :ref:`here<variables_weather>` has the field
“actual_min_temp” which records the coldest temperature every day, and a field
“actual_max_temp” which records the highest temperature every day. (For this
example, only NYC weather is considered so the “city” column is removed, and the
month is not relevant so the “month_text” column is removed.)


.. fillintheblank:: nyc_coldest_temp

   What is the coldest minimum temperature reached in NYC for the twelve months?
   |blank|

   - :2: Correct
     :11: Incorrect: Look at the minimum of the “actual_min_temp” column.
     :x: Incorrect


.. fillintheblank:: nyc_warmest_temp

   What is the warmest maximum temperature reached in NYC for the twelve months?
   |blank|

   - :92: Correct
     :85: Incorrect: Look at the maximum of the “actual_max_temp” column.
     :x: Incorrect


This dataset for twelve months contains just 365 data points. It would be
time-consuming but not impossible to scan each column visually and find the
minimum and maximum values. But imagine if this dataset covered every day for
one-hundred years! Sheets would be able to find the minimum and maximum just as
quickly as it did for twelve months. Doing this manually, however, is
error-prone and would not be fun.