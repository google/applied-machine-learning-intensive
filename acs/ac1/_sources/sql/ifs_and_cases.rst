.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


Ifs and Cases
=============

In SQL, just as in many languages, one of the most basic and useful concepts is
the if/else syntax. :ref:`Just as in Sheets<what_is_a_formula_painters>`, you
can use ``IF`` to return different values based on whether a condition is true.

For example, suppose are interested in counting the number of trips that take
shorter and longer than one hour. The duration column contains the duration in
seconds, so you can use this to create a column that tells you whether the
duration is over one hour (3600 seconds).


.. activecode:: bikeshare_count_trips_above_below_one_hour
   :language: sql
   :dburl: /_static/bikeshare.db

   SELECT
     IF(duration > 3600, TRUE, FALSE) AS is_over_one_hour,
     COUNT(*) AS n_trips
   FROM
     bikeshare_stations
   GROUP BY
     is_over_one_hour


The syntax of the ``IF`` statement is
``IF(condition, value if condition is true, value if condition is false)``. This
should look familar, as it is exactly the same as the syntax for the ``IF``
function in Sheets.

Note the use of the ``TRUE`` and ``FALSE`` keywords, which are also similar to
in Sheets. You do not need to use these specific keywords, you can use any
indicator you like. For example, you could write
``IF(duration > 3600, "over_one_hour", "not_over_one_hour")`` or
``IF(duration > 3600, 1, 0)``. In this case, the column name
``is_over_one_hour`` indicates what this field represents, so it is sufficient
to use the inbuilt keywords ``TRUE`` and ``FALSE``.


.. shortanswer:: bikeshare_name_and_explain_if_query

   Give meaningful names to the columns in the following query and explain what
   question th query is trying to answer.

   .. code-block:: sql

      SELECT
        IF(duration > 0.5 * 3600, TRUE, FALSE) AS column_1,
        SUM(IF(start_station = 31111, 1, 0)) AS column_2
      FROM
        trip_data
      GROUP BY
        column_1


.. shortanswer:: bikeshare_if_start_end_same_station

   Write a query, using ``IF``, to count the number of trips of member type
   *Casual* for trips that start and end at the same station compared to trips
   that start and end at different stations. Hint: Your query should have only
   2 columns in the ``SELECT`` clause and only one ``WHERE`` clause.

SQL also provides an even more versatile set of keywords that allow you to have
as many “ifs” and “elses” as you like. This is done using the ``CASE``
structure. This structure comprises several keywords.

1.  The structure is opened with the ``CASE`` keyword. This tells SQL to start
    looking at each statement and evaluating if it is true or not.
2.  Each new case is identified with the ``WHEN`` keyword, followed by a
    statement. For example, ``WHEN duration > 3600``.
3.  Each case must have a ``THEN`` keyword after the ``WHEN`` statement. If the
    statement after the ``WHEN`` keyword is true, then the field evaluates to
    the value after the ``THEN`` keyword.
4.  If none of the statements after the ``WHEN`` keyword are met, the structure
    will look for an ``ELSE`` keyword. In this case, the field evaluates to
    whatever follows the ``ELSE`` keyword.
5.  The structure is closed with the ``END`` keyword. This indicates there are
    no more ``WHEN`` statements.

This is perhaps best illustrated with an example. The following query counts the
number of trips for different durations. The durations are grouped manually
using the ``CASE`` structure.


.. activecode:: bikeshare_count_trips_by_duration
   :language: sql
   :dburl: /_static/bikeshare.db

   SELECT
     CASE
       WHEN duration < 10 * 60 THEN "under 10 minutes"
       WHEN duration < 30 * 60 THEN "10-30 minutes"
       WHEN duration < 60 * 60 THEN "30-60 minutes"
       WHEN duration < 2 * 60 * 60 THEN "1-2 hours"
       WHEN duration < 4 * 60 * 60 THEN "2-4 hours"
       ELSE "over 4 hours"
     END AS duration_grouped,
     COUNT(*) AS n_trips
   FROM
     bikeshare_stations
   GROUP BY
     duration_grouped


The ``CASE`` structure in the field ``duration_grouped`` checks the statements
after each ``WHEN`` keyword. For the first statement that is met, the field
evaluates to whatever follows the corresponding ``THEN`` keyword. For example,
suppose the duration of a trip is 2468 seconds.

-   The first statement is false. It is not true that ``duration < 10 * 60``.
-   The second statement is false. It is not true that ``duration < 30 * 60``.
-   The third statement is true, since ``duration < 60 * 60``.

As soon as a condition is met, the field is evaluated, so the column
``duration_grouped`` would be ``"30-60 minutes"`` for this trip.


.. shortanswer:: bikeshare_explain_case

   Explain what the following query is returning.

   .. code-block:: sql

      SELECT
        CASE
          WHEN member_type = 'Casual' AND start_station = end_station THEN "casual_same_station"
          WHEN start_station = end_station THEN "member_same_station"
          WHEN member_type = 'Casual' THEN "casual_different_station"
          ELSE "member_different_station"
        END AS ride_classification,
        AVG(IF(duration > 3600, 1, 0)) AS proportion_trips_over_one_hour
      FROM
        trip_data
      WHERE
        member_type IN ('Casual', 'Member')
      GROUP BY
        ride_classification