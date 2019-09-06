
..  Copyright (C)  Google, Runestone Interactive LLC
    This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/4.0/.

Graphing Infant Mortality on a map
==================================

Let us take on the seemingly simple task of plotting some of the country
data on a map. Like we did in Google Sheets earlier. We’ll see that this
is one area where things are not quite as simple as they are in Sheets.
But we can make it work with a bit of effort.

Altair provides us with the facility to make a blank map. But filling in
the data requires a bit more work on our part.

This is a good example of learning by example and extrapolating what you
need to do based on understanding the example.

The counties data that is passed to the chart is the data needed to
create and outline the map

.. code:: python3

    import altair as alt
    from vega_datasets import data
    counties = alt.topo_feature(data.us_10m.url, 'counties')
    unemp_data = data.unemployment.url


    alt.Chart(counties).mark_geoshape().project(
        type='albersUsa').properties(
        width=500,
        height=300
    )




.. image:: WorldFactbook_files/WorldFactbook_55_0.png

What about our encoding channels??!! The primary data needed to draw the
map using a ``mark_geoshape`` was passed to the Chart, but that is
really secondary data for us, what we care about is graphing the
unemployment data by county. That is in a different data frame with a
column called rate.

With a geoshape we can encode the county data using color. But there is
no unemployment data in counties so we have to use a
``transform_lookup`` to **map** from the way counties are identified in
the geo data to our DataFrame that contains unemployment data.

.. code:: python3

    unemp_data = pd.read_csv('http://vega.github.io/vega-datasets/data/unemployment.tsv',sep='\t')
    unemp_data.head()




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
          <th>id</th>
          <th>rate</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>0</th>
          <td>1001</td>
          <td>0.097</td>
        </tr>
        <tr>
          <th>1</th>
          <td>1003</td>
          <td>0.091</td>
        </tr>
        <tr>
          <th>2</th>
          <td>1005</td>
          <td>0.134</td>
        </tr>
        <tr>
          <th>3</th>
          <td>1007</td>
          <td>0.121</td>
        </tr>
        <tr>
          <th>4</th>
          <td>1009</td>
          <td>0.099</td>
        </tr>
      </tbody>
    </table>
    </div>



Using the transform_lookup method we can arrange for the id in the
geographic data to be matched against the id in our unemp_data data
frame. This allows us to make use of two data frames in one graph. The
example below is a bit misleading in that id is used both as th lookup
as well as the key in the call to LookupData. The lookup value refers to
the column name in the DataFrame passed to Chart where as the second
parameter to the LookupData call is the name of the column in the
unemp_data DataFrame. It is just a coincidence that they have the same
name in this example.

.. code:: python3


    alt.Chart(counties).mark_geoshape(
    ).encode(
        color='rate:Q'
    ).transform_lookup(
        lookup='id',
        from_=alt.LookupData(unemp_data, 'id', ['rate'])
    ).project(
        type='albersUsa'
    ).properties(
        width=500,
        height=300,
        title='Unemployment by County'
    )




.. image:: WorldFactbook_files/WorldFactbook_59_0.png



Using a Web API to get Country Codes
------------------------------------


Can you make use of the provided example and the altair documentation to
produce a graph of the world where the countries are colored by one of
the features in the data?

You have some work to do:

In this part of the project we will:

-  Learn about using web apis for data gathering
-  Use a web api to get data that maps country codes to country numbers
-  Learn how to add columns to a data frame using the ``map`` function.
   And possibly learn to use a lambda function if you’ve never used one
   before.

Lets make a todo list:

1. We need to add a column to our wd DataFrame that contains the
   numerical country id. Where can we get this data? There may be some
   CSV files with this information already in them, but this is a good
   chance to learn about a common technique used by data scientists
   everywhere **web APIs**.  API stands for Application Programmer Interface. Each website will have its own convention for how you ask it for data, and the format in which the data is returned.

2. Once we have the new column we can follow the example from above to make a world map and show birthrate data.


The first step is to make use of the awesome `requests module <http://http://docs.python-requests.org>`_  The requests module allows us to easily communicate to databases across the web.  The documentation for it is awesome, so you should use that to learn about requests in more detail.  We'll just give you the bare bones to get started.

The website called restcountries.eu provides an interface for us to get data from their site rather than a web page.  When thinking about a web API you have to understand how to ask it for the data you want.  In this case we will use `/rest/v2/alpha/XXX`.  If we unpack that into pieces lets look at what its telling us:

