.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


Merging and Tidying Data
========================

Now that we know how the file is encoded, we can read it easily.


.. code:: python3

   c_codes = pd.read_csv('Data/country_codes.csv', encoding='iso-8859-1')
   c_codes.head()


.. raw:: html

    <div>
    <style scoped>
        .dataframe tbody tr th:only-of-type {
            vertical-align: middle;
        }

        .dataframe tbody tr th {
            vertical-align: top;
        }

        .dataframe thead th {
            text-align: right;
        }
    </style>
    <table border="1" class="dataframe">
      <thead>
        <tr style="text-align: right;">
          <th></th>
          <th>country</th>
          <th>code_2</th>
          <th>code_3</th>
          <th>country_code</th>
          <th>iso_3166_2</th>
          <th>continent</th>
          <th>sub_region</th>
          <th>region_code</th>
          <th>sub_region_code</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>0</th>
          <td>Afghanistan</td>
          <td>AF</td>
          <td>AFG</td>
          <td>4</td>
          <td>ISO 3166-2:AF</td>
          <td>Asia</td>
          <td>Southern Asia</td>
          <td>142.0</td>
          <td>34.0</td>
        </tr>
        <tr>
          <th>1</th>
          <td>Åland Islands</td>
          <td>AX</td>
          <td>ALA</td>
          <td>248</td>
          <td>ISO 3166-2:AX</td>
          <td>Europe</td>
          <td>Northern Europe</td>
          <td>150.0</td>
          <td>154.0</td>
        </tr>
        <tr>
          <th>2</th>
          <td>Albania</td>
          <td>AL</td>
          <td>ALB</td>
          <td>8</td>
          <td>ISO 3166-2:AL</td>
          <td>Europe</td>
          <td>Southern Europe</td>
          <td>150.0</td>
          <td>39.0</td>
        </tr>
        <tr>
          <th>3</th>
          <td>Algeria</td>
          <td>DZ</td>
          <td>DZA</td>
          <td>12</td>
          <td>ISO 3166-2:DZ</td>
          <td>Africa</td>
          <td>Northern Africa</td>
          <td>2.0</td>
          <td>15.0</td>
        </tr>
        <tr>
          <th>4</th>
          <td>American Samoa</td>
          <td>AS</td>
          <td>ASM</td>
          <td>16</td>
          <td>ISO 3166-2:AS</td>
          <td>Oceania</td>
          <td>Polynesia</td>
          <td>9.0</td>
          <td>61.0</td>
        </tr>
      </tbody>
    </table>
    </div>


This DataFrame has a lot of information, and we can add all or just a bit of it
to our United Nations DataFrame using the ``merge`` method of Pandas.

Before we merge, let's clean up the column names on the ``undf`` data frame and
rename ``country`` to ``code_3`` to be consistent with the above.


.. code:: python3

   undf.columns = ['session', 'year', 'code_3', 'text']
   undf.head()


.. raw:: html

    <div>
    <style scoped>
        .dataframe tbody tr th:only-of-type {
            vertical-align: middle;
        }

        .dataframe tbody tr th {
            vertical-align: top;
        }

        .dataframe thead th {
            text-align: right;
        }
    </style>
    <table border="1" class="dataframe">
      <thead>
        <tr style="text-align: right;">
          <th></th>
          <th>session</th>
          <th>year</th>
          <th>code_3</th>
          <th>text</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>0</th>
          <td>44</td>
          <td>1989</td>
          <td>MDV</td>
          <td>﻿It is indeed a pleasure for me and the member...</td>
        </tr>
        <tr>
          <th>1</th>
          <td>44</td>
          <td>1989</td>
          <td>FIN</td>
          <td>﻿\nMay I begin by congratulating you. Sir, on ...</td>
        </tr>
        <tr>
          <th>2</th>
          <td>44</td>
          <td>1989</td>
          <td>NER</td>
          <td>﻿\nMr. President, it is a particular pleasure ...</td>
        </tr>
        <tr>
          <th>3</th>
          <td>44</td>
          <td>1989</td>
          <td>URY</td>
          <td>﻿\nDuring the debate at the fortieth session o...</td>
        </tr>
        <tr>
          <th>4</th>
          <td>44</td>
          <td>1989</td>
          <td>ZWE</td>
          <td>﻿I should like at the outset to express my del...</td>
        </tr>
      </tbody>
    </table>
    </div>


