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

.. code:: python3

    %%sql

    SELECT
      *
    FROM
      bikeshare_stations
    LIMIT
      10



.. parsed-literal::

     * sqlite:///bikeshare.db
    Done.




.. raw:: html

    <div style="max-width: 600px; overflow: scroll;">
    <table>
        <tr>
            <th>index</th>
            <th>station_id</th>
            <th>name</th>
            <th>status</th>
            <th>latitude</th>
            <th>longitude</th>
        </tr>
        <tr>
            <td>0</td>
            <td>31620</td>
            <td>5th &amp; F St NW</td>
            <td>open</td>
            <td>38.8976372907417</td>
            <td>-77.0181261878149</td>
        </tr>
        <tr>
            <td>1</td>
            <td>31105</td>
            <td>14th &amp; Harvard St NW</td>
            <td>open</td>
            <td>38.9266377729228</td>
            <td>-77.0321262099169</td>
        </tr>
        <tr>
            <td>2</td>
            <td>31400</td>
            <td>Georgia &amp; New Hampshire Ave NW</td>
            <td>closed</td>
            <td>38.9356379239833</td>
            <td>-77.0241261968097</td>
        </tr>
        <tr>
            <td>3</td>
            <td>31111</td>
            <td>10th &amp; U St NW</td>
            <td>open</td>
            <td>38.9176376162918</td>
            <td>-77.0251261993328</td>
        </tr>
        <tr>
            <td>4</td>
            <td>31104</td>
            <td>Adams Mill &amp; Columbia Rd NW</td>
            <td>open</td>
            <td>38.9226377090252</td>
            <td>-77.0421262266777</td>
        </tr>
        <tr>
            <td>5</td>
            <td>31605</td>
            <td>3rd &amp; D St SE</td>
            <td>open</td>
            <td>38.8856370929868</td>
            <td>-77.0021126160281</td>
        </tr>
        <tr>
            <td>6</td>
            <td>31203</td>
            <td>14th &amp; Rhode Island Ave NW</td>
            <td>open</td>
            <td>38.9086374822707</td>
            <td>-77.0311262091468</td>
        </tr>
        <tr>
            <td>8</td>
            <td>31201</td>
            <td>15th &amp; P St NW</td>
            <td>open</td>
            <td>38.909637497344</td>
            <td>-77.0341262134231</td>
        </tr>
        <tr>
            <td>10</td>
            <td>31300</td>
            <td>Van Ness Metro / UDC</td>
            <td>open</td>
            <td>38.9438591003638</td>
            <td>-77.0633468627126</td>
        </tr>
        <tr>
            <td>12</td>
            <td>31007</td>
            <td>Crystal City Metro / 18th &amp; Bell St</td>
            <td>open</td>
            <td>38.8903694152637</td>
            <td>-77.0319595336126</td>
        </tr>
    </table>
    </div>


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

.. code:: python3

    %%sql

    SELECT
      *
    FROM
      trip_data, bikeshare_stations

    LIMIT
      10



.. parsed-literal::

     * sqlite:///bikeshare.db
    Done.




.. raw:: html

    <div style="max-width: 600px; overflow: scroll;">
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
            <th>index_1</th>
            <th>station_id</th>
            <th>name</th>
            <th>status</th>
            <th>latitude</th>
            <th>longitude</th>
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
            <td>0</td>
            <td>31620</td>
            <td>5th &amp; F St NW</td>
            <td>open</td>
            <td>38.8976372907417</td>
            <td>-77.0181261878149</td>
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
            <td>1</td>
            <td>31105</td>
            <td>14th &amp; Harvard St NW</td>
            <td>open</td>
            <td>38.9266377729228</td>
            <td>-77.0321262099169</td>
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
            <td>2</td>
            <td>31400</td>
            <td>Georgia &amp; New Hampshire Ave NW</td>
            <td>closed</td>
            <td>38.9356379239833</td>
            <td>-77.0241261968097</td>
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
            <td>3</td>
            <td>31111</td>
            <td>10th &amp; U St NW</td>
            <td>open</td>
            <td>38.9176376162918</td>
            <td>-77.0251261993328</td>
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
            <td>4</td>
            <td>31104</td>
            <td>Adams Mill &amp; Columbia Rd NW</td>
            <td>open</td>
            <td>38.9226377090252</td>
            <td>-77.0421262266777</td>
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
            <td>5</td>
            <td>31605</td>
            <td>3rd &amp; D St SE</td>
            <td>open</td>
            <td>38.8856370929868</td>
            <td>-77.0021126160281</td>
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
            <td>6</td>
            <td>31203</td>
            <td>14th &amp; Rhode Island Ave NW</td>
            <td>open</td>
            <td>38.9086374822707</td>
            <td>-77.0311262091468</td>
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
            <td>8</td>
            <td>31201</td>
            <td>15th &amp; P St NW</td>
            <td>open</td>
            <td>38.909637497344</td>
            <td>-77.0341262134231</td>
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
            <td>10</td>
            <td>31300</td>
            <td>Van Ness Metro / UDC</td>
            <td>open</td>
            <td>38.9438591003638</td>
            <td>-77.0633468627126</td>
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
            <td>12</td>
            <td>31007</td>
            <td>Crystal City Metro / 18th &amp; Bell St</td>
            <td>open</td>
            <td>38.8903694152637</td>
            <td>-77.0319595336126</td>
        </tr>
    </table>
    </div>


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

