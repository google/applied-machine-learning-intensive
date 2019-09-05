Aggregation or Group By
=======================

One very powerful features of SQL is that it allows us to create summary
information by grouping rows together. For example, we could ask
ourselves how many bike trips were taken for each subscriber type, and
which subscriber type has the most bike trips?

.. activecode:: sql_bikeshare_agg_1
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    SELECT
      member_type, COUNT(*)
    FROM
      trip_data
    GROUP BY
      member_type
    ORDER BY
      COUNT(*) DESC
    LIMIT
      10




``GROUP BY member_type`` takes all the rows with a given
member_type and produces a single row in the result. This means that
we need to tell SQL how we want to combine the other columns’ values
into a single row. The above example uses ``COUNT(*)`` which reports the number of rows that were combined.

Aggregating the values for ``member_type`` is not hard, since
they’re all the same, SQL just gives us a single copy of the publisher
name. Other columns, we need to either ignore (causing them to be
omitted from the output) or specify a way to aggregate them.

We must specify an aggregate function for any column that we ``SELECT``
in our query (except the column that we’re grouping by) in order for the
command to succeed. If we don’t specify a way to aggregate the value most database servers will complain.  However, SQLITE does not.  SQLite lets you do silly things without giving you an error.   For example, the following query will work, but you have no idea what the results actually mean.

.. activecode:: sql_bikeshare_agg_2
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    SELECT
      duration, count(*)
    FROM
      trip_data
    GROUP BY
      member_type
    ORDER BY
      COUNT(*) DESC


Here you have grouped by ``member_type``, but without ``member_type`` in the select clause you have no idea which rows correspond to which member type. That is why most databases will flag this as a error.  Furthermore the duration field may be the first duration in the group or maybe the last duration in the group or possibly in between, But its not defined.  The best practices for writing group by queries that work well across database systems are as follows:

* Always include the GROUP BY column(s) in your SELECT clause.
* If you include a column that is **not** in the GROUP BY clause in your SELECT clause you must do some form of aggregation on the values in that column.  For example, min, max, mean, count, etc.


Let’s go back briefly to the first query in the Aggregation section. The
top result was the count of bike trips for member_type ``Member``:

=========== ========
member_type COUNT(*)
=========== ========
Member      979814
=========== ========

If you’d like to get a more granular break down of the count, you may
specify multiple columns to aggregate within the ``GROUP BY`` clause,
for example: further breakdown the aggregate count by the start station
IDs:

.. activecode:: sql_bikeshare_agg_3
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    SELECT
      member_type, start_station, count(*)
    FROM
      trip_data
    WHERE
      member_type = 'Casual'
    GROUP BY
      member_type, start_station
    ORDER BY
      COUNT(*) DESC
    LIMIT
      20



Great! Now that you’re familiar with how to aggregate data using SQL
query by using ``COUNT()`` as your aggregation function, let’ take a
look at other aggregation functions.

There are `many such
functions <https://www.postgresql.org/docs/9.5/functions-aggregate.html>`__.
Some common ones include:

-  ``SUM``: To add the values together
-  ``AVG``: To compute the mean of the values
-  ``MIN`` or ``MAX``: To compute the minimum and maximum respectively

So we could for example compute the **total** number of minutes of all
bike trips for all subscriber types

.. activecode:: sql_bikeshare_agg_4
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db


    SELECT
      member_type, SUM(duration)
    FROM
      trip_data
    GROUP BY
      member_type
    LIMIT
      10




Practice Exercises
------------------


.. reveal:: bikes_agg
    :instructoronly:

    .. activecode:: sql_bikeshare_agg_sol1
        :language: sql
        :dburl: /runestone/books/published/httlads/_static/bikeshare.db

        SELECT
        start_station, AVG(duration)
        FROM
        trip_data
        GROUP BY
        start_station
        ORDER BY
        AVG(duration) DESC
        LIMIT
        10



    2. ``select bike_number, count(*) from trip_data group by bike_number order by count(*) desc```

    3. ``select member_type, count(*) from trip_data group by member_type;``

    4. ``select start_station, count(*) from trip_data where start_station = end_station group by start_station order by count(*) desc``

.. activecode:: sql_bikeshare_agg_ex1
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    Compute the average duration of bike trips for each starting station id and list the results in order of highest average to lowest average for the 10 stations with the highest average.  What is the highest average duration?
    ~~~~

    ====
    assert 0,1 == 40669.5

.. activecode:: sql_bikeshare_agg_ex2
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    What is the bike_number and count of the bike with the most rides?
    ~~~~

    ====
    assert 0,0 == W00893
    assert 0,1 == 1584


.. activecode:: sql_bikeshare_agg_ex3
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    How many total rides by Members and Casual users?
    ~~~~

    ====
    assert 0,0 == Casual
    assert 0,1 == 979814
    assert 1,0 == Member
    assert 0,1 == 246949


.. activecode:: sql_bikeshare_agg_ex4
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    What is the station that has the most rides that start and end at the same station? How many rides started there?
    ~~~~

    ====
    assert 0,0 == 31217
    assert 0,1 == 3135


**Lesson Feedback**

.. poll:: LearningZone_10_3
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_10_3
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_10_3
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_10_3
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...
