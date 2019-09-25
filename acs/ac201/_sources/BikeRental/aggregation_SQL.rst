.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


Aggregation or Group By
=======================

One very powerful feature of SQL is that it allows us to create summary
information by grouping rows together. For example, we could ask
ourselves how many bike trips were taken for each subscriber type, and
which subscriber type has the most bike trips.


.. code:: python3

    %%sql
    SELECT
      member_type,
      COUNT(*)
    FROM
      trip_data
    GROUP BY
      member_type
    ORDER BY
      COUNT(*) DESC
    LIMIT
      10


.. parsed-literal::

     * sqlite:///bikeshare.db
    Done.


.. raw:: html

    <table>
        <tr>
            <th>member_type</th>
            <th>COUNT(*)</th>
        </tr>
        <tr>
            <td>Member</td>
            <td>979814</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>246949</td>
        </tr>
        <tr>
            <td>Unknown</td>
            <td>4</td>
        </tr>
    </table>


``GROUP BY member_type`` takes all the rows with a given
member_type and produces a single row in the result. This means that
we need to tell SQL how we want to combine the other columns’ values
into a single row. The above example uses ``COUNT(*)``, which reports the number
of rows that were combined.

Aggregating the values for ``member_type`` is not hard, since
they’re all the same; SQL just gives us a single copy of the publisher
name. As for the other columns, we need to either ignore them (causing them to
be omitted from the output) or specify a way to aggregate them.

We must specify an aggregate function for any column that we ``SELECT``
in our query (except the columns that we’re grouping by) in order for the
command to run. If we don’t specify a way to aggregate these columns, most
database servers will complain. However, SQLITE does not. SQLite lets you do
error-prone things without giving you an error. For example, the following query
will work, but you have no idea what the results actually mean.


.. code:: python3

    %%sql

    SELECT
      duration,
      COUNT(*)
    FROM
      trip_data
    GROUP BY
      member_type
    ORDER BY
      COUNT(*) DESC


.. raw:: html

    <table border="1" class="dataframe">
    <thead>
        <tr style="text-align: right;">
        <th></th>
        <th>duration</th>
        <th>COUNT(*)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <th>0</th>
        <td>3548</td>
        <td>979814</td>
        </tr>
        <tr>
        <th>1</th>
        <td>346</td>
        <td>246949</td>
        </tr>
        <tr>
        <th>2</th>
        <td>501</td>
        <td>4</td>
        </tr>
    </tbody>
    </table>


Here you have grouped by ``member_type``, but without ``member_type`` in the
``SELECT`` clause, you have no idea which rows correspond to which member type.
That is why most databases will flag this as an error. Furthermore, the
duration field may be the first duration in the group, the last duration in the
group, or possibly in between; it is not defined. The best practices for writing
``GROUP BY`` queries are as follows.

* Always include the ``GROUP BY`` column(s) in your SELECT clause.
* If you include a column that is **not** in the ``GROUP BY`` clause in your
  ``SELECT`` clause, it must be in an aggregating function, for example ``MIN``,
  ``MAX``, ``MEAN``, ``COUNT``, etc.

Let’s return briefly to the first query in this section. The
top result was the count of bike trips for member_type ``Member``.

=========== ========
member_type COUNT(*)
=========== ========
Member      979814
=========== ========

If you’d like to get a more granular break down of the count, you can
specify multiple columns to aggregate within the ``GROUP BY`` clause,
for example you can group by the member type and the start station.


.. code:: python3

    %%sql

    SELECT
      member_type,
      start_station,
      COUNT(*)
    FROM
      trip_data
    WHERE
      member_type = 'Casual'
    GROUP BY
      member_type,
      start_station
    ORDER BY
      COUNT(*) DESC
    LIMIT
      20


.. parsed-literal::

     * sqlite:///bikeshare.db
    Done.


.. raw:: html

    <table>
        <tr>
            <th>member_type</th>
            <th>start_station</th>
            <th>COUNT(*)</th>
        </tr>
        <tr>
            <td>Casual</td>
            <td>31200</td>
            <td>10922</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>31217</td>
            <td>10912</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>31235</td>
            <td>9829</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>31219</td>
            <td>8736</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>31225</td>
            <td>7180</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>31228</td>
            <td>6111</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>31222</td>
            <td>5943</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>31215</td>
            <td>5224</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>31201</td>
            <td>4991</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>31218</td>
            <td>4960</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>31237</td>
            <td>4906</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>31232</td>
            <td>4905</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>31623</td>
            <td>4853</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>31205</td>
            <td>4751</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>31613</td>
            <td>4162</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>31212</td>
            <td>4029</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>31238</td>
            <td>3920</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>31104</td>
            <td>3908</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>31203</td>
            <td>3772</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>31204</td>
            <td>3675</td>
        </tr>
    </table>


