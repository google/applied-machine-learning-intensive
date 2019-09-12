.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


Aggregating
===========

Sheets provides aggregating/grouping functionality via pivot tables, which you
have :ref:`already seen previously<grouping_data>`. Again, SQL provides the same
functionality as Sheets through keywords. In this case, the ``GROUP BY``
statement allows you to group and aggregate data. For example, you can use
``GROUP BY`` to count how many bike trips were taken for each subscriber type,
or to calculate the mean duration for trips starting from each station.

The following query counts the number of trips (``COUNT(*)``) for each member
type (``GROUP BY member_type``).


.. activecode:: bikeshare_count_trips_per_member_type
   :language: sql
   :dburl: /_static/bikeshare.db

   SELECT
     member_type,
     COUNT(*) AS n_trips
   FROM
     trip_data
   GROUP BY
     member_type


The result of this query has one rows for each distinct ``member_type``, and the
column named ``n_trips`` counts the number of rows for each type.

Whenever you use ``GROUP BY``, SQL expects you to use an aggregating function.
This is equivalent to which function is used to summarize data in a Sheets pivot
table. The most common examples are listed below.

-   ``COUNT`` counts the rows
-   ``SUM`` adds the values of a numeric column
-   ``MIN`` calculates the minimum of a numeric column
-   ``MAX`` calculates the maximum of a numeric column
-   ``AVG`` calculates the mean of a numeric column
-   ``MEDIAN`` calculates the median of a numeric column (only available in some
    SQL servers)


For example, the query below calculates the minimum and maximum trip duration
for each start station.

.. activecode:: bikeshare_min_and_max_trip_duration_by_start_station
   :language: sql
   :dburl: /_static/bikeshare.db

   SELECT
     start_station,
     MIN(duration) AS minimum_duration,
     MAX(duration) AS maximum_duration
   FROM
     trip_data
   GROUP BY
     start_station


.. shortanswer:: bikeshare_station_with_earliest_start_date

   Write a query to find start station with the earliest start date.


You must include the ``GROUP BY`` column(s) in your ``SELECT`` clause. All
columns that are not in the ``GROUP BY`` clause must contain an aggreating
function.

If you want to calculate a summary statistic for the entire population, you can
use an aggregating function without the ``GROUP BY`` clause. For example, the
query below calculates the mean duration of all trips.


.. activecode:: bikeshare_average_duration
   :language: sql
   :dburl: /_static/bikeshare.db

   SELECT
     AVG(duration) AS mean_duration
   FROM
     trip_data


You can of course use filtering and ordering with aggregating functions. The
query below calculates the mean trip duration just for trips with a casual
member type.


.. activecode:: bikeshare_mean_duration_for_casual_member_type
   :language: sql
   :dburl: /_static/bikeshare.db

   SELECT
     AVG(duration)
   FROM
     trip_data
   WHERE
     member_type = 'Casual'


.. fillintheblank:: bikeshare_first_trip_from_station_31111

   What is the total duration of all trips taken on bike W01274?

   - :9318: Correct
     :x: Incorrect


You can then combine this with the ``GROUP BY`` clause as you like. Filtering
with the ``GROUP BY`` clause can serve multiple purposes. Either way, you must
put the ``WHERE`` clause before the ``GROUP BY`` clause.

If you filter by a column that is not grouped by, you can filter the aggregated
results to a subset of the data. For example, you can calculate the sum of all
trip durations, by start station, for a specific end station.


.. activecode:: bikeshare_filter_and_group_by_different_columns
   :language: sql
   :dburl: /_static/bikeshare.db

   SELECT
     start_station,
     SUM(duration) AS total_duration
   FROM
     trip_data
   WHERE
     end_station = 31111
   GROUP BY
     start_station


If you filter by a column that is being grouped by, you can filter the
aggregated results to just show the row you are interested in. For example, you
can display the total trip duration for each pair of start station and end
station, just for trips that end at station 31111.


.. activecode:: bikeshare_filter_and_group_by_same_column
   :language: sql
   :dburl: /_static/bikeshare.db

   SELECT
     start_station,
     end_station,
     SUM(duration) AS total_duration
   FROM
     trip_data
   WHERE
     end_station = 31111
   GROUP BY
     start_station,
     end_station


.. shortanswer:: bikeshare_debug_group_by_query

   Find and fix the error(s) in the following code, which is trying to calculate
   the mean trip duration for trips by member type casual.

   .. code-block:: sql

      SELECT
        AVG(duration)
      FROM
        trip_data
      GROUP BY
        member_type


It can also be useful to combine aggregating functions with the ``ORDER BY``
clause. This can allow you to sort by an aggretated column to find the minimum
or maximum.


.. shortanswer:: bikeshare_explain_group_by_query

   Explain what the following query will return.

   .. code-block:: sql

      SELECT
        start_station,
        AVG(duration) AS mean_duration
      FROM
        trip_data
      WHERE
        duration >= 3600
      GROUP BY
        start_station
      ORDER BY
        AVG(duration) DESC


Note that you can also use the column alias in the ``ORDER BY`` clause. The
above query would have been identical (in almost all SQL servers) if it had been
``ORDER BY mean_duration DESC``.


