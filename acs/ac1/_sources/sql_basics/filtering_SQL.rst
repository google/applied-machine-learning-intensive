..  This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/4.0/.

Filtering
=========

We’ve seen how to look only at certain columns of the table but it is
often useful to only look at certain rows in a table. For example, we
could want to look only at the bike trips which are at least a certain
number of minutes. Let’s say you’re only interested in bike trips of 60
minutes or more:

.. activecode:: sql_bikeshare_filter_1
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    SELECT
      member_type, start_date, duration
    FROM
      trip_data
    WHERE
      duration >= 3600
    LIMIT
      10





It’s also possible to filter by multiple criteria. For example to look
at only bike trips which are 60 minutes or more and only the subscriber
type of Member:

.. activecode:: sql_bikeshare_filter_2
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    SELECT
      member_type, start_date, duration
    FROM
      trip_data
    WHERE
      duration >= 3600
    AND
      member_type = "Member"
    LIMIT
      10






Practice Exercises
------------------

.. reveal:: bikes_ex1
    :instructoronly:

    .. activecode:: sql_bikeshare_filter_sol1
        :language: sql
        :dburl: /runestone/books/published/httlads/_static/bikeshare.db

        select * from trip_data where bike_number = 'W01274' and duration < 900


    Question 2

    .. code:: sql

        select end_station, duration
        from trip_data
        where start_station = 31111 and duration > 8 * 60 * 60


    Question 3

    .. code:: sql

        select count(*)
        from trip_data
        where start_station = 31111 and duration > 8 * 60 * 60 and  end_station = 31111

.. activecode:: sql_bikeshare_filter_ex1
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    Figure out how to get all the trips on the bike with id of ``W01274``
    and only include rides which are shorter than 15 minutes.
    ~~~~

    ====
    assert 0,1 == 828
    assert 1,1 == 594
    assert 12,1 == 669


.. activecode:: sql_bikeshare_filter_ex2
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    Get the ending station and the duration of all of the bike trips originating at station ``31111`` that lasted 8 hours or more.
    ~~~~


    ====
    assert 20,0 == 31100
    assert 20,1 == 40733
    assert 0,0 == 31202
    assert 0,1 == 45722

.. original q was how many correct answer is 21 How many trips match the criteria above?

.. activecode:: sql_bikeshare_filter_ex3
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    How many trips longer than 8 hours started and ended and station 31111 by casual riders?
    ~~~~

    ====
    assert 0,0 == 4



**Lesson Feedback**

.. poll:: LearningZone_10_1
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_10_1
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_10_1
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_10_1
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...