* `/rest` - technically REST stands for REpresentational State Transfer.  This uses the HTTP protocol to ask for and respond with data.
* `/v2` - this is version 2 of this website's protocol
* `/alpha` - This tells the website that the next thing we are going to pass tell it is the three letter code for the country.
* `XXX` this can be any valid three letter country code.  for example usa

Open a new tab in your browser and paste this URL - `https://restcountries.eu/rest/v2/alpha/usa`  You will see that you don't get a web page in response, but rather some information that looks like a Python dictionary.  We'll explore that more below.  We can do the same thing from a Python program using the requests library.

.. code:: python3

    import requests
    res = requests.get('https://restcountries.eu/rest/v2/alpha/usa')
    res.status_code

.. parsed-literal::

    200

The status code of 200 tells us that everything went fine.  If you make a typo in the URL you may see the familiar status code of 404 - meaning not found.

We can also look at the text that was returned.

.. code:: python3

    res.text

.. parsed-literal::

    '{"name":"United States of America","topLevelDomain":[".us"],"alpha2Code":"US","alpha3Code":"USA","callingCodes":["1"],"capital":"Washington, D.C.","altSpellings":["US","USA","United States of America"],"region":"Americas","subregion":"Northern America","population":323947000,"latlng":[38.0,-97.0],"demonym":"American","area":9629091.0,"gini":48.0,"timezones":["UTC-12:00","UTC-11:00","UTC-10:00","UTC-09:00","UTC-08:00","UTC-07:00","UTC-06:00","UTC-05:00","UTC-04:00","UTC+10:00","UTC+12:00"],"borders":["CAN","MEX"],"nativeName":"United States","numericCode":"840","currencies":[{"code":"USD","name":"United States dollar","symbol":"$"}],"languages":[{"iso639_1":"en","iso639_2":"eng","name":"English","nativeName":"English"}],"translations":{"de":"Vereinigte Staaten von Amerika","es":"Estados Unidos","fr":"États-Unis","ja":"アメリカ合衆国","it":"Stati Uniti D\'America","br":"Estados Unidos","pt":"Estados Unidos","nl":"Verenigde Staten","hr":"Sjedinjene Američke Države","fa":"ایالات متحده آمریکا"},"flag":"https://restcountries.eu/data/usa.svg","regionalBlocs":[{"acronym":"NAFTA","name":"North American Free Trade Agreement","otherAcronyms":[],"otherNames":["Tratado de Libre Comercio de América del Norte","Accord de Libre-échange Nord-Américain"]}],"cioc":"USA"}'

That looks like an ugly mess!  Fortunately its not as bad as it seems.  if you look closely at the data you will see that it starts with a `{` and ends with a `}` in fact you may realize this looks a lot like a Python dictionary!  If you thought that your are correct, this is a big long string that represents a python dictionary.  Better yet, we can convert this string into an actual Python dictionary and then access the individual key value pairs stored in the dictionary using the usual python syntax!

The official name for the format that we saw above is called JSON - JavaScript Object Notation.  Its a good Acronym to know, but you don't have to know anything about Javascript in order to make use of JSON!

.. code:: python3

    usa_info = res.json()
    usa_info

.. code:: json

    {'name': 'United States of America',
     'topLevelDomain': ['.us'],
     'alpha2Code': 'US',
     'alpha3Code': 'USA',
     'callingCodes': ['1'],
     'capital': 'Washington, D.C.',
     'altSpellings': ['US', 'USA', 'United States of America'],
     'region': 'Americas',
     'subregion': 'Northern America',
     'population': 323947000,
     'latlng': [38.0, -97.0],
     'demonym': 'American',
     'area': 9629091.0,
     'gini': 48.0,
     'timezones': ['UTC-12:00',
       'UTC-11:00',
       'UTC-10:00',
       'UTC-09:00',
       'UTC-08:00',
       'UTC-07:00',
       'UTC-06:00',
       'UTC-05:00',
       'UTC-04:00',
       'UTC+10:00',
       'UTC+12:00'],
     'borders': ['CAN', 'MEX'],
     'nativeName': 'United States',
     'numericCode': '840',
     'currencies': [{'code': 'USD',
       'name': 'United States dollar',
       'symbol': '$'}],
     'languages': [{'iso639_1': 'en',
       'iso639_2': 'eng',
       'name': 'English',
       'nativeName': 'English'}],
     'translations': {'de': 'Vereinigte Staaten von Amerika',
       'es': 'Estados Unidos',
       'fr': 'États-Unis',
       'ja': 'アメリカ合衆国',
       'it': "Stati Uniti D'America",
       'br': 'Estados Unidos',
       'pt': 'Estados Unidos',
       'nl': 'Verenigde Staten',
       'hr': 'Sjedinjene Američke Države',
       'fa': 'ایالات متحده آمریکا'},
     'flag': 'https://restcountries.eu/data/usa.svg',
     'regionalBlocs': [{'acronym': 'NAFTA',
       'name': 'North American Free Trade Agreement',
       'otherAcronyms': [],
       'otherNames': ['Tratado de Libre Comercio de América del Norte',
         'Accord de Libre-échange Nord-Américain']}],
     'cioc': 'USA'}


