..  This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/4.0/.

Joining
=======

It is frequently the case that the data we need is spread across
multiple tables in our database. For example, we might want to store
additional information about the starting and ending location of the
ride beside their IDs in a table called ``bikeshare_stations``.

Here’s the columns in table ``bikeshare_stations``

========== ======= ============================================
Field name Type    Description
========== ======= ============================================
station_id INTEGER Unique identifier of a station.
name       STRING  Public name of the station.
status     STRING  Status of the station, either open or closed
latitude   FLOAT   latitude of the station
longitude  FLOAT   longitude of the station
========== ======= ============================================

.. activecode:: sql_bikeshare_join_1
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db


    SELECT
      *
    FROM
      bikeshare_stations
    LIMIT
      10




This means that we now have the data to answer questions like “How many
bike trips originated from bike station that’s at Van Ness Metro / UDC?”
but the data are spread across two tables?

We could imagine storing the ``name`` column in our ``trip_data`` table
since we list the start and end stations IDs for each trip but there are
a few important reasons why that’s a bad idea:

1. We would waste space by duplicating data (not a big deal for this
   example but a real concern for large systems)
2. Updating data (for example status of station from active to closed)
   would require updating each row in ``trip_data`` that refers to that
   station ID. This is time-consuming and error-prone.

Instead we leave the data in two separate tables and need a way to
‘join’ the values together. We can do that by just listing multiple
table names but the result is a mess:

.. activecode:: sql_bikeshare_join_2
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    SELECT
      *
    FROM
      trip_data, bikeshare_stations

    LIMIT
      10


If you look carefully you might notice that the rows are identical for
the first few columns and then start to differ after ``duration``.
That’s because SQL joins each row in the first table with each row in
the second table. With 144 rows in ``bikeshare_stations`` and 1,226,767
rows in ``trips_data``, we end up with a table of 176,654,448 rows.

This rarely if ever is what we want. In most cases, we want to match up
some aspect of the rows in the first table with some aspect of the rows
in the second table. In most cases, we want to match up based on some
column being equal.

In our bike sharing example, the ``station_id`` column of
``bikeshare_stations`` matches up with the ``start_station`` or
``end_station`` column of ``trip_data``. To force this match, we filter
out the ones that don’t have the same value for both of these columns:

.. activecode:: sql_bikeshare_join_3
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    SELECT
      *
    FROM
      trip_data, bikeshare_stations
    WHERE
      start_station = station_id
    LIMIT
      10



Notice that the result looks more sensical: we end up with one row from
``trip_data`` and the corresponding row from ``bikeshare_stations``
(copied multiple times since there were only 144 rows in
``bikeshare_stations``).

We can check the size of the resulting table by running:

.. activecode:: sql_bikeshare_join_4
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    SELECT
      COUNT(*)
    FROM
      trip_data, bikeshare_stations
    WHERE
      start_station = station_id



You might also see some cases where the comma between the table names is
replaced with the keyword ``JOIN`` and ``WHERE`` is replaced with
``ON``. This is synonymous but sometimes preferred to make it clear that
you are joining two tables and that your filters are there to specify
how those tables are to be joined:

.. activecode:: sql_bikeshare_join_5
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    SELECT
      COUNT(*)
    FROM
      trip_data JOIN bikeshare_stations ON start_station = station_id


We can now use all the SQL tools that we’ve learned on this combined
table. For example, to find out which **open** bike station which has
the highest bike trip counts so we can ensure there is always plenty of
bikes available, we can run:

.. activecode:: sql_bikeshare_join_6
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    SELECT
      station_id, COUNT(*) AS trip_count
    FROM
      trip_data join bikeshare_stations
    ON
      start_station = station_id
    WHERE
      duration >= 3600
      AND status = 'open'
    GROUP BY
      station_id
    ORDER BY
      trip_count DESC
    LIMIT
      10



Practice Exercises
------------------


.. reveal:: bikes_join1
    :instructoronly:

    .. activecode:: sql_bikeshare_join_sol1
        :language: sql
        :dburl: /runestone/books/published/httlads/_static/bikeshare.db

        SELECT
        station_id, AVG(duration)
        FROM
        trip_data JOIN bikeshare_stations
        ON
        start_station = station_id
        WHERE
        member_type = 'Member'
        AND start_station = end_station
        AND status = 'open'
        GROUP BY
        station_id
        LIMIT
        10


    2. .. code-block:: sql

            select name, count(*)
            from trip_data join bikeshare_stations on
                start_station = station_id
            group by name
            order by count(*) desc
            limit 10

    3. .. code-block:: sql

            select name, count(*)
            from trip_data join bikeshare_stations on end_station = station_id
            group by name
            order by count(*) desc
            limit 10

    4. .. code-block:: sql

            select name, count(*)
            from trip_data join bikeshare_stations on end_station = station_id
            where start_station = end_station
            group by name
            order by count(*) desc
            limit 10

    5. .. code-block:: sql

            select name, count(*)
            from trip_data join bikeshare_stations on end_station = station_id
            where start_station = 31200
            group by name
            order by count(*) desc
            limit 10

.. activecode:: sql_bikeshare_join_ex1
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    Use ``JOIN`` to show the station IDs of active stations and what’s the average duration of bike trip originating and ending at the same station with member type Member.  For station 31000 what is the average duration from above?
    ~~~~

    ====
    assert 0,1 == 1005


.. activecode:: sql_bikeshare_join_ex2
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    What is the name of the station where the most rides start?
    ~~~~

    ====
    assert 0,0 == Massachusetts Ave & Dupont Circle NW


.. activecode:: sql_bikeshare_join_ex3
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    What is the name of the station where the most rides end?
    ~~~~

    ====
    assert 0,0 == Massachusetts Ave & Dupont Circle NW


.. activecode:: sql_bikeshare_join_ex4
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    What is the name of the station where most rides both start and end?
    ~~~~

    ====
    assert 0,0 ==  USDA / 12th & Independence Ave SW



.. activecode:: sql_bikeshare_join_ex5
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    What is the name of the most popular ending station for rides that begin at Massachusetts Ave & Dupont Circle NW?
    ~~~~

    ====
    assert 0,0 == 15th & P St NW


**Lesson Feedback**

.. poll:: LearningZone_10_4
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_10_4
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_10_4
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_10_4
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...
