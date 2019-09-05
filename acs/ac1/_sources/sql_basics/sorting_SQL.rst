Sorting
=======

So far, we’ve only looked at rows of data in the order of the query is
returning to us. What if we want to see the rows in a certain sorting
order? We use the ``ORDER BY`` command to sort them by some other
criteria.

For example, to see the bike trips in the order of the duration in
seconds:

.. activecode:: sql_bikeshare_sorting_1
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    SELECT
      member_type, start_date, duration
    FROM
      trip_data
    ORDER BY
      duration
    LIMIT
      10



Well, it turns out by default the sorting order is **ascending**. To
sort the rows in **descending** order, add the keyword ``DESC``.

.. activecode:: sql_bikeshare_sorting_2
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    SELECT
      member_type, start_date, duration
    FROM
      trip_data
    ORDER BY
      duration DESC
    LIMIT
      10




Of course, we can mix ``WHERE`` and ``ORDER BY``, to get only the bike
trips from Member type of Casual in the order of the duration.

.. activecode:: sql_bikeshare_sorting_3
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    SELECT
      member_type, start_date, duration
    FROM
      trip_data
    WHERE
      member_type = "Casual"
    ORDER BY
      duration
    LIMIT
      10





Practice Exercises
------------------
.. reveal:: bikes_sort
    :instructoronly:

    .. activecode:: sql_bikeshare_sorting_sol1
        :language: sql
        :dburl: /runestone/books/published/httlads/_static/bikeshare.db

        SELECT
        duration, start_station, end_station
        FROM
        trip_data
        WHERE
        duration >= 3600
        ORDER BY
        duration DESC
        LIMIT
        40


    2.  ``select bike_number, duration from trip_data order by duration desc limit 1;``

    3. ``select start_station, duration from trip_data where start_station = end_station order by duration desc limit 1;``

.. activecode:: sql_bikeshare_sorting_ex1
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    Get the start and end station IDs for bike trips that are longer 60 minutes or longer, in the order of largest number of seconds first and display the top 40 results.  What is the duration of the last ride |blank| what is the ending station?
    ~~~~


    ====
    assert 39,0 == 84190
    assert 39,2 == 31018


.. activecode:: sql_bikeshare_sorting_ex2
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    On which bike was longest bike ride? How many seconds long was that ride?
    ~~~~

    ====
    assert 0,0 == W00379
    assert 0,1 == 86355


.. activecode:: sql_bikeshare_sorting_ex3
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    What is the starting station and duration of the longest ride starting and ending at the same station?
    ~~~~

    ====
    assert 0,1 == 86337
    assert 0,0 == 31221


**Lesson Feedback**

.. poll:: LearningZone_10_2
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_10_2
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_10_2
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_10_2
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...

