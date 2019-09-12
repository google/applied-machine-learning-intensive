.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


Selecting
=========

This chapter explains the SQL functionality primarily via an example. The
Capital Bike Sharing dataset, hosted on a SQLLite database contains information
on Washington D.C.’s bikeshare program for 2011.

Suppose the table is named ``trip_data``. The following SQL query is a basic
example of how to view the top 10 rows of the table. The nice thing about SQL is
that it looks a lot like English. SQL keywords are generally written using all
upper case, while column names and table names use lower case.


.. activecode:: bikeshare_select_top_10
   :language: sql
   :dburl: /_static/bikeshare.db

   SELECT
     *
   FROM
     trip_data
   LIMIT
     10


While the indentation might look a bit weird, the aim of the query should be
plain to see. This query is using SQL to ask the database to ``SELECT`` all
columns (``*`` is a shorthand denoting “all columns”) ``FROM`` the table named
``trip_data``, but to ``LIMIT`` the output to the first 10 rows.

Note that SQL does not notice line breaks, so SQL queries are usually spread
across multiple lines for ease of readability.

This query allows you to read the column names and 10 example rows of data. From
this, you can see all of the columns in the table.


.. TODO(https://github.com/RunestoneInteractive/RunestoneComponents/issues/917):
   Fix the table heading alignment.

=============  ======================================
Field Name     Description
=============  ======================================
index          Unique identifier of the trip
duration       Duration of the trip in seconds
start_date     Start time of the trip
end_date       End time of the trip
start_station  Unique identifier of the start station
end_station    Unique identifier of the end station
bike_number    Unique identifier of the bike used
member_type    The type of membership of the rider
=============  ======================================

In general, it might not make sense to display all the columns in a table. This
is especially true if your table has a large amount of columns. SQL allows you
to select whichever columns you want. For example, if you just want to see the
``member_type``, ``start_date``, and ``duration`` columns, the query would look
as below.


.. activecode:: bikeshare_select_columns
   :language: sql
   :dburl: /_static/bikeshare.db

   SELECT
     member_type,
     start_date,
     duration
   FROM
     trip_data
   LIMIT
     10


If you just want to see the number of rows in your dataset, you can use
``COUNT(*)``. Note the ``AS`` keyword is used to name the column that counts
the number of rows as ``n_rows``. In general, whenever you select a column that
is not one of the existing columns of the table, you should use ``AS`` to name
it as something informative.


.. activecode:: bikeshare_count_star
   :language: sql
   :dburl: /_static/bikeshare.db

   SELECT
     COUNT(*) AS n_rows
   FROM
     trip_data


.. shortanswer:: bikeshare_select_start_and_end_stations

   Write a query to select the start and end stations for all trips.