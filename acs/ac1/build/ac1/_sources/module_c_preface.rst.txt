.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


Module C Preface
================

A lot of the data that we interact with today is stored in databases. You can
think of a database as a group of tables. These tables have rows and columns
just like spreadsheets.Below are a few examples.

-   Student records, including grades, at a school
-   Posts and friends in your favorite social network
-   News stories on a newspaper’s website
-   Your contacts list on your mobile phone
-   All images that make up Google Maps

All these bits of information are stored in various kinds of databases. Some of
these are stored in relational databases that are available as open source tools
like Postgresql, MySQL and SQLite, as well as commercial databases such as
`Google BigQuery`_, `Oracle`_, `Microsoft SQL Server`_, or `Amazon Aurora`_.
Others are stored in proprietary systems like Google’s `BigTable`_ or Facebook’s
`Haystack Object Store`_.

While the mechanism and content of the database may vary, luckily there is a
common language used to extract data: this language is called Structured Query
Language (SQL, pronounced “sequel”).


.. _Google BigQuery: https://cloud.google.com/bigquery/
.. _Oracle: https://www.oracle.com/database/technologies/
.. _Microsoft SQL Server: https://azure.microsoft.com/en-us/services/virtual-machines/sql-server/
.. _Amazon Aurora: https://aws.amazon.com/rds/aurora/
.. _BigTable: https://en.wikipedia.org/wiki/Bigtable
.. _Haystack Object Store: https://code.fb.com/core-data/needle-in-a-haystack-efficient-storage-of-billions-of-photos/