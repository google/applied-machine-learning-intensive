..  This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/4.0/.

Exploring Bike Rental Data with SQL
===================================

.. figure:: https://imgs.xkcd.com/comics/exploits_of_a_mom.png
   :alt: exploits_of_a_mom.png

   exploits_of_a_mom.png

A lot of the data that we interact with today is stored in databases.
For example:

-  Student records, including grades, at a school
-  Posts and friends in your favorite social network
-  News stories on a newspaper’s website
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
or `Amazon Aurora <https://aws.amazon.com/rds/aurora/>`__

Others are stored in proprietary systems like Google’s
`BigTable <https://en.wikipedia.org/wiki/Bigtable>`__ or Facebook’s
`Haystack Object
Store <https://code.fb.com/core-data/needle-in-a-haystack-efficient-storage-of-billions-of-photos/>`__.

Query Language
--------------

Whatever the database might, there needs to be a way to extract data
from it and a lot of these systems have agreed on a shared language for
accessing data. For relational database, this language is called SQL
(Structured Query Language, pronounced like “sequel”).

Before you stress out about learning a new language, lets take a minute
and review the things you have already learned how to do with Pandas.

-  You can change the shape of a DataFrame by **selecting** the columns
   you want or computing new columns.
-  You can filter a DataFrame by using conditions to **select** just the
   rows you want.
-  You can reorder a DataFrame by **sorting** on one or more columns.
-  You can **group by** one or more columns and compute aggregate
   summaries of other columns in the group.
-  You can **join** two dataframes together using the merge function.

The operations just described comprise a basic set of tools that any
data manipulation language should support, and SQL supports these
operations very well, in a very natural way. You are not going to have
to learn any new concepts in this chapter you are just learning some new
query syntax that will open up whole new worlds of data access for you.
Most businesses run on a relational database of some kind, so it follows
that a lot of real world data analysis requires you to get data from
one. In this section we will teach you how to get started.

Getting Started with the Bike Data
==================================

In this Lesson, we will be hands on and try out SQL with the Capital
bike sharing dataset, hosted on a SQLLite database. You don't have to do anything as we have a full version of the SQLLite database management system running the browser.




Verify access to the dataset
----------------------------

Let’s verify that you have access to the dataset by running a simple SQL
query.

The code snippet contains a few lines: \* The first line of that code
block is just a magic invocation that lets Jupyter know that this cell
contains SQL and not Python. \* The second line introduces SQL syntax
for the first time. To help you understand the SQL commands we are
using, the SQL syntax words are listed in CAPITAL letters, the lowercase
words are the names of tables or columns. The SQL statement translates
to: grab (SELECT) all the values (*) in the table called trip_data but
only show me the first ten (LIMIT 10).

.. activecode:: sql_bikeshare_intro_1
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    SELECT
      *
    FROM
      trip_data
    LIMIT
      10





The trip_data table is composed of several columns:

::

   index BIGINT,
   duration BIGINT,
   start_date DATETIME,
   end_date DATETIME,
   start_station BIGINT,
   end_station BIGINT,
   bike_number TEXT,
   member_type TEXT

We don’t always want to read all the columns in a table. For example, if
we just want the subscriber type, start time, and duration in minutes
columns we could select:

.. activecode:: sql_bikeshare_intro_2
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    SELECT
      member_type, start_date, duration
    FROM
      trip_data
    LIMIT
      10


**Tips:** SQL doesn’t care about line breaks so we can spread a SQL
query over multiple lines just to make it easier to read.


Its also really easy to forget the exact names of all of the columns in a table, especially when you are just getting started with a new database.  Here's a handy one-liner that will remind you of the names of your tables and all of their columns and types:

.. activecode:: sql_bikeshare_intro_3
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    select name, sql from sqlite_master


Note, this works fine for SQLITE but will not work for Postgresql or MySQL or other databases, each database has their own query for things like this, and once you get more experience you'll be able to easily find them on the internet.