.. code:: python3

    usa_info['timezones']

.. parsed-literal::

    ['UTC-12:00',
     'UTC-11:00',
     'UTC-10:00',
     'UTC-09:00',
     'UTC-08:00',
     'UTC-07:00',
     'UTC-06:00',
     'UTC-05:00',
     'UTC-04:00',
     'UTC+10:00',
     'UTC+12:00']


**Check your Understanding**

.. fillintheblank:: fb_api1

   What is the numericCode for the country of Peru?

   - :(604|'604'): Is the correct answer
     :51: Is the callingCode for Peru.  Use that if you are phoning a friend.
     :x: Check your answer again.

.. fillintheblank:: fb_api2

   Copy and paste the list of the three letter country codes of the countries that border Peru.  Do not include the square brackets:

   - :'BOL', 'BRA', 'CHL', 'COL', 'ECU': Is the correct answer
     :200: No, 200 is the status code of the request not
     :x: There should be five countries, in single quotes separated by a comma and a space.

.. fillintheblank:: fb_api3

   How many keys are in the dictionary returned for the country of Peru?

   - :24: Is the correct answer
     :x: You can use the `keys` method on the object return by `.json()` to see the list of keys.


Now that we have a really nice way to get the additional country information, lets add the numeric country code as a new column in our `wd` DataFrame.  We can think of adding the column as a transformation of our three letter country code to a number.  We can do this using the `map` function.  You learned about `map` in the Python Review section of this book. If you need to refresh your memory check here :ref:`PythonReview`.

When we use pandas the difference is that we don't pass the list as a parameter to map, map is a method of a Series, so we use the syntax `df.myColumn.map(function)`  This applies the function we pass as a parameter to each element of the series and constructs a brand new series.

For our case we need to write a function that takes a three letter country code as a parameter and returns the numeric code we lookup **converted to an integer**, lets call it `get_num_code`.  You have all the details you need to write this function.  Once you write this function you can use as shown below:

