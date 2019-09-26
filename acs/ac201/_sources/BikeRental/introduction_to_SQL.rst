.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


Exploring Bike Rental Data with SQL
===================================

.. figure:: https://imgs.xkcd.com/comics/exploits_of_a_mom.png
   :alt: exploits_of_a_mom.png

   exploits_of_a_mom.png


A lot of the data that we interact with today is stored in databases.
For example:

-  Student records, including grades, at a school
-  Posts and friends in your favorite social network
-  News stories on a newspaper's website
-  Your contacts list on your mobile phone
-  All images that make up Google Maps

All these bits of information are stored in various kinds of databases.
Some of these are stored in relational databases that are available as
open source tools like Postgresql, MySQL and SQLite, as well as
commercial databases such as `Google
BigQuery <https://cloud.google.com/bigquery/>`__,
`Oracle <https://www.oracle.com/database/technologies/>`__, `Microsoft
SQL
Server <https://azure.microsoft.com/en-us/services/virtual-machines/sql-server/>`__,
or `Amazon Aurora <https://aws.amazon.com/rds/aurora/>`__.

Others are stored in proprietary systems like Google's
`BigTable <https://en.wikipedia.org/wiki/Bigtable>`__ or Facebook's
`Haystack Object
Store <https://code.fb.com/core-data/needle-in-a-haystack-efficient-storage-of-billions-of-photos/>`__.


Query Language
--------------

Whatever the database might be, there needs to be a way to extract data
from it. Luckily there is a shared language for accessing data from these
relational databases. This language is called SQL (standing for
Structured Query Language, pronounced like "sequel").

Before you stress out about learning a new language, lets take a minute
to review the things you have already learned how to do with Pandas.

-  You can change the shape of a DataFrame by **selecting** the columns
   you want or computing new columns.
-  You can **filter** a DataFrame by using conditions to select just the
   rows you want.
-  You can reorder a DataFrame by **sorting** on one or more columns.
-  You can **group by** one or more columns and compute aggregate
   summaries of other columns in the group.
-  You can **join** two dataframes together using the merge function.

The operations described above comprise a basic set of tools that any
data manipulation language should support, and SQL supports these
operations very well, in a very natural way. You are not going to have
to learn any new concepts in this chapter you are just learning some new
query syntax that will open up whole new worlds of data access for you.
Most businesses store data using a relational database of some kind,
so it follows that a lot of real world data analysis requires you to get
data from one. In this section we will teach you how to get started.


Getting Started with the Bike Data
==================================

In this lesson, we will be hands on and try out SQL with the Capital
bikeshare dataset, hosted on a SQLLite database. To get started you will need to
download `bikeshare.db <../_static/bikeshare.db>`_ and move it to the folder
where you have your notebooks.

There are just two lines we need to execute at the top of our notebook, in order
to be able to query this database. One line loads an extension so that we can
write SQL in the cells of our notebook. The second connects to our SQLLite
database. You may need to install the ``ipython-sql`` module using
``conda install ipython-sql`` or ``conda install -c conda-forge ipython-sql``.


.. code:: python3

    %load_ext sql


Now connect to the bikeshare database.


.. code:: python3

    %sql sqlite:///bikeshare.db


.. parsed-literal::

    'Connected: @bikeshare.db'


Verify access to the dataset
----------------------------

Let's verify that you have access to the dataset by running a simple SQL
query.

The code snippet contains a few lines:

- The first line of that code block is just a magic invocation that lets Jupyter
  know that this cell contains SQL and not Python.
- The second line introduces SQL syntax for the first time.

To help you understand the SQL commands we are using, the SQL syntax words are
listed in CAPITAL letters, the lowercase words are the names of tables or
columns. The SQL statement translates to: get (``SELECT``) all the values
(``*`` is a shorthand for "all" in SQL) in the table called ``trip_data``, but
only show me the first ten rows (``LIMIT 10``).


.. code:: python3

    %%sql
    SELECT
      *
    FROM
      trip_data
    LIMIT 10


.. parsed-literal::

     * sqlite:///bikeshare.db
    Done.


