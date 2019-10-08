.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


Filtering
=========

We've seen how to look only at certain columns of the table, but it is
often useful to only look at certain rows in a table. For example, we
might want to look only at the bike trips which are at least a certain
number of minutes. Let's say you're only interested in bike trips of 60
minutes or more:


.. code:: python3

    %%sql

    SELECT
      member_type,
      start_date,
      duration
    FROM
      trip_data
    WHERE
      duration >= 3600
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
            <td>Casual</td>
            <td>2011-01-01 01:48:57.000000</td>
            <td>40181</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-01-01 09:47:33.000000</td>
            <td>5009</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-01-01 09:53:23.000000</td>
            <td>4642</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-01-01 09:53:38.000000</td>
            <td>4645</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-01-01 09:54:06.000000</td>
            <td>4628</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-01-01 10:16:55.000000</td>
            <td>10474</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-01-01 10:20:15.000000</td>
            <td>10279</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-01-01 10:20:42.000000</td>
            <td>10250</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-01-01 10:34:49.000000</td>
            <td>5744</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-01-01 10:37:04.000000</td>
            <td>5611</td>
        </tr>
    </table>


It's also possible to filter by multiple criteria. For example to look
at only bike trips which are 60 minutes or more and only the subscriber
type of Member, you can write the following query.


.. code:: python3

    %%sql

    SELECT
      member_type,
      start_date,
      duration
    FROM
      trip_data
    WHERE
      duration >= 3600 AND
      member_type = "Member"
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
            <td>2011-01-02 11:14:50.000000</td>
            <td>4642</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-02 14:45:35.000000</td>
            <td>7173</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-03 13:37:39.000000</td>
            <td>3989</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-03 15:43:35.000000</td>
            <td>10571</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-03 19:50:54.000000</td>
            <td>7412</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-04 11:41:54.000000</td>
            <td>7288</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-04 13:40:25.000000</td>
            <td>29436</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-04 14:59:35.000000</td>
            <td>7053</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-04 17:29:29.000000</td>
            <td>11325</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-04 18:21:42.000000</td>
            <td>4341</td>
        </tr>
    </table>


Practice Exercises
------------------

