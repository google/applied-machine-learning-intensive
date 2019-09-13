
..  Copyright (C)  Google, Runestone Interactive LLC
    This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/4.0/.

Numbers as indices
------------------

Enough about movie budgets, it’s time to budget my time instead. Because
I schedule my day to the minute, I like to be able to look up movies by
their runtime. So that when I have a spare two hours and 34 minutes, I
can find all the movies that would fit precisely in that time slot
(popcorn-making time is budgeted separately).

Before you start, here is a refresher on the index operator in Pandas.

**Selecting Columns of a DataFrame**

* ``df[<string>]`` — get me a column and return the Series corresponding to that column.
* ``df[<list of strings>]`` — Get me a bunch of columns and return a DataFrame

**Selecting Rows of a DataFrame**

* ``df[<series/list of Boolean>]`` — get me the rows for each element in the listlike thing you passed me that is ``True``  However, I think this is confusing and whenever you want to select some rows of a DataFrame you should use  ``df.loc[]``
* ``df.loc[<series/list of Boolean>]`` — behaves just like ``df[<series/list of Boolean>]``
* ``df.loc[<string>]`` — use the non-numeric row index and return the row(s) for that index value.
* ``df.loc[<string1>:<string2>]`` — use the non-numeric index and return a data frame composed of the rows starting with string1 and ending with each string2
* ``df.loc[<list/Series of strings>]`` — return a data frame composed of each row from df with an index value that matches a string in the list

If you use an integer in any of the last four examples it works just like the string, but the index values are numeric instead.  What is important (and confusing) about this is that they use the index, NOT the position.  So, if you create a data frame with 4 rows of some data it will have an index that is created by default where the first row starts with 0, the next row is 1 and so on.  BUT then you sort the data frame and that causes the last row to be first and the first row to be last.  Using `df.loc[0]` on the sorted data frame will return the last row!

If you want to be strictly positional you should use ``df.iloc[0]`` which will return the first row REGARDLESS of the index value. — ``df.iloc[0:5]`` is the same as doing ``df.head()``, and ``df.iloc[[1, 3, 5, 7]]`` will return four rows: 2nd, 4th, 6th and 8th.

Practice Questions
~~~~~~~~~~~~~~~~~~

Create a Series called ``time_scheduler`` that is indexed by runtime and
has the movie’s title as its values. Note that you will need to use
``sort_index()`` in order to be able to look up movies by their
duration. Base yourself on ``df`` rather than ``budget_df``.

While you’re at it, remove any movie that is less than 10 minutes (can’t
get into it if it’s too short) or longer than 3 hours (who’s got time
for that?).

HINT: You’ll have to use ``pd.to_numeric`` to force the runtimes to be
numbers (instead of numbers in a string)

.. code:: python3

    time_scheduler = []
    time_scheduler

Now let’s find all those two-hour-and-34-minute movies:

.. code:: python3

    time_scheduler[154]


.. fillintheblank:: mov_154_min_movies

   How many movies lasting 154 minutes are there?

   - :31: Is the correct answer
     :x: catchall feedback


But what is the 154th shortest movie in this collection?

.. code:: python3

    movie_number_154 = time_scheduler.iloc[154]
    movie_number_154



.. fillintheblank:: mov_154_shortest

   Copy and paste the name of the 154th shortest movie in this collection. (No Quotes)

   - :(Tears of Steel|Presentation, or Charlotte and Her Steak): Is the correct answer
     :Casper: Close, but make sure you have your DataFrame sorted properly
     :x: If you are getting a whole bunch of movies make sure you are using `iloc` and not `loc`



**Lesson Feedback**

.. poll:: LearningZone_5_3
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_5_3
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_5_3
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_5_3
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...
