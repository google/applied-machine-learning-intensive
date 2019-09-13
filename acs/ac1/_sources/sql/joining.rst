.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


Joining
=======

It is frequently the case that the data we need is spread across multiple tables
in a database. For example, along with the ``trip_data`` table you have already
seen with data on each trip, there might be a table storing additional
information the locations of the start and end stations, called
``bikeshare_stations``.


.. TODO(https://github.com/RunestoneInteractive/RunestoneComponents/issues/917):
   Fix the table heading alignment.

==========  =================================================
Field Name  Description
==========  =================================================
station_id  Unique identifier of the station
name        Public name of the station
status      Status of the station (either 'open' or 'closed')
latitude    latitude of the station
longitude   longitude of the station
==========  =================================================


.. activecode:: bikeshare_rows_from_stations_table
   :language: sql
   :dburl: /_static/bikeshare.db

   SELECT
     *
   FROM
     bikeshare_stations
   LIMIT
     10


.. TODO(raskutti): Link to Module B section on joining.

In Sheets, when you need to join data across multipl spreadsheets, you use
``VLOOKUP``. In SQL, you use the ``JOIN`` keyword. ``JOIN`` is used to join
multiple tables on a common column. You specify the common column on which you
wish to join using the ``ON`` keyword.

Suppose you want to find the number of bikeshare trips that originated at the
*Van Ness Metro / UDC* station. You can join the ``start_station`` field from
the ``trip_data`` table to the ``station_id`` field in the
``bikeshare_stations`` table.


.. activecode:: bikeshare_trips_from_van_ness_metro_udc
   :language: sql
   :dburl: /_static/bikeshare.db

   SELECT
     COUNT(*) AS n_trips
   FROM
     trip_data AS trips
   INNER JOIN
     bikeshare_stations AS stations
   ON
     trips.start_station = stations.station_id
   WHERE
     stations.name = 'Van Ness Metro / UDC'


There is a lot of new material to unpack in this query.

-   Both tables are aliased using the ``AS`` keyword. (The ``trip_data`` table
    is named ``trips`` and the ``bikeshare_stations`` table is named
    ``stations``.) Whenever you use ``JOIN``, it is good practice to alias all
    tables used in the join. That way, columns can always be according to which
    table they appear in.
-   An ``INNER JOIN`` returns only rows for which the join key appears in both
    tables. For example, if a row in the ``trips`` table has station 12345 as
    the ``start_station`` but it does not appear as a ``station_id`` in the
    ``stations`` table, this row will not be returned. The converse is also
    true. `You can read more about other types of joins here.`_
-   The ``ON`` clause uses the table names to reference the columns. SQL looks
    for rows in the ``stations`` table where the ``station_id`` matches each of
    the ``start_station`` values in the ``trips`` table.
-   The ``WHERE`` clause limits the query to count rows where the start station
    is *Van Ness Metro / UDC*. Note that the table alias ``trips`` is used here
    again to reference the column.


.. shortanswer:: bikeshare_explain_join

   What question is the following query answering?

   .. code-block:: sql

      SELECT
        trips.start_station,
        AVG(duration) AS mean_duration
      FROM
        trips_data AS trips
      INNER JOIN
        bikeshare_stations AS stations
      ON
        trips.start_station = stations.station_id
      WHERE
        stations.status = 'closed'


.. fillintheblank:: bikeshare_number_of_trips_from_adams_mill_columbia

   How many trips were started at *Adams Mill & Columbia Rd NW*?

   - :29(,|)964: Correct
     :x: Incorrect


.. shortanswer:: bikeshare_mean_duration_by_station_name

   Write a query to display the mean duration of trip for each start station
   name. For example, one row could read as ``White House Station | 12345``.


.. fillintheblank:: bikeshare_start_station_name_with_most_trips_by_casual

   Which station has the most trips by riders with member type as casual?
   (Print your answer as it appears in the table.)

   - :Massachusetts Ave & Dupont Circle NW: Correct
     :x: Incorrect


.. shortanswer:: bikeshare_open_vs_closed_stations

   Write a query to compare, in terms of number of trips and mean duration,
   stations that are listed as open and closed.


Extension: Subqueries
---------------------

It is sometimes the case that you can’t accomplish everything you want to within
one query. In these cases, in the same way that you can wrap one Sheets function
within another, you can wrap one query within another. The inner query is often
referred to as a subquery.

One use case for a subquery is within the ``WHERE`` clause. This can be used
instead of joining, and can often be more efficient. For example, the following
query calculates the mean duration of trips that start at an open station.


.. activecode:: bikeshare_subquery_mean_duration_open_stations
   :language: sql
   :dburl: /_static/bikeshare.db

   SELECT
     COUNT(*) AS n_trips
   FROM
     trip_data
   WHERE
     start_station IN (
       SELECT
         station_id
       FROM
         bikeshare_stations
       WHERE
         status = 'open'
     )


This could equivalently be done by joining the ``trips`` table to the
``stations`` tabl on ``trips.start_station = stations.station_id``, then
filtering on ``WHERE stations.status = 'open'``. However, this involves joining
every row of both tables. While using the subquery means having two distinct
``SELECT`` steps, each step involves less data, since each ``WHERE`` clauses
filters each table down to much fewer rows.

Another common use case for subqueries involves aggregating functions. For
example, suppose you want to calculate the percentage of trips that start at
each station. While you can calculate the number of trips that start at each
start station in a single query, and the the total number of trips in a single
query, it is complex to calculate both in a single ``SELECT`` statement.
However, using a subquery can simply and logically accomplish this.


.. activecode:: bikeshare_subquery_proportion_trips_per_start_station
   :language: sql
   :dburl: /_static/bikeshare.db

   SELECT
     start_station,
     100.0 * n_trips / (SELECT COUNT(*) FROM trip_data) AS percentage_trips
   FROM (
     SELECT
       start_station,
       COUNT(*) AS n_trips
     FROM
       trip_data
     GROUP BY
       start_station
     )


The above query contains three ``SELECT`` statements. The “inner query” counts
the number of trips for each start station. There is also a one-line subquery
that sums the total number of trips. The “outer query” combines the two
subqueries to calculate the percentage of total trips that start at each start
station.


.. _You can read more about other types of joins here.: http://www.sql-join.com/sql-join-types