Now, we can merge our two data frames. We will keep all the columns from the
original ``undf`` DataFrame and add country, continent, and subregion from the
``c_codes`` DataFrame. We will merge the two data frames on the ``code_3``
column. That is, for every row in ``undf``, we will look for a row in the
``c_codes`` DataFrame where the values for ``code_3`` match. Pandas will then
add the rest of the columns from the matching row in ``c_codes`` to the current
row in ``undf``.

In the ``c_codes`` data frame, ``code_3`` is the "primary key", as no two rows
have the same value for ``code_3``. In the ``undf`` data frame, ``code_3`` is a
"foreign key", as we use it to lookup additional information in a table where
``code_3`` is a primary key. More on this when we study SQL queries.


.. code:: python3

   undfe = undf.merge(c_codes[['code_3', 'country', 'continent', 'sub_region']])
   undfe.head()


.. raw:: html

    <div>
    <style scoped>
        .dataframe tbody tr th:only-of-type {
            vertical-align: middle;
        }

        .dataframe tbody tr th {
            vertical-align: top;
        }

        .dataframe thead th {
            text-align: right;
        }
    </style>
    <table border="1" class="dataframe">
      <thead>
        <tr style="text-align: right;">
          <th></th>
          <th>session</th>
          <th>year</th>
          <th>code_3</th>
          <th>text</th>
          <th>country</th>
          <th>continent</th>
          <th>sub_region</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>0</th>
          <td>44</td>
          <td>1989</td>
          <td>MDV</td>
          <td>﻿It is indeed a pleasure for me and the member...</td>
          <td>Maldives</td>
          <td>Asia</td>
          <td>Southern Asia</td>
        </tr>
        <tr>
          <th>1</th>
          <td>68</td>
          <td>2013</td>
          <td>MDV</td>
          <td>I wish to begin by \nextending my heartfelt co...</td>
          <td>Maldives</td>
          <td>Asia</td>
          <td>Southern Asia</td>
        </tr>
        <tr>
          <th>2</th>
          <td>63</td>
          <td>2008</td>
          <td>MDV</td>
          <td>I am delivering this \nstatement on behalf of ...</td>
          <td>Maldives</td>
          <td>Asia</td>
          <td>Southern Asia</td>
        </tr>
        <tr>
          <th>3</th>
          <td>46</td>
          <td>1991</td>
          <td>MDV</td>
          <td>﻿Allow me at the outset on behalf of the deleg...</td>
          <td>Maldives</td>
          <td>Asia</td>
          <td>Southern Asia</td>
        </tr>
        <tr>
          <th>4</th>
          <td>41</td>
          <td>1986</td>
          <td>MDV</td>
          <td>It is indeed a pleasure for me and all the mem...</td>
          <td>Maldives</td>
          <td>Asia</td>
          <td>Southern Asia</td>
        </tr>
      </tbody>
    </table>
    </div>


.. code:: python3

   undfe[undf.code_3 == 'EU ']