Now that you’re familiar with how to aggregate data using SQL
query by using ``COUNT()`` as your aggregation function, let’s take a
look at other aggregation functions.

There are `many such
functions <https://www.postgresql.org/docs/9.5/functions-aggregate.html>`__.
Some common ones include:

-  ``SUM``: To add the values together
-  ``AVG``: To compute the mean of the values
-  ``MIN`` or ``MAX``: To compute the minimum and maximum respectively

So we could, for example, compute the **total** number of minutes of all
bike trips for all subscriber types.


.. code:: python3

    %%sql

    SELECT
      member_type,
      SUM(duration)
    FROM
      trip_data
    GROUP BY
      member_type
    LIMIT
      10


.. parsed-literal::

     * sqlite:///bikeshare.db
    Done.


.. raw:: html

    <table>
        <tr>
            <th>member_type</th>
            <th>SUM(duration)</th>
        </tr>
        <tr>
            <td>Casual</td>
            <td>687530197</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>759503541</td>
        </tr>
        <tr>
            <td>Unknown</td>
            <td>3434</td>
        </tr>
    </table>


Practice Exercises
------------------

.. fillintheblank:: sql_agg_0

   Compute the average duration of bike trips for each starting station id and
   list the results in order of highest average to lowest average for the 10
   stations with the highest average. What is the highest average duration?

   - :40669.5: Is the correct answer
     :2368.5.*: Is the 10th largest
     :x: Keep trying


.. reveal:: bikes_agg
    :instructoronly:


    .. code:: python3

        %%sql

        SELECT
          start_station,
          AVG(duration)
        FROM
          trip_data
        GROUP BY
          start_station
        ORDER BY
          AVG(duration) DESC
        LIMIT
          10


    .. raw:: html

        <table>
            <tr>
                <th>start_station</th>
                <th>AVG(duration)</th>
            </tr>
            <tr>
                <td>31806</td>
                <td>40669.5</td>
            </tr>
            <tr>
                <td>31052</td>
                <td>4325.0</td>
            </tr>
            <tr>
                <td>31705</td>
                <td>3787.787878787879</td>
            </tr>
            <tr>
                <td>31262</td>
                <td>3563.8636363636365</td>
            </tr>
            <tr>
                <td>31704</td>
                <td>3550.0</td>
            </tr>
            <tr>
                <td>31703</td>
                <td>3134.6492146596856</td>
            </tr>
            <tr>
                <td>31266</td>
                <td>2906.0</td>
            </tr>
            <tr>
                <td>31217</td>
                <td>2431.043944420405</td>
            </tr>
            <tr>
                <td>31016</td>
                <td>2414.4292185730465</td>
            </tr>
            <tr>
                <td>31235</td>
                <td>2368.5348916450866</td>
            </tr>
        </table>

    2. ``SELECT bike_number, COUNT(*) FROM trip_data GROUP BY bike_number ORDER BY COUNT(*) DESC```

    3. ``SELECT member_type, COUNT(*) FROM trip_data GROUP BY member_type;``

    4. ``SELECT start_station, COUNT(*) FROM trip_data WHERE start_station = end_station GROUP BY start_station ORDER BY COUNT(*) DESC``


.. fillintheblank:: sql_agg_1

   What is the bike_number |blank| and count |blank| of the bike with the most
   rides?

   - :W00893: Is the correct answer
     :W01189: Is the fewest
     :x: incorrect

   - :1584: Is the correct answer
     :1: Is the fewest number of rides
     :x: incorrect


.. fillintheblank:: sql_agg_2

   How many total rides by Members |blank| and Casual users |blank|?

   - :979814: Is the correct answer
     :246949: You have the numbers reversed...
     :x: incorrect

   - :246949: Is correct!
     :979814: You have your numbers backward
     :x: incorrect


.. fillintheblank:: sql_agg_3

   What is the station that has the most rides that start and end at the same
   station? |blank| How many rides started there? |blank|

   - :31217: Is the correct answer
     :31200: Is in second
     :x: incorrect

   - :3135: Is the correct answer
     :1: Is the fewest number of rides
     :x: Incorrect


**Lesson Feedback**

.. poll:: LearningZone_10_3
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_10_3
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_10_3
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_10_3
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...
