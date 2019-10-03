.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


Comparing Forms of Government
=============================

The goal of this section is to be able to do some comparison of the different
forms of government, and how the form of government might have an impact some of
our other variables. We'll do this by building a pivot table in Pandas. You have
already done this in a spreadsheet, so it's good to see how to do it in Pandas
as well. In order to accomplish this, we are going to have to do the following.

1. Learn or review how you can do some screen scraping to get the form of
   government.
2. Learn about the ``pivot_table`` and ``pivot`` methods
3. Practice adding new data to a data frame

If you haven't already, you should review the example of :ref:`screenscrape`.
This will show you the basics of reading and grabbing information out of a page.
When you are comfortable with that, you can dig in to getting the information
from `this page <../_static/government_type.html>`_.

Now, let's look at making a pivot table. We will leave pivoting on the form of
government up to you. Instead, we will do an example to see how climate, region
of the world, and parts of the economy might be related. We have a column for
region, we have a column for climate, and we have information on the economy.
What we want to do is summarize that information in a table where we have a row
for each region, and a column for each classification of climate. Then in each
cell, we would like to summarize the fraction of the economy that comes from
agriculture.


.. csv-table::

   Climate,1.0,1.5,2.0,2.5,3.0,4.0
   Region,,,,,,
   ASIA (EX. NEAR EAST),0.229500,0.1250,0.167500,0.186,0.116667,NaN
   BALTICS,NaN,NaN,NaN,NaN,0.040000,NaN
   C.W. OF IND. STATES,0.230667,NaN,0.234000,0.353,0.179500,0.133
   EASTERN EUROPE,NaN,NaN,NaN,NaN,0.087500,0.142
   LATIN AMER. & CARIB,NaN,0.0820,0.094722,NaN,0.082667,NaN
   NEAR EAST,0.060100,NaN,NaN,NaN,0.060000,NaN
   NORTHERN AFRICA,0.125000,NaN,NaN,NaN,0.132000,NaN
   NORTHERN AMERICA,NaN,NaN,0.010000,NaN,0.010000,NaN
   OCEANIA,0.038000,NaN,0.194357,NaN,0.043000,NaN
   SUB-SAHARAN AFRICA,0.230714,0.2455,0.311406,0.119,0.228333,NaN
   WESTERN EUROPE,NaN,NaN,NaN,NaN,0.029389,0.041


The first thing we really want to do is change those headings. Climate values of
1.0, 2.0 etc are not very useful, but we can translate that into more
human-friendly form.

The climate numbers are as follows:

1. Dry tropical or Tundra
1.5 Mixed tropical
2. Wet tropical
2.5 Mixed
3. Temperate
4. Dry summers and wet winters.

Let's change our climate classification from numeric to nominal. We can do this
using the ``map`` method, a lambda function, and a dictionary that maps from the
climate number to a label.

Now, let's pivot the table. The pivot table method takes three parameters:
``index``, ``columns``, and ``values``. The index parameter asks "what values
from the original table should I use as the new row index?". The columns
parameter asks "what values from the original table should I use as the column
headings?". The values parameter says what values to include in the cells. In
most cases, these values will need to be aggregated in some way, and by default
the aggregation is to take the mean.


.. code:: python3

   wd.pivot_table(index='Region', columns='Climate', values='Agriculture')


.. csv-table::

   Climate,Dry Tropical or Tundra,Mixed,Mixed Tropical,Mountain,Temperate,Unknown,Wet Tropical
   Region,,,,,,,
   ASIA (EX. NEAR EAST),0.229500,0.186,0.1250,NaN,0.116667,0.3800,0.167500
   BALTICS,NaN,NaN,NaN,NaN,0.040000,0.0550,NaN
   C.W. OF IND. STATES,0.230667,0.353,NaN,0.133,0.179500,0.1335,0.234000
   EASTERN EUROPE,NaN,NaN,NaN,0.142,0.087500,0.0880,NaN
   LATIN AMER. & CARIB,NaN,NaN,0.0820,NaN,0.082667,NaN,0.094722
   NEAR EAST,0.060100,NaN,NaN,NaN,0.060000,0.1200,NaN
   NORTHERN AFRICA,0.125000,NaN,NaN,NaN,0.132000,0.1465,NaN
   NORTHERN AMERICA,NaN,NaN,NaN,NaN,0.010000,0.0220,0.010000
   OCEANIA,0.038000,NaN,NaN,NaN,0.043000,NaN,0.194357
   SUB-SAHARAN AFRICA,0.230714,0.119,0.2455,NaN,0.228333,0.2640,0.311406
   WESTERN EUROPE,NaN,NaN,NaN,0.041,0.029389,0.1002,NaN


The ``pivot`` function works like the ``pivot_table`` function, but does not do
any aggregation. Therefore, it will throw an error if you have duplicate index
rows.

Try changing the values parameter to be a list of of columns maybe Agriculture,
Service, and Industry. How does that change your table?


Project
-------

Add a "form of government" column to your data frame. There may be other
alternatives for finding the data besides the web page presented earlier to
scrape. If you don't want to do screen scraping, there may be a different easier
route.

Then, create a pivot table using the region as the rows, form of government as
the columns, and summarize the GDP in tabular form.


**Lesson Feedback**

.. poll:: LearningZone_6_5
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_6_5
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_6_5
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_6_5
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...