.. fillintheblank:: bikeshare_bike_with_most_trips

   How many trips did the bike number with the most trips complete?

   - :1(,|)226(,|)767: Correct
     :x: Incorrect


.. fillintheblank:: bikeshare_mean_duration_trips_with_same_start_and_end

   For the station with the most trips that started and ended at the same
   station, find the mean duration (in seconds) of all trips, rounded to the
   nearest whole number.

   - :4(,|)160: Correct
     :x: Incorrect


Extension: Counting Unique Values
---------------------------------

It is often helpful to not only count the number of rows, but count the number
of unique values of a column. You can do this using the ``DISTINCT`` keyword.

To count the distinct values of a column, you can simply use ``COUNT`` along
with ``DISTINCT``. For example, the query below counts the number of bike
numbers used.


.. activecode:: bikeshare_count_distinct_bikes
   :language: sql
   :dburl: /_static/bikeshare.db

   SELECT
     COUNT(DISTINCT bike_number) AS n_distinct_bikes
   FROM
     trip_data


This can also be used alongside to count the unique values for each group. For
example, the following query counts the unique bike numbers used for each start
station.


.. activecode:: bikeshare_count_distinct_bikes_by_start_station
   :language: sql
   :dburl: /_static/bikeshare.db

   SELECT
     start_station,
     COUNT(DISTINCT bike_number) AS n_distinct_bikes
   FROM
     trip_data
   GROUP BY
     start_station


.. fillintheblank:: bikeshare_number_of_start_stations

   How many unique start stations are in the table?

   - :144: Correct
     :x: Incorrect


.. shortanswer:: bikeshare_unique_end_stations_per_start_station

   Write a query to display the number of unique end stations per each start
   station.


It is sometimes also useful to select the distinct rows of a table. You can do
that by using ``DISTINCT`` without an aggregating function.


.. activecode:: bikeshare_select_distinct_bikes
   :language: sql
   :dburl: /_static/bikeshare.db

   SELECT
     DISTINCT bike_number
   FROM
     trip_data


Note that selecting distinct values is exactly equivalent to selecting grouped
values.


.. activecode:: bikeshare_distinct_bike_using_group_by
   :language: sql
   :dburl: /_static/bikeshare.db

   SELECT
     bike_number
   FROM
     trip_data
   GROUP BY
     bike_number


Extension: The HAVING Clause
----------------------------

You can never include an aggregating function within the ``WHERE`` clause. For
example, suppose you are trying to show all start stations and the number of
trips, but only for start stations with over 100 trips. The following query
produces an error, since the ``WHERE`` condition includes the ``COUNT``
function.


.. activecode:: bikeshare_where_with_aggregation
   :language: sql
   :dburl: /_static/bikeshare.db

   SELECT
     start_station,
     COUNT(*) AS n_trips
   FROM
     trip_data
   WHERE
     COUNT(*) > 100
   GROUP BY
     start_station


The ``HAVING`` clause can be used instead here. The query below executes
successfully.


.. activecode:: bikeshare_having_over_100_trips
   :language: sql
   :dburl: /_static/bikeshare.db

   SELECT
     start_station,
     COUNT(*) AS n_trips
   FROM
     trip_data
   GROUP BY
     start_station
   HAVING
     COUNT(*) > 100


As with the ``ORDER BY`` clause, ``HAVING`` is an operation on the results.
While ``WHERE`` filters the data being queries, ``HAVING`` filters the results
based on the value of an aggregating function. The ``HAVING`` clause can only be
used immediately following the ``GROUP BY`` clause.


.. shortanswer:: bikeshare_bikes_having_over_1_hour

   Write a query to show the bikes have been used for over 1 hour (3600
   seconds), and the total duration they have been ridden.


Extension: Numbered Column Aliases
----------------------------------

This section covers no new concepts, but introduces a conventient shorthand
notation. When using ``GROUP BY`` and ``ORDER BY``, you can often (this is
supported in almost all SQL servers, but not all) reference columns using the
number in which they are selected. For example, the following two queries are
identical, listing member types by descending number of trips.

The first query uses the column names in the ``GROUP BY`` and ``ORDER BY``.


.. code-block:: sql

   SELECT
     member_type,
     COUNT(*) AS n_trips
   FROM
     trip_data
   GROUP BY
     member_type
   ORDER BY
     n_trips DESC


The second query uses the column number in the ``GROUP BY`` and ``ORDER BY``.


.. code-block:: sql

   SELECT
     member_type,
     COUNT(*) AS n_trips
   FROM
     trip_data
   GROUP BY
     1
   ORDER BY
     2 DESC


Note that ``1`` refers to the first column being selected, ``member_type``, and
``2`` refers to the second column being selected, ``n_trips``.

You can always use the column names in these clauses, but the numbered aliasing
can be extremely useful, especially if you have several columns. Note that you
can use this notation only with the ``GROUP BY`` and ``ORDER BY`` clauses. Using
such notation anywhere else will produce an error.


.. shortanswer:: bikeshare_explain_numbered_aliases

   Explain what question the following query is answering.

   .. code-block:: sql

      SELECT
        start_station,
        end_station,
        AVG(duration) AS mean_duration
      FROM
        trip_data
      GROUP BY
        1, 2
      ORDER BY
        3 DESC