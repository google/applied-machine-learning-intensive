Sorting
=======

So far, we’ve only looked at rows of data in the order of the query is
returning to us. What if we want to see the rows in a certain sorting
order? We use the ``ORDER BY`` command to sort them by some other
criteria.

For example, to see the bike trips in the order of the duration in
seconds:

.. code:: python3

    %%sql

    SELECT
      member_type, start_date, duration
    FROM
      trip_data
    ORDER BY
      duration
    LIMIT
      10



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
            <td>2011-01-08 12:28:59.000000</td>
            <td>60</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-10 19:46:08.000000</td>
            <td>60</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-17 03:59:57.000000</td>
            <td>60</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-26 12:03:06.000000</td>
            <td>60</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-29 14:01:28.000000</td>
            <td>60</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-02-04 22:01:04.000000</td>
            <td>60</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-02-23 09:23:36.000000</td>
            <td>60</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-02-25 14:02:05.000000</td>
            <td>60</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-02-27 14:03:44.000000</td>
            <td>60</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-03-21 21:47:30.000000</td>
            <td>60</td>
        </tr>
    </table>



Well, it turns out by default the sorting order is **ascending**. To
sort the rows in **descending** order, add the keyword ``DESC``.

.. code:: python3

    %%sql

    SELECT
      member_type, start_date, duration
    FROM
      trip_data
    ORDER BY
      duration DESC
    LIMIT
      10



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
            <td>2011-06-09 19:18:26.000000</td>
            <td>86355</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-04-29 10:37:47.000000</td>
            <td>86337</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-11-16 18:32:05.000000</td>
            <td>86336</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-05-14 10:12:06.000000</td>
            <td>86187</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-07-07 11:34:45.000000</td>
            <td>85679</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-06-05 23:40:33.000000</td>
            <td>85674</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-06-05 23:40:53.000000</td>
            <td>85666</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-10-08 14:22:29.000000</td>
            <td>85657</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-28 10:15:55.000000</td>
            <td>85518</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-07-02 14:38:06.000000</td>
            <td>85505</td>
        </tr>
    </table>



Of course, we can mix ``WHERE`` and ``ORDER BY``, to get only the bike
trips from Member type of Casual in the order of the duration.

.. code:: python3

    %%sql

    SELECT
      member_type, start_date, duration
    FROM
      trip_data
    WHERE
      member_type = "Casual"
    ORDER BY
      duration
    LIMIT
      10



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
            <td>2011-12-28 09:47:29.000000</td>
            <td>61</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-03-05 15:48:04.000000</td>
            <td>62</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-07-29 04:08:15.000000</td>
            <td>62</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-08-29 12:39:15.000000</td>
            <td>64</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-09-01 10:40:15.000000</td>
            <td>65</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-10-28 02:30:20.000000</td>
            <td>70</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-12-18 16:15:28.000000</td>
            <td>71</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-09-03 23:51:53.000000</td>
            <td>72</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-02-14 12:52:52.000000</td>
            <td>73</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-08-29 13:58:16.000000</td>
            <td>73</td>
        </tr>
    </table>



Practice Exercises
------------------

.. fillintheblank:: sql_sort_0

   Get the start and end station IDs for bike trips that are longer 60 minutes or longer, in the order of largest number of seconds first and display the top 40 results.  What is the duration of the last ride |blank| what is the ending station?

   - :84190: Is the correct answer
     :86355: Is the longest - make sure you are using the DESC keyword to reverse your sort
     :x: Keep on trying

   - :31018: Is the correct answer
     :31611: Should be from the first row. Make sure you are sorting in the right order.
     :x: Keep on querying



