
..  Copyright (C)  Google, Runestone Interactive LLC
    This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/4.0/.


Working with Text
-----------------

The Series and index objects in Pandas each have a set of string processing methods that make all of the standard Python string methods and more available to work on all of the string elements in a Series. We call these "vectorized string methods" because Pandas is designed to allow these operations to happen in parallel on all the rows of the data frame simultaneously, if you have the computing power. These are accessed through an intermediate object called `str`  For example suppose we wanted to convert all of our three letter country codes to lowercase.

.. code:: python3

    undf.country.str.lower()

Will do the job and is over 700 times faster than using a for loop.

Here is a complete list of the string functions that the str object knows.  Most of them should be very familiar to you.

* ``len()``
* ``lower()``
* ``translate()`` -- This one is a bit complicated `see here <https://www.tutorialspoint.com/python/string_translate.htm>`_
* ``islower()``
* ``ljust()``
* ``upper()``
* ``startswith()``
* ``isupper()``
* ``rjust()``
* ``find()``
* ``endswith()``
* ``isnumeric()``
* ``center()``
* ``rfind()``
* ``isalnum()``
* ``isdecimal()``
* ``zfill()`` -- add leading zeros to strings
* ``index()``
* ``isalpha()``
* ``split()``
* ``strip()``
* ``rindex()``
* ``isdigit()``
* ``rsplit()``
* ``rstrip()``
* ``capitalize()``
* ``isspace()``
* ``partition()`` - split each string into 3 parts the string before the separator, the separator, the string after the separator.  This returns a data frame with three columns.  For example if your string is "peter, paul, and mary" then partitioning it on and would return ['peter, paul', 'and', 'mary']
* ``lstrip()``
* ``swapcase()``
* ``istitle()``
* ``rpartition()``  -- same as partition, but looks for the separator from right to left instead of left to right.


.. fillintheblank:: fb_un_count1

   How many rows from the united nations data set have a country code that starts with 'M'

   - :663: Is the correct answer
     :18: Is the number of unique countries
     :x: You should use the startswith method on the series of country codes.

.. fillintheblank:: fb_un_count2

   How many **country codes** from the united nations data set have a country code that starts with M

   - :18: Is the correct answer
     :663: Is the number of rows
     :x: You remember that Pandas as a ``unique`` method that removes duplicates from a series.


Regular expression methods for strings

* ``match()`` -- returns True/False if the string matches
* ``extract()``
* ``extractall()``
* ``findall()``
* ``replace()``
* ``contains()``
* ``count()``
* ``split()``
* ``rsplit()``

.. fillintheblank:: fn_un_extract1

   What is the most common word that follows 'global' |blank| in all of the speeches and how many times does that word occur?


   - :economic: Is the correct answer
     :negotiations: Is the most common follower at the beginning of a speech. You need to capture all occurrences using ``extractall``
     :warming: nice guess, but not there
     :economy: Good, and the correct answer is very similar.
     :x: catchall feedback

   - :1033: Is the correct answer
     :256: make sure you use ``extractall``

We can use our new skills to do a minor bit of cleanup on the text.  Many of the speeches start with an invisible non-breaking space character followed by a newline (you will see it as `\n` in the text.  We can eliminate this with:

.. code:: python3

    undf['text'] = undf.text.str.replace('\ufeff','') # remove strange character
    undf['text'] = undf.text.str.strip() # eliminate whitespace from beginning and end



Research Questions
------------------

1.  What is the average word count per speech?
2.  How does that average compare across all of the countries?
3.  What is the average sentence length per speech?

4.  Find or create a list of topics that the UN might discuss and debate
    make a graph to show how often these topics were mentioned.  For example, 'peace', 'nuclear war', 'terrorism', 'moon landing', You think of your own!

5.  The five permanent members of the UN security council are
    sec_council = [‘USA’, ‘RUS’, ‘GBR’, ‘FRA’, ‘CHN’] Make a graph of the frequency of topics and how often they are discussed by those countries.  You could do this same exercise with any group of countries.  Maybe the central European, or North African, etc.

6. Make a graph to show the frequency with which various topics are
    discussed over the years. for example, peace is consistently a
    popular word as is freedom and human rights. what about HIV or
    terrorism or global warming. Compare two phrases like ‘global
    warming’ and ‘climate change’

7. When did the internet become a popular topic?

Text Complexity
---------------

For years people have been trying to find measures of text complexity.  Sometimes to determine what 'reading level' an article is at, or how much formal education is required to understand an piece of writing.   These measures are often functions of things such as the number of sentences in a paragraph, sentence length, word length, number of polysyllabic words used, etc.

There are several Python packages that automatically compute the complexity for you so you don't have to write that part yourself.  One easy to use package is called `textatistic <http://www.erinhengel.com/software/textatistic/>`_.  It calculates several different common measures of text complexity.

8.  Using the Gunning Fog, or smog index compute the reading complexity for each
    speech
9.  Is there any correlation between the Fog index for a country and
    the GDP or literacy rate?
10.  Make a graph showing the distribution of each of the above measures


**Lesson Feedback**

.. poll:: LearningZone_8_4
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_8_4
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_8_4
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_8_4
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...