.. parsed-literal::

   /Users/bradleymiller/.local/share/virtualenvs/httlads--V2x4wK-/lib/python3.6/site-packages/ipykernel_launcher.py:1: UserWarning: Boolean Series key will be reindexed to match DataFrame index.
     """Entry point for launching an IPython kernel.


.. raw:: html

    <div>
    <style scoped>
        .dataframe tbody tr th:only-of-type {
            vertical-align: middle;
        }

        .dataframe tbody tr th {
            vertical-align: top;
        }

        .dataframe thead th {
            text-align: right;
        }
    </style>
    <table border="1" class="dataframe">
      <thead>
        <tr style="text-align: right;">
          <th></th>
          <th>session</th>
          <th>year</th>
          <th>code_3</th>
          <th>text</th>
          <th>country</th>
          <th>continent</th>
          <th>sub_region</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
    </div>


Wait! What? What happened to EU?! Why did it dissappear after the merge? What
else may have disappeared? The reason the EU dissappeared is that it is not in
the ``c_codes`` data frame, and as you may recall, the ``merge`` function does
the equivalent of a set intersection. That is, the key must be in BOTH data
frames in order for it to be in the result. We can do our merge using an outer
join to preserve the data, then see which countries have no text and which texts
have no country name.


.. code:: python3

   undfe = undf.merge(c_codes[['code_3', 'country', 'continent', 'sub_region']],
                      how='outer')
   undfe.head()


.. raw:: html

    <div>
    <style scoped>
        .dataframe tbody tr th:only-of-type {
            vertical-align: middle;
        }

        .dataframe tbody tr th {
            vertical-align: top;
        }

        .dataframe thead th {
            text-align: right;
        }
    </style>
    <table border="1" class="dataframe">
      <thead>
        <tr style="text-align: right;">
          <th></th>
          <th>session</th>
          <th>year</th>
          <th>code_3</th>
          <th>text</th>
          <th>text_len</th>
          <th>country</th>
          <th>continent</th>
          <th>sub_region</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>0</th>
          <td>44.0</td>
          <td>1989.0</td>
          <td>MDV</td>
          <td>﻿It is indeed a pleasure for me and the member...</td>
          <td>3011.0</td>
          <td>Maldives</td>
          <td>Asia</td>
          <td>Southern Asia</td>
        </tr>
        <tr>
          <th>1</th>
          <td>68.0</td>
          <td>2013.0</td>
          <td>MDV</td>
          <td>I wish to begin by \nextending my heartfelt co...</td>
          <td>2252.0</td>
          <td>Maldives</td>
          <td>Asia</td>
          <td>Southern Asia</td>
        </tr>
        <tr>
          <th>2</th>
          <td>63.0</td>
          <td>2008.0</td>
          <td>MDV</td>
          <td>I am delivering this \nstatement on behalf of ...</td>
          <td>1909.0</td>
          <td>Maldives</td>
          <td>Asia</td>
          <td>Southern Asia</td>
        </tr>
        <tr>
          <th>3</th>
          <td>46.0</td>
          <td>1991.0</td>
          <td>MDV</td>
          <td>﻿Allow me at the outset on behalf of the deleg...</td>
          <td>2330.0</td>
          <td>Maldives</td>
          <td>Asia</td>
          <td>Southern Asia</td>
        </tr>
        <tr>
          <th>4</th>
          <td>41.0</td>
          <td>1986.0</td>
          <td>MDV</td>
          <td>It is indeed a pleasure for me and all the mem...</td>
          <td>2630.0</td>
          <td>Maldives</td>
          <td>Asia</td>
          <td>Southern Asia</td>
        </tr>
      </tbody>
    </table>
    </div>


Now let's see which country names are not filled in.


.. code:: python3

   undfe[undfe.country.isna()].code_3.unique()


.. parsed-literal::

   array(['YDYE', 'CSK', 'YUG', 'DDR', 'EU'], dtype=object)


.. code:: python3

   undfe[undfe.text.isna()].code_3.unique()


.. parsed-literal::

   array(['ALA', 'ASM', 'AIA', 'ATA', 'ABW', 'BMU', 'BES', 'BVT', 'IOT',
          'CYM', 'CXR', 'CCK', 'COK', 'CUW', 'FLK', 'FRO', 'GUF', 'PYF',
          'ATF', 'GIB', 'GRL', 'GLP', 'GUM', 'GGY', 'HMD', 'HKG', 'IMN',
          'JEY', 'MAC', 'MTQ', 'MYT', 'MSR', 'NCL', 'NIU', 'NFK', 'MNP',
          'PCN', 'PRI', 'REU', 'BLM', 'SHN', 'MAF', 'SPM', 'SRB', 'SXM',
          'SGS', 'SJM', 'TWN', 'TKL', 'TCA', 'UMI', 'VGB', 'VIR', 'WLF',
          'ESH'], dtype=object)


.. code:: python3

   undfe[undfe.text.isna()].country.unique()


.. parsed-literal::

   array(['Åland Islands', 'American Samoa', 'Anguilla', 'Antarctica',
          'Aruba', 'Bermuda', 'Bonaire, Sint Eustatius and Saba',
          'Bouvet Island', 'British Indian Ocean Territory',
          'Cayman Islands', 'Christmas Island', 'Cocos (Keeling) Islands',
          'Cook Islands', 'Curaçao', 'Falkland Islands (Malvinas)',
          'Faroe Islands', 'French Guiana', 'French Polynesia',
          'French Southern Territories', 'Gibraltar', 'Greenland',
          'Guadeloupe', 'Guam', 'Guernsey',
          'Heard Island and McDonald Islands', 'Hong Kong', 'Isle of Man',
          'Jersey', 'Macao', 'Martinique', 'Mayotte', 'Montserrat',
          'New Caledonia', 'Niue', 'Norfolk Island',
          'Northern Mariana Islands', 'Pitcairn', 'Puerto Rico', 'Réunion',
          'Saint Barthélemy', 'Saint Helena, Ascension and Tristan da Cunha',
          'Saint Martin (French part)', 'Saint Pierre and Miquelon',
          'Serbia', 'Sint Maarten (Dutch part)',
          'South Georgia and the South Sandwich Islands',
          'Svalbard and Jan Mayen', 'Taiwan, Province of China', 'Tokelau',
          'Turks and Caicos Islands', 'United States Minor Outlying Islands',
          'Virgin Islands (British)', 'Virgin Islands (U.S.)',
          'Wallis and Futuna', 'Western Sahara'], dtype=object)


Fill in the country names for YDYE, CSK, YUG, DDR, and EU by hand.


.. code:: python3

   undfe.loc[undfe.code_3 == 'EU', 'country'] = 'European Union'


.. code:: python3

   by_country = undfe.groupby('country',as_index=False)['text'].count()
   by_country.loc[by_country.text.idxmin()]


.. parsed-literal::

   country    South Sudan
   text                 5
   Name: 161, dtype: object


.. code:: python3

   c_codes[c_codes.code_2 == 'EU']


.. raw:: html

    <div>
    <style scoped>
        .dataframe tbody tr th:only-of-type {
            vertical-align: middle;
        }

        .dataframe tbody tr th {
            vertical-align: top;
        }

        .dataframe thead th {
            text-align: right;
        }
    </style>
    <table border="1" class="dataframe">
      <thead>
        <tr style="text-align: right;">
          <th></th>
          <th>country</th>
          <th>code_2</th>
          <th>code_3</th>
          <th>country_code</th>
          <th>iso_3166_2</th>
          <th>continent</th>
          <th>sub_region</th>
          <th>region_code</th>
          <th>sub_region_code</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
    </div>


I suspect that EU indicates the European Union, which has a place in the UN but
is not a country.

South Sudan has only spoken 5 times. Why is that? There is a very logical
explanation, but it only makes you want to check out the 5 or 10 countries that
have spoken the least.

But why did EU seem to dissappear? When we do a merge, if the key is missing,
then the row is not included in the final result.


.. code:: python3

   len(undfe)


.. parsed-literal::

   7406


.. code:: python3

   len(undf.code_3.unique())


.. parsed-literal::

   199


.. code:: python3

   len(undfe.code_3.unique())


.. parsed-literal::

   194


.. code:: python3

   set(undf.code_3.unique()) - set(undfe.code_3.unique())


.. parsed-literal::

   {'CSK', 'DDR', 'EU', 'YDYE', 'YUG'}


Can you figure out what each of the above stands for? Why are they not in the
list presented earlier?

At this point, you may want to edit the csv file and add the data for these
countries to the file. Then, you can rerun the whole notebook and we will not
lose as much data.


Tidy Data
---------

A lot of the work in data science revolves around getting data into the proper
format for analysis. A lot of data comes in messy formats for many different
reasons. But if we apply some basic principles from the world of database
design, data modeling, and some common sense (as outlined in the Hadley Wickham
paper), we can whip our data into shape. Wickham says that tidy data has the
following attributes.

* Each variable belongs in a column and contains values.
* Each observation forms a row.
* Each type of observational unit forms a table.

How does our United Nations data stack up? Pretty well. We have four columns:
session, year, country, and text. If we think of the text of the speech as the
thing we can observe, then each row does, in fact, form an observation, and
session, year, and country are attributes that identify this particular
observation.

Some of the common kinds of messiness that Wickham identifies include the
following.

* Column headers are values not variable names. Imagine this table if we had
  one row for each year and a column for each country's text! Now that would
  not be tidy!
* Multiple variables are stored in one column. We've seen this untidiness in the
  movie data a couple of chapters ago. We'll revisit that very soon to deal with
  it correctly.
* Variables are stored in both rows and columns.
* Multiple types of observational units are stored in the same table.
* A single observational unit is stored in multiple tables.

Many of the problems with untidy data stem from not knowing how to handle
relationships between multiple entities. Most of the time, things that we want
to observe interact with other things we can observe, and when we try to combine
them into a single data frame, that causes trouble. There are three kinds of
relationships that we should consider.

* one-to-one relationships
* one-to-many relationships
* many-to-many relationships

An example of a one-to-one relationship would be a person and their passport. A
person can have one passport, and a given passport belongs to only one person.
There is data that we can collect about a person and that could be stored in a
DataFrame. There is also data that we can collect from a passport, such as the
countries that person has visited, the place the passport was issued, and this
could also be stored in a DataFrame.

An example of a one-to-many relationship is a customer and the the things they
have ordered from Amazon. A particular customer may have ordered many things,
but a given order can only belong to a single customer.

An example of a many-to-many relationship is a student and a class. A student
can be enrolled in more than one class, and a class can have many students who
are enrolled in it.

Whenever you see a DataFrame that has a column that contains a list or a
dictionary, that is a sure sign of untidiness. It is also something that can be
fixed an in the end will make your analysis easier.


Tidying the Movie Genres
------------------------

Let's look at the genres column of the movies dataset. You may recall that it
looks odd. In fact, here is the result of ``df.iloc[0].genres``.


.. parsed-literal::

   "[{'id': 16, 'name': 'Animation'}, {'id': 35, 'name': 'Comedy'}, {'id': 10751, 'name': 'Family'}]"


It looks like a list of dictionary literals, except that it is in double quotes
like a string. Let's first figure out how we can get it to be an actual list of
dictionaries. Then, we'll figure out what to do with it. Python has a nifty
function called ``eval`` that allows you to evaluate a Python expression that is
a string.


.. code:: python3

   eval(df.iloc[0].genres)


.. parsed-literal::

   [{'id': 16, 'name': 'Animation'},
    {'id': 35, 'name': 'Comedy'},
    {'id': 10751, 'name': 'Family'}]


Even better, we can assign the result of ``eval`` to a variable and then we can
use the list and dictionary index syntax to access parts of the result, just
like we learned about when we discussed JSON in an earlier chapter.


.. code:: python3

   glist = eval(df.iloc[0].genres)
   glist[1]['name']


.. parsed-literal::

   'Comedy'


One way we could solve this is to duplicate all of the rows for as many genres
as the movie has storing one genre on each line, but that would mean we would
have to needlessly duplicate all of the other information on our first movie
three times.

A better strategy for doing solving this problem is to create a new DataFrame
with just two columns: one containing the movie's unique id number, and a second
containing the genre. This allows you to use the ``merge`` method on the two
data frames, but only temporarily when you need to know the genre of a
particular movie.


.. figure::  movie_genres.jpg


To construct this table, we need to iterate over all the rows of the DataFrame
and gather the genres for this movie. For each genre of the movie, we will add
an item to a list that contains the ``imdb_id`` of the movie and add an item to
a list that contains the name of the genre. These two lists are in sync with
each other so that the i :sup:`th` element of each list will represent the
same movie.

Here is some code you can use to construct the two lists.


.. code:: python3

   movie_list = []
   genre_list = []

   def map_genres(row):
       try:
           glist = eval(row.genres)
       except:
           glist = []
           print(f"bad data for {row.title}")
       for g in glist:
           movie_list.append(row.imdb_id)
           genre_list.append(g['name'])

   _ = df.apply(map_genres, axis=1)


Using these two lists, construct a new DataFrame with a column for ``imdb_id``
and ``genre``.


.. fillintheblank:: un_fb_merge_movies1

   How many movies are in the Family genre? |blank|

   - :2770: Is the correct answer
     :x: Use the len function on the results from querying the genres data frame


.. fillintheblank:: un_fb_merge_movies2

   Which genre has the most movies? |blank|

   - :Drama: Is the correct answer
     :Comedy: Is in second place
     :x: Hint:  Use a groupby on the genres data frame


Now let's calculate the average revenue for the Comedy genre. We'll do this is a
couple of steps.

1.  We will reduce the genre DataFrame so it only has the Comedies left.
2.  Then we will merge the movie data frame with the genres DataFrame using the
    ``imdb_id`` column.
3.  We will be left with a DataFrame that only contains the rows for the movies
    that are comedies. You can think of a merge like this as being the
    **intersection** of the set of comedies and the set of all movies.


.. fillintheblank:: un_fb_merge_movies3

   What is the  average revenue of a comedy movie?

   - :(12608821.677012537|12608821.678): Is the correct answer
     :166966016647.0: Is the total revenue
     :x: Hint: Use the fact that imdb_id is the only column in both DataFrames


.. fillintheblank:: un_fb_merge_movies4

   What is the title |blank| and number of genres |blank| of the movie that is
   in the most genres?

   - :The Warrior: Is the correct answer
     :incorrect: Is feedback on a specific incorrect
     :x: catchall feedback

   - :10: Is the correct answer
     :x: Hint: Use sort and head then merge with the movies data frame


**Problems to work on**

1. What is the total revenue for each genre?
2. What is the average vote_average for each genre?
3. What genre has the most votes?
4. Use a similar process to create a data frame of collections and their movies.
   Which collection has the most movies?
5. Again a similar process can be used for spoken_languages. How many movies are
   there for each language? Is English the most popular movie language?


**Lesson Feedback**

.. poll:: LearningZone_8_2
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_8_2
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_8_2
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_8_2
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...