.. reveal:: bikes_sort
    :instructoronly:

    .. code:: python3

        %%sql

        SELECT
        duration, start_station, end_station
        FROM
        trip_data
        WHERE
        duration >= 3600
        ORDER BY
        duration DESC
        LIMIT
        40


    .. raw:: html

        <table>
            <tr>
                <th>duration</th>
                <th>start_station</th>
                <th>end_station</th>
            </tr>
            <tr>
                <td>86355</td>
                <td>31232</td>
                <td>31611</td>
            </tr>
            <tr>
                <td>86337</td>
                <td>31221</td>
                <td>31221</td>
            </tr>
            <tr>
                <td>86336</td>
                <td>31400</td>
                <td>31206</td>
            </tr>
            <tr>
                <td>86187</td>
                <td>31705</td>
                <td>31705</td>
            </tr>
            <tr>
                <td>85679</td>
                <td>31104</td>
                <td>31107</td>
            </tr>
            <tr>
                <td>85674</td>
                <td>31617</td>
                <td>31617</td>
            </tr>
            <tr>
                <td>85666</td>
                <td>31617</td>
                <td>31617</td>
            </tr>
            <tr>
                <td>85657</td>
                <td>31238</td>
                <td>31230</td>
            </tr>
            <tr>
                <td>85518</td>
                <td>31200</td>
                <td>31226</td>
            </tr>
            <tr>
                <td>85505</td>
                <td>31200</td>
                <td>31200</td>
            </tr>
            <tr>
                <td>85504</td>
                <td>31200</td>
                <td>31200</td>
            </tr>
            <tr>
                <td>85484</td>
                <td>31102</td>
                <td>31223</td>
            </tr>
            <tr>
                <td>85425</td>
                <td>31605</td>
                <td>31605</td>
            </tr>
            <tr>
                <td>85322</td>
                <td>31303</td>
                <td>31303</td>
            </tr>
            <tr>
                <td>85318</td>
                <td>31200</td>
                <td>31213</td>
            </tr>
            <tr>
                <td>85311</td>
                <td>31232</td>
                <td>31400</td>
            </tr>
            <tr>
                <td>85213</td>
                <td>31107</td>
                <td>31107</td>
            </tr>
            <tr>
                <td>85194</td>
                <td>31223</td>
                <td>31010</td>
            </tr>
            <tr>
                <td>85178</td>
                <td>31108</td>
                <td>31108</td>
            </tr>
            <tr>
                <td>85168</td>
                <td>31217</td>
                <td>31217</td>
            </tr>
            <tr>
                <td>85131</td>
                <td>31238</td>
                <td>31217</td>
            </tr>
            <tr>
                <td>85102</td>
                <td>31238</td>
                <td>31217</td>
            </tr>
            <tr>
                <td>85072</td>
                <td>31613</td>
                <td>31607</td>
            </tr>
            <tr>
                <td>85020</td>
                <td>31600</td>
                <td>31201</td>
            </tr>
            <tr>
                <td>84988</td>
                <td>31613</td>
                <td>31607</td>
            </tr>
            <tr>
                <td>84962</td>
                <td>31229</td>
                <td>31213</td>
            </tr>
            <tr>
                <td>84958</td>
                <td>31228</td>
                <td>31227</td>
            </tr>
            <tr>
                <td>84849</td>
                <td>31205</td>
                <td>31205</td>
            </tr>
            <tr>
                <td>84841</td>
                <td>31619</td>
                <td>31617</td>
            </tr>
            <tr>
                <td>84812</td>
                <td>31108</td>
                <td>31262</td>
            </tr>
            <tr>
                <td>84614</td>
                <td>31302</td>
                <td>31302</td>
            </tr>
            <tr>
                <td>84589</td>
                <td>31607</td>
                <td>31605</td>
            </tr>
            <tr>
                <td>84417</td>
                <td>31801</td>
                <td>31801</td>
            </tr>
            <tr>
                <td>84315</td>
                <td>31603</td>
                <td>31602</td>
            </tr>
            <tr>
                <td>84306</td>
                <td>31223</td>
                <td>31223</td>
            </tr>
            <tr>
                <td>84298</td>
                <td>31109</td>
                <td>31109</td>
            </tr>
            <tr>
                <td>84249</td>
                <td>31108</td>
                <td>31108</td>
            </tr>
            <tr>
                <td>84219</td>
                <td>31108</td>
                <td>31108</td>
            </tr>
            <tr>
                <td>84204</td>
                <td>31014</td>
                <td>31014</td>
            </tr>
            <tr>
                <td>84190</td>
                <td>31112</td>
                <td>31018</td>
            </tr>
        </table>

    2.  ``select bike_number, duration from trip_data order by duration desc limit 1;``

    3. ``select start_station, duration from trip_data where start_station = end_station order by duration desc limit 1;``

.. fillintheblank:: sql_sort_1

   On which bike was longest bike ride? |blank| How many seconds long was that ride?

   - :W00379: Is the correct answer
     :W00470: Is the bike for the shortest
     :x: Its easiest if you use the DESC keyword on your sort

   - :86355: Is the correct answer
     :60: Is the shortest ride
     :x: Ride lengths are in seconds, you can sort on that field.

.. fillintheblank:: sql_sort_2

   What is the duration |blank| and starting station |blank| of the longest ride starting and ending at the same station?

   - :86337: Is the correct answer
     :60: Is the shortest
     :x: You can compare two columns in the where clause just using their names

   - :31221: Is the correct answer
     :31201: Is for the shortest ride
     :x: Incorrect


**Lesson Feedback**

.. poll:: LearningZone_10_2
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_10_2
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_10_2
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_10_2
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...

