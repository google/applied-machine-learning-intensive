
..  Copyright (C)  Google, Runestone Interactive LLC
    This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/4.0/.


Pandas exercises
================

Before attempting this exercise, make sure you’ve read through the first
four pages of `Chapter
3 <https://jakevdp.github.io/PythonDataScienceHandbook/03.00-introduction-to-pandas.html>`__
of the Python Data Science Handbook.

We’re going to be using a dataset about movies to try out processing
some data with Pandas.

We start with some standard imports:

.. code:: python3

    import ast
    import pandas as pd
    import numpy as np

We are providing you with data for this exercise that comes from The `Movie Database <https://www.themoviedb.org/documentation/api>`_.  To create this lesson we used the TMDb API but our book is not endorsed or certified by TMDb. Their API also provides access to data on many additional movies, actors and actresses, crew members, and TV shows.

Then we load the data from a local file and checkout the data:

.. code:: python3

    df = pd.read_csv('../Data/movies_metadata.csv').dropna(axis=1, how='all')
    df.head()




.. raw:: html

    <div style="max-width: 800px; overflow: scroll;">
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
          <th>belongs_to_collection</th>
          <th>budget</th>
          <th>genres</th>
          <th>homepage</th>
          <th>id</th>
          <th>imdb_id</th>
          <th>original_language</th>
          <th>original_title</th>
          <th>overview</th>
          <th>popularity</th>
          <th>...</th>
          <th>release_date</th>
          <th>revenue</th>
          <th>runtime</th>
          <th>spoken_languages</th>
          <th>status</th>
          <th>tagline</th>
          <th>title</th>
          <th>video</th>
          <th>vote_average</th>
          <th>vote_count</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>0</th>
          <td>{'id': 10194, 'name': 'Toy Story Collection', ...</td>
          <td>30000000</td>
          <td>[{'id': 16, 'name': 'Animation'}, {'id': 35, '...</td>
          <td>http://toystory.disney.com/toy-story</td>
          <td>862.0</td>
          <td>tt0114709</td>
          <td>en</td>
          <td>Toy Story</td>
          <td>Led by Woody, Andy's toys live happily in his ...</td>
          <td>21.946943</td>
          <td>...</td>
          <td>1995-10-30</td>
          <td>373554033.0</td>
          <td>81.0</td>
          <td>[{'iso_639_1': 'en', 'name': 'English'}]</td>
          <td>Released</td>
          <td>NaN</td>
          <td>Toy Story</td>
          <td>False</td>
          <td>7.7</td>
          <td>5415.0</td>
        </tr>
        <tr>
          <th>1</th>
          <td>NaN</td>
          <td>65000000</td>
          <td>[{'id': 12, 'name': 'Adventure'}, {'id': 14, '...</td>
          <td>NaN</td>
          <td>8844.0</td>
          <td>tt0113497</td>
          <td>en</td>
          <td>Jumanji</td>
          <td>When siblings Judy and Peter discover an encha...</td>
          <td>17.015539</td>
          <td>...</td>
          <td>1995-12-15</td>
          <td>262797249.0</td>
          <td>104.0</td>
          <td>[{'iso_639_1': 'en', 'name': 'English'}, {'iso...</td>
          <td>Released</td>
          <td>Roll the dice and unleash the excitement!</td>
          <td>Jumanji</td>
          <td>False</td>
          <td>6.9</td>
          <td>2413.0</td>
        </tr>
        <tr>
          <th>2</th>
          <td>{'id': 119050, 'name': 'Grumpy Old Men Collect...</td>
          <td>0</td>
          <td>[{'id': 10749, 'name': 'Romance'}, {'id': 35, ...</td>
          <td>NaN</td>
          <td>15602.0</td>
          <td>tt0113228</td>
          <td>en</td>
          <td>Grumpier Old Men</td>
          <td>A family wedding reignites the ancient feud be...</td>
          <td>11.712900</td>
          <td>...</td>
          <td>1995-12-22</td>
          <td>0.0</td>
          <td>101.0</td>
          <td>[{'iso_639_1': 'en', 'name': 'English'}]</td>
          <td>Released</td>
          <td>Still Yelling. Still Fighting. Still Ready for...</td>
          <td>Grumpier Old Men</td>
          <td>False</td>
          <td>6.5</td>
          <td>92.0</td>
        </tr>
        <tr>
          <th>3</th>
          <td>NaN</td>
          <td>16000000</td>
          <td>[{'id': 35, 'name': 'Comedy'}, {'id': 18, 'nam...</td>
          <td>NaN</td>
          <td>31357.0</td>
          <td>tt0114885</td>
          <td>en</td>
          <td>Waiting to Exhale</td>
          <td>Cheated on, mistreated and stepped on, the wom...</td>
          <td>3.859495</td>
          <td>...</td>
          <td>1995-12-22</td>
          <td>81452156.0</td>
          <td>127.0</td>
          <td>[{'iso_639_1': 'en', 'name': 'English'}]</td>
          <td>Released</td>
          <td>Friends are the people who let you be yourself...</td>
          <td>Waiting to Exhale</td>
          <td>False</td>
          <td>6.1</td>
          <td>34.0</td>
        </tr>
        <tr>
          <th>4</th>
          <td>{'id': 96871, 'name': 'Father of the Bride Col...</td>
          <td>0</td>
          <td>[{'id': 35, 'name': 'Comedy'}]</td>
          <td>NaN</td>
          <td>11862.0</td>
          <td>tt0113041</td>
          <td>en</td>
          <td>Father of the Bride Part II</td>
          <td>Just when George Banks has recovered from his ...</td>
          <td>8.387519</td>
          <td>...</td>
          <td>1995-02-10</td>
          <td>76578911.0</td>
          <td>106.0</td>
          <td>[{'iso_639_1': 'en', 'name': 'English'}]</td>
          <td>Released</td>
          <td>Just When His World Is Back To Normal... He's ...</td>
          <td>Father of the Bride Part II</td>
          <td>False</td>
          <td>5.7</td>
          <td>173.0</td>
        </tr>
      </tbody>
    </table>
    <p>5 rows × 23 columns</p>
    </div>



Exploring the data
------------------

This dataset was obtained from
`Kaggle <https://www.kaggle.com/rounakbanik/the-movies-dataset/home>`__
who downloaded it through the TMDB API.

The movies available in this dataset are in correspondence with the
movies that are listed in the MovieLens Latest Full Dataset.

Let’s see what data we have:

.. code:: python3

    df.shape




.. parsed-literal::

    (45453, 23)



Twenty-three columns of data for over 45,000 movies is going be a lot to
look at but let’s start by looking at what the columns represent:

.. code:: python3

    df.columns




.. parsed-literal::

    Index(['belongs_to_collection', 'budget', 'genres', 'homepage', 'id',
           'imdb_id', 'original_language', 'original_title', 'overview',
           'popularity', 'poster_path', 'production_companies',
           'production_countries', 'release_date', 'revenue', 'runtime',
           'spoken_languages', 'status', 'tagline', 'title', 'video',
           'vote_average', 'vote_count'],
          dtype='object')



Here’s an explanation of each column:

- **belongs_to_collection**: A stringified dictionary that identifies the collection that a movie belongs to (if any).
- **budget**: The budget of the movie in dollars.
- **genres**: A stringified list of dictionaries that list out all the genres associated with the movie.
- **homepage**: The Official Homepage of the movie.
- **id**: An arbitrary ID for the movie.
- **imdb_id**: The IMDB ID of the movie.
- **original_language**: The language in which the movie was filmed.
- **original_title**: The title of the movie in its original language.
- **overview**: A blurb of the movie.
- **popularity**: The Popularity Score assigned by TMDB.
- **poster_path**: The URL of the poster image (relative to http://image.tmdb.org/t/p/w185/).
- **production_companies**: A stringified list of production companies involved with the making of the movie.
- **production_countries**: A stringified list of countries where the movie was filmed or produced.
- **release_date**: Theatrical release date of the movie.
- **revenue**: World-wide revenue of the movie in dollars.
- **runtime**: Duration of the movie in minutes.
- **spoken_languages**: A stringified list of spoken languages in the film.
- **status**: Released, To Be Released, Announced, etc.
- **tagline**: The tagline of the movie.
- **title**: The official title of the movie.
- **video**: Indicates if there is a video present of the movie with TMDB.
- **vote_average**: The average rating of the movie on TMDB.
- **vote_count**: The number of votes by users, as counted by TMDB.


