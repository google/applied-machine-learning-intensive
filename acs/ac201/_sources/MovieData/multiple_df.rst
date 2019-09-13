
..  Copyright (C)  Google, Runestone Interactive LLC
    This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/4.0/.

Dealing with multiple DataFrames
--------------------------------

Forget about budget or runtimes as criteria for selecting a movie, let’s
take a look at popular opinion. Our dataset has two relevant columns:
vote_average and vote_count.

Let’s create a variable called ``df_high_rated`` that only contains
movies that have received more than 20 votes and whose average score is
greater than 8.

.. code:: python3

    df_highly_voted = []
    df_high_rated = []
    df_high_rated[['title', 'vote_average', 'vote_count']]


Here we have some high-quality movies, at least according to some people.


.. fillintheblank:: mov_highly_rated

   How many highly-rated movies are in this dataset?

   - :178: Is the correct answer
     :x: catchall feedback



But what about **my** opinion?

Here are my favorite movies and their relative scores. Create a
DataFrame called ``compare_votes`` that contains the title as an index
and both the vote_average and my_vote as its columns. Also only keep the
movies that are both my favorites and popular favorites.

HINT: You’ll need to create two Series, one for my ratings and one that
maps titles to vote_average.

.. code:: python3

    {
        "Star Wars": 9,
        "Paris is Burning": 8,
        "Dead Poets Society": 7,
        "The Empire Strikes Back": 9.5,
        "The Shining": 8,
        "Return of the Jedi": 8,
        "1941": 8,
        "Forrest Gump": 7.5,
    }
    compare_votes

There should be only 6 movies remaining.

Now add a column to ``compare_votes`` that measures the percentage
difference between my rating and the popular rating for each movie.
You’ll need to take the different between the vote_average and my_vote
and divide it by my_vote.

.. code:: python3

    compare_votes



.. fillintheblank:: mov_star_wars_difference

   What's the percentage difference between my rating for Star Wars and its popular rating?

   - :-0.10: Is the correct answer
     :x: catchall feedback


.. shortanswer:: mov_own_qs

   Make up 3 questions you would like to answer about this movie data using the techniques you have learned in this lesson and write them in the box.


.. shortanswer:: mov_own_qs_answer

   Summarize the answers to your questions here.



**Lesson Feedback**

.. poll:: LearningZone_5_1
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_5_1
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_5_1
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_5_1
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...