.. raw:: html

    <table>
        <tr>
            <th>index</th>
            <th>duration</th>
            <th>start_date</th>
            <th>end_date</th>
            <th>start_station</th>
            <th>end_station</th>
            <th>bike_number</th>
            <th>member_type</th>
        </tr>
        <tr>
            <td>0</td>
            <td>3548</td>
            <td>2011-01-01 00:01:29.000000</td>
            <td>2011-01-01 01:00:37.000000</td>
            <td>31620</td>
            <td>31620</td>
            <td>W00247</td>
            <td>Member</td>
        </tr>
        <tr>
            <td>1</td>
            <td>346</td>
            <td>2011-01-01 00:02:46.000000</td>
            <td>2011-01-01 00:08:32.000000</td>
            <td>31105</td>
            <td>31101</td>
            <td>W00675</td>
            <td>Casual</td>
        </tr>
        <tr>
            <td>2</td>
            <td>562</td>
            <td>2011-01-01 00:06:13.000000</td>
            <td>2011-01-01 00:15:36.000000</td>
            <td>31400</td>
            <td>31104</td>
            <td>W00357</td>
            <td>Member</td>
        </tr>
        <tr>
            <td>3</td>
            <td>434</td>
            <td>2011-01-01 00:09:21.000000</td>
            <td>2011-01-01 00:16:36.000000</td>
            <td>31111</td>
            <td>31503</td>
            <td>W00970</td>
            <td>Member</td>
        </tr>
        <tr>
            <td>4</td>
            <td>233</td>
            <td>2011-01-01 00:28:26.000000</td>
            <td>2011-01-01 00:32:19.000000</td>
            <td>31104</td>
            <td>31106</td>
            <td>W00346</td>
            <td>Casual</td>
        </tr>
        <tr>
            <td>5</td>
            <td>158</td>
            <td>2011-01-01 00:32:33.000000</td>
            <td>2011-01-01 00:35:11.000000</td>
            <td>31605</td>
            <td>31618</td>
            <td>W01033</td>
            <td>Member</td>
        </tr>
        <tr>
            <td>6</td>
            <td>560</td>
            <td>2011-01-01 00:35:48.000000</td>
            <td>2011-01-01 00:45:09.000000</td>
            <td>31203</td>
            <td>31201</td>
            <td>W00766</td>
            <td>Member</td>
        </tr>
        <tr>
            <td>7</td>
            <td>503</td>
            <td>2011-01-01 00:36:42.000000</td>
            <td>2011-01-01 00:45:05.000000</td>
            <td>31203</td>
            <td>31201</td>
            <td>W00506</td>
            <td>Member</td>
        </tr>
        <tr>
            <td>8</td>
            <td>449</td>
            <td>2011-01-01 00:45:55.000000</td>
            <td>2011-01-01 00:53:24.000000</td>
            <td>31201</td>
            <td>31202</td>
            <td>W00506</td>
            <td>Member</td>
        </tr>
        <tr>
            <td>9</td>
            <td>442</td>
            <td>2011-01-01 00:46:06.000000</td>
            <td>2011-01-01 00:53:28.000000</td>
            <td>31201</td>
            <td>31202</td>
            <td>W00766</td>
            <td>Member</td>
        </tr>
    </table>


The trip_data table is composed of several columns:


.. code-block:: none

   index BIGINT,
   duration BIGINT,
   start_date DATETIME,
   end_date DATETIME,
   start_station BIGINT,
   end_station BIGINT,
   bike_number TEXT,
   member_type TEXT


We don't always want to read all the columns in a table. For example, if
we just want the subscriber type, start time, and duration in minutes
columns we could select just those columns.


.. code:: python3

    %%sql

    SELECT
      member_type,
      start_date,
      duration
    FROM
      trip_data
    LIMIT 10


.. parsed-literal::

     * sqlite:///bikeshare.db
    Done.


.. raw:: html

    <table>
        <tr>
            <th>member_type</th>
            <th>start_date</th>
            <th>duration</th>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-01 00:01:29.000000</td>
            <td>3548</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-01-01 00:02:46.000000</td>
            <td>346</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-01 00:06:13.000000</td>
            <td>562</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-01 00:09:21.000000</td>
            <td>434</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-01-01 00:28:26.000000</td>
            <td>233</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-01 00:32:33.000000</td>
            <td>158</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-01 00:35:48.000000</td>
            <td>560</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-01 00:36:42.000000</td>
            <td>503</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-01 00:45:55.000000</td>
            <td>449</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-01 00:46:06.000000</td>
            <td>442</td>
        </tr>
    </table>


**Tip:** SQL doesn't care about line breaks so we can spread a SQL
query over multiple lines just to make it easier to read.

Its also really easy to forget the exact names of all of the columns in a table,
especially when you are just getting started with a new database. Here's a handy
one-liner that will remind you of the names of your tables and all of their
columns and types.


.. code:: python3

    %%sql

    SELECT
      name,
      sql
    FROM
      sqlite_master


.. raw:: html

    <table border="1" class="dataframe">
    <thead>
        <tr style="text-align: right;">
        <th></th>
        <th>name</th>
        <th>sql</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <th>0</th>
        <td>trip_data</td>
        <td> <pre>
    CREATE TABLE trip_data (
    "index" BIGINT,
    duration BIGINT,
    start_date DATETIME,
    end_date DATETIME,
    start_station BIGINT,
    end_station BIGINT,
    bike_number TEXT,
    member_type TEXT
    )</pre></td>
        </tr>
        <tr>
        <th>1</th>
        <td>bikeshare_stations</td>
        <td><pre>CREATE TABLE bikeshare_stations (
    "index" BIGINT,
    station_id BIGINT,
    name TEXT,
    status TEXT,
    latitude FLOAT,
    longitude FLOAT
    )</pre></td>
        </tr>
    </tbody>
    </table>


Note that this works fine for SQLITE but will not work for Postgresql, MySQL, or
other databases. Each database has their own query for things like this, and
once you get more experience you'll be able to easily find them on the internet.