.. code:: python3

    wd['CodeNum'] = wd.Code.map(get_num_code)
    wd.head()



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
          <th>Country</th>
          <th>Ctry</th>
          <th>Code</th>
          <th>CodeNum</th>
          <th>Region</th>
          <th>Population</th>
          <th>Area</th>
          <th>Pop. Density</th>
          <th>Coastline</th>
          <th>Net migration</th>
          <th>...</th>
          <th>Phones</th>
          <th>Arable</th>
          <th>Crops</th>
          <th>Other</th>
          <th>Climate</th>
          <th>Birthrate</th>
          <th>Deathrate</th>
          <th>Agriculture</th>
          <th>Industry</th>
          <th>Service</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>0</th>
          <td>Afghanistan</td>
          <td>Afghanistan</td>
          <td>AFG</td>
          <td>4.0</td>
          <td>ASIA (EX. NEAR EAST)</td>
          <td>31056997</td>
          <td>647500</td>
          <td>48.0</td>
          <td>0.00</td>
          <td>23.06</td>
          <td>...</td>
          <td>3.2</td>
          <td>12.13</td>
          <td>0.22</td>
          <td>87.65</td>
          <td>1.0</td>
          <td>46.60</td>
          <td>20.34</td>
          <td>0.380</td>
          <td>0.240</td>
          <td>0.380</td>
        </tr>
        <tr>
          <th>1</th>
          <td>Albania</td>
          <td>Albania</td>
          <td>ALB</td>
          <td>8.0</td>
          <td>EASTERN EUROPE</td>
          <td>3581655</td>
          <td>28748</td>
          <td>124.6</td>
          <td>1.26</td>
          <td>-4.93</td>
          <td>...</td>
          <td>71.2</td>
          <td>21.09</td>
          <td>4.42</td>
          <td>74.49</td>
          <td>3.0</td>
          <td>15.11</td>
          <td>5.22</td>
          <td>0.232</td>
          <td>0.188</td>
          <td>0.579</td>
        </tr>
        <tr>
          <th>2</th>
          <td>Algeria</td>
          <td>Algeria</td>
          <td>DZA</td>
          <td>12.0</td>
          <td>NORTHERN AFRICA</td>
          <td>32930091</td>
          <td>2381740</td>
          <td>13.8</td>
          <td>0.04</td>
          <td>-0.39</td>
          <td>...</td>
          <td>78.1</td>
          <td>3.22</td>
          <td>0.25</td>
          <td>96.53</td>
          <td>1.0</td>
          <td>17.14</td>
          <td>4.61</td>
          <td>0.101</td>
          <td>0.600</td>
          <td>0.298</td>
        </tr>
        <tr>
          <th>3</th>
          <td>American Samoa</td>
          <td>American Samoa</td>
          <td>ASM</td>
          <td>16.0</td>
          <td>OCEANIA</td>
          <td>57794</td>
          <td>199</td>
          <td>290.4</td>
          <td>58.29</td>
          <td>-20.71</td>
          <td>...</td>
          <td>259.5</td>
          <td>10.00</td>
          <td>15.00</td>
          <td>75.00</td>
          <td>2.0</td>
          <td>22.46</td>
          <td>3.27</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>4</th>
          <td>Andorra</td>
          <td>Andorra</td>
          <td>AND</td>
          <td>20.0</td>
          <td>WESTERN EUROPE</td>
          <td>71201</td>
          <td>468</td>
          <td>152.1</td>
          <td>0.00</td>
          <td>6.60</td>
          <td>...</td>
          <td>497.2</td>
          <td>2.22</td>
          <td>0.00</td>
          <td>97.78</td>
          <td>3.0</td>
          <td>8.71</td>
          <td>6.25</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
      </tbody>
    </table>
    <p>5 rows × 23 columns</p>
    </div>


.. warning:: DataFrame Gotcha

    Be careful,  ``wd.CodeNum`` and ``wd['CodeNum']`` are ALMOST always interchangeable, except for when you create a new column.  when you create a new column you MUST use ``wd['CodeNum'] = blah new column expression``  If you write `wd.CodeNum = blah new column expression` it will add a ``CodeNum`` attribute to the ``wd`` object rather than creating a new column.  This is consistent with standard python syntax of allowing you to add an attribute on the fly to any object.
 

You can make a gray map of the world like this:

.. code:: python3

    countries = alt.topo_feature(data.world_110m.url, 'countries')

    alt.Chart(countries).mark_geoshape(
        fill='#666666',
        stroke='white'
    ).properties(
        width=750,
        height=450
    ).project('equirectangular')

So, now you have the information you need to use the example of the
counties above and apply that to the world below.

.. code:: python3

    base = alt.Chart(countries).mark_geoshape(
        fill='#666666',
        stroke='white'
    ).encode( #your code here

    ).transform_lookup( # your code here

    ).properties(
        width=750,
        height=450
    ).project('equirectangular')

    base


.. image:: WorldFactbook_files/WorldFactbook_74_0.png


Your final result should look like this:

.. image:: WorldFactbook_files/WorldFactbook_75_0.png



More Practice
-------------

Using a Web API on Your Own
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Find a web API that provides some numeric data that interests you.  There is tons of data available in the world of Finance, Sports, environment, travel, etc.  A great place to look is at `The Programmable Web <https://www.programmableweb.com>`_  Yes, this assignment is a bit vague and open ended but that is part of the excitement.  You get to find an API and graph some data that appeals to YOU, not something some author or professor picked out.  You might even feel like you have awesome super powers by the time you finish this project.

1. Use the web api to obtain the data.  Most sites are going to provide it in JSON format similar to what we saw.

2. Next create a graph of your using Altair

3. Take some time to talk about and present the data and the graph you created to the class.



**Lesson Feedback**

.. poll:: LearningZone_6_3
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_6_3
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_6_3
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_6_3
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...