.. code:: python3

    %%sql

    SELECT
      *
    FROM
      trip_data, bikeshare_stations
    WHERE
      start_station = station_id
    LIMIT
      10



.. parsed-literal::

     * sqlite:///bikeshare.db
    Done.




.. raw:: html

    <div style="max-width: 600px; overflow: scroll;">
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
            <th>index_1</th>
            <th>station_id</th>
            <th>name</th>
            <th>status</th>
            <th>latitude</th>
            <th>longitude</th>
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
            <td>0</td>
            <td>31620</td>
            <td>5th &amp; F St NW</td>
            <td>open</td>
            <td>38.8976372907417</td>
            <td>-77.0181261878149</td>
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
            <td>1</td>
            <td>31105</td>
            <td>14th &amp; Harvard St NW</td>
            <td>open</td>
            <td>38.9266377729228</td>
            <td>-77.0321262099169</td>
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
            <td>2</td>
            <td>31400</td>
            <td>Georgia &amp; New Hampshire Ave NW</td>
            <td>closed</td>
            <td>38.9356379239833</td>
            <td>-77.0241261968097</td>
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
            <td>3</td>
            <td>31111</td>
            <td>10th &amp; U St NW</td>
            <td>open</td>
            <td>38.9176376162918</td>
            <td>-77.0251261993328</td>
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
            <td>4</td>
            <td>31104</td>
            <td>Adams Mill &amp; Columbia Rd NW</td>
            <td>open</td>
            <td>38.9226377090252</td>
            <td>-77.0421262266777</td>
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
            <td>5</td>
            <td>31605</td>
            <td>3rd &amp; D St SE</td>
            <td>open</td>
            <td>38.8856370929868</td>
            <td>-77.0021126160281</td>
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
            <td>6</td>
            <td>31203</td>
            <td>14th &amp; Rhode Island Ave NW</td>
            <td>open</td>
            <td>38.9086374822707</td>
            <td>-77.0311262091468</td>
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
            <td>6</td>
            <td>31203</td>
            <td>14th &amp; Rhode Island Ave NW</td>
            <td>open</td>
            <td>38.9086374822707</td>
            <td>-77.0311262091468</td>
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
            <td>8</td>
            <td>31201</td>
            <td>15th &amp; P St NW</td>
            <td>open</td>
            <td>38.909637497344</td>
            <td>-77.0341262134231</td>
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
            <td>8</td>
            <td>31201</td>
            <td>15th &amp; P St NW</td>
            <td>open</td>
            <td>38.909637497344</td>
            <td>-77.0341262134231</td>
        </tr>
    </table>
    </div>


Notice that the result looks more sensical: we end up with one row from
``trip_data`` and the corresponding row from ``bikeshare_stations``
(copied multiple times since there were only 144 rows in
``bikeshare_stations``).

We can check the size of the resulting table by running:

.. code:: python3

    %%sql

    SELECT
      COUNT(*)
    FROM
      trip_data, bikeshare_stations
    WHERE
      start_station = station_id



.. parsed-literal::

     * sqlite:///bikeshare.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>COUNT(*)</th>
        </tr>
        <tr>
            <td>1226767</td>
        </tr>
    </table>