.. reveal:: bikes_ex1
    :instructoronly:

    .. code:: sql

        %%sql

        SELECT
          *
        FROM
          trip_data
        WHERE
          bike_number = 'W01274' AND
          duration < 900


    .. parsed-literal::

        * sqlite:///bikeshare.db
        Done.


    .. raw:: html

        <table border="1" class="dataframe">
        <thead>
            <tr style="text-align: right;">
            <th></th>
            <th>index</th>
            <th>duration</th>
            <th>start_date</th>
            <th>end_date</th>
            <th>start_station</th>
            <th>end_station</th>
            <th>bike_number</th>
            <th>member_type</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <th>0</th>
            <td>1206675</td>
            <td>828</td>
            <td>2011-12-21 19:12:38.000000</td>
            <td>2011-12-21 19:26:26.000000</td>
            <td>31216</td>
            <td>31101</td>
            <td>W01274</td>
            <td>Member</td>
            </tr>
            <tr>
            <th>1</th>
            <td>1207802</td>
            <td>594</td>
            <td>2011-12-22 08:39:06.000000</td>
            <td>2011-12-22 08:49:00.000000</td>
            <td>31101</td>
            <td>31246</td>
            <td>W01274</td>
            <td>Member</td>
            </tr>
            <tr>
            <th>2</th>
            <td>1208703</td>
            <td>707</td>
            <td>2011-12-22 13:21:50.000000</td>
            <td>2011-12-22 13:33:38.000000</td>
            <td>31624</td>
            <td>31209</td>
            <td>W01274</td>
            <td>Member</td>
            </tr>
            <tr>
            <th>3</th>
            <td>1217513</td>
            <td>387</td>
            <td>2011-12-28 12:23:41.000000</td>
            <td>2011-12-28 12:30:09.000000</td>
            <td>31209</td>
            <td>31108</td>
            <td>W01274</td>
            <td>Member</td>
            </tr>
            <tr>
            <th>4</th>
            <td>1217776</td>
            <td>782</td>
            <td>2011-12-28 14:09:18.000000</td>
            <td>2011-12-28 14:22:20.000000</td>
            <td>31108</td>
            <td>31619</td>
            <td>W01274</td>
            <td>Member</td>
            </tr>
            <tr>
            <th>5</th>
            <td>1218022</td>
            <td>389</td>
            <td>2011-12-28 16:12:29.000000</td>
            <td>2011-12-28 16:18:58.000000</td>
            <td>31619</td>
            <td>31623</td>
            <td>W01274</td>
            <td>Member</td>
            </tr>
            <tr>
            <th>6</th>
            <td>1218218</td>
            <td>303</td>
            <td>2011-12-28 17:14:02.000000</td>
            <td>2011-12-28 17:19:05.000000</td>
            <td>31623</td>
            <td>31618</td>
            <td>W01274</td>
            <td>Member</td>
            </tr>
            <tr>
            <th>7</th>
            <td>1218755</td>
            <td>287</td>
            <td>2011-12-28 20:19:32.000000</td>
            <td>2011-12-28 20:24:20.000000</td>
            <td>31105</td>
            <td>31202</td>
            <td>W01274</td>
            <td>Member</td>
            </tr>
            <tr>
            <th>8</th>
            <td>1219211</td>
            <td>833</td>
            <td>2011-12-29 08:25:47.000000</td>
            <td>2011-12-29 08:39:41.000000</td>
            <td>31202</td>
            <td>31220</td>
            <td>W01274</td>
            <td>Member</td>
            </tr>
            <tr>
            <th>9</th>
            <td>1223563</td>
            <td>430</td>
            <td>2011-12-30 17:29:05.000000</td>
            <td>2011-12-30 17:36:15.000000</td>
            <td>31401</td>
            <td>31107</td>
            <td>W01274</td>
            <td>Member</td>
            </tr>
            <tr>
            <th>10</th>
            <td>1224505</td>
            <td>223</td>
            <td>2011-12-31 08:51:24.000000</td>
            <td>2011-12-31 08:55:08.000000</td>
            <td>31107</td>
            <td>31602</td>
            <td>W01274</td>
            <td>Member</td>
            </tr>
            <tr>
            <th>11</th>
            <td>1224651</td>
            <td>422</td>
            <td>2011-12-31 10:25:15.000000</td>
            <td>2011-12-31 10:32:18.000000</td>
            <td>31602</td>
            <td>31104</td>
            <td>W01274</td>
            <td>Member</td>
            </tr>
            <tr>
            <th>12</th>
            <td>1224701</td>
            <td>669</td>
            <td>2011-12-31 10:46:31.000000</td>
            <td>2011-12-31 10:57:40.000000</td>
            <td>31104</td>
            <td>31246</td>
            <td>W01274</td>
            <td>Member</td>
            </tr>
        </tbody>
        </table>

    Question 2

    .. code:: sql

        SELECT
          end_station,
          duration
        FROM
          trip_data
        WHERE
          start_station = 31111 AND
          duration > 8 * 60 * 60


    Question 3

    .. code:: sql

        SELECT
          COUNT(*)
        FROM
          trip_data
        WHERE
          start_station = 31111 AND
          duration > 8 * 60 * 60 AND
          end_station = 31111



    Figure out how to get all the trips on the bike with id of ``W01274``
    and only include rides which are shorter than 15 minutes.


    .. fillintheblank:: sql_ex1

        What is the longest of the rides you just selected? |blank|

        - :833: Is the correct answer
          :828: Is close, but it is the second longest
          :x: Keep trying


    .. fillintheblank:: sql_trips_31111

        Get the ending station and the duration of all of the bike trips
        originating at station ``31111`` that lasted 8 hours or more. How many
        trips match the criteria above?

        - :21: Is the correct answer
          :20|22: Close, but count again
          :x: Incorrect 8 hours is 28,800 seconds


    .. fillintheblank:: sql_trips_return

        How many trips longer than 8 hours started and ended and station
        ``31111`` by casual riders?

        - :4: Is the correct answer
          :5: Is the total for both members and casual riders
          :x: catchall feedback


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