You might also see some cases where the comma between the table names is
replaced with the keyword ``JOIN`` and ``WHERE`` is replaced with
``ON``. This is synonymous but sometimes preferred to make it clear that
you are joining two tables and that your filters are there to specify
how those tables are to be joined:

.. code:: python3

    %%sql

    SELECT
      COUNT(*)
    FROM
      trip_data JOIN bikeshare_stations ON start_station = station_id



.. parsed-literal::

     * sqlite:///bikeshare.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>COUNT(*)</th>
        </tr>
        <tr>
            <td>1226767</td>
        </tr>
    </table>



We can now use all the SQL tools that we’ve learned on this combined
table. For example, to find out which **open** bike station which has
the highest bike trip counts so we can ensure there is always plenty of
bikes available, we can run:

.. code:: python3

    %%sql

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



.. parsed-literal::

     * sqlite:///bikeshare.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>station_id</th>
            <th>trip_count</th>
        </tr>
        <tr>
            <td>31217</td>
            <td>4114</td>
        </tr>
        <tr>
            <td>31219</td>
            <td>2677</td>
        </tr>
        <tr>
            <td>31235</td>
            <td>2669</td>
        </tr>
        <tr>
            <td>31200</td>
            <td>2572</td>
        </tr>
        <tr>
            <td>31225</td>
            <td>2093</td>
        </tr>
        <tr>
            <td>31222</td>
            <td>1969</td>
        </tr>
        <tr>
            <td>31215</td>
            <td>1786</td>
        </tr>
        <tr>
            <td>31228</td>
            <td>1572</td>
        </tr>
        <tr>
            <td>31218</td>
            <td>1488</td>
        </tr>
        <tr>
            <td>31232</td>
            <td>1378</td>
        </tr>
    </table>



Practice Exercises
------------------

.. fillintheblank:: sql_join_0

   Use ``JOIN`` to show the station IDs of active stations and what’s the average duration of bike trip originating and ending at the same station with member type Member.  For station 31000 what is the average duration from above?

   - :1005: Is the correct answer
     :incorrect: Is feedback on a specific incorrect
     :x: catchall feedback

.. reveal:: bikes_join1
    :instructoronly:

    .. code:: python3

        %%sql

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


    .. raw:: html

        <table>
            <tr>
                <th>station_id</th>
                <th>AVG(duration)</th>
            </tr>
            <tr>
                <td>31000</td>
                <td>1005.0</td>
            </tr>
            <tr>
                <td>31001</td>
                <td>1422.8181818181818</td>
            </tr>
            <tr>
                <td>31002</td>
                <td>2217.6341463414633</td>
            </tr>
            <tr>
                <td>31003</td>
                <td>2102.5241379310346</td>
            </tr>
            <tr>
                <td>31004</td>
                <td>1435.7014925373135</td>
            </tr>
            <tr>
                <td>31005</td>
                <td>1457.952380952381</td>
            </tr>
            <tr>
                <td>31006</td>
                <td>1244.3434343434344</td>
            </tr>
            <tr>
                <td>31007</td>
                <td>1751.5882352941176</td>
            </tr>
            <tr>
                <td>31009</td>
                <td>1037.3444444444444</td>
            </tr>
            <tr>
                <td>31010</td>
                <td>1470.4208333333333</td>
            </tr>
        </table>


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

.. fillintheblank:: sql_join_1

   What is the name of the station where the most rides start?

   - :Massachusetts Ave & Dupont Circle NW: Is the correct answer
     :11th & M St NW: Has the fewest rides
     :x: incorrect

.. fillintheblank:: sql_join_2

   What is the name of the station where the most rides end?

   - :Massachusetts Ave & Dupont Circle NW: Is the correct answer - That must be a very busy station!
     :Anacostia Ave & Benning Rd NE / River Terrace: Is feedback on a specific incorrect
     :x: catchall feedback


.. fillintheblank:: sql_join_3

   What is the name of the station where most rides both start and end?

   - :USDA / 12th & Independence Ave SW: Is the correct answer
     :Massachusetts Ave & Dupont Circle NW: In order to be counted, rides must start and end at the same station
     :x: catchall feedback

.. fillintheblank:: sql_join_4

   What is the name of the most popular ending station for rides that begin at Massachusetts Ave & Dupont Circle NW?

   - :15th & P St NW: Is the correct answer
     :Massachusetts Ave & Dupont Circle NW: Rides do not have to start and end here.
     :x: catchall feedback

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
