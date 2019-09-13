
..  Copyright (C)  Google, Runestone Interactive LLC
    This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/4.0/.

World Factbook: Exploratory Data Analysis
=========================================


Loading data into a DataFrame from a CSV file
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The csv file is one of the most common ways you will find data. CSV stands for
comma separated values and allows us to share data files in a simple
text format. The data we will use to get started with Pandas is the data
about countries we used in the spreadsheet module. You can open a CSV
file in any text editor, but its not particularly easy to read. But
because of its structure it is easy to parse. The first few lines of the
raw csv file for this project look like this:

::

   Country,Ctry,Code,CodeNum,Region,Population,Area,Pop. Density,Coastline,Net migration,Infant mortality,GDP,Literacy,Phones,Arable,Crops,Other,Climate,Birthrate,Deathrate,Agriculture,Industry,Service
   Afghanistan,Afghanistan,AFG,4,ASIA (EX. NEAR EAST)         ,31056997,647500,48.0,0.00,23.06,163.07,700,36.0,3.2,12.13,0.22,87.65,1,46.6,20.34,0.38,0.24,0.38
   Albania ,Albania,ALB,8,EASTERN EUROPE                     ,3581655,28748,124.6,1.26,-4.93,21.52,4500,86.5,71.2,21.09,4.42,74.49,3,15.11,5.22,0.232,0.188,0.579
   Algeria ,Algeria,DZA,12,NORTHERN AFRICA                    ,32930091,2381740,13.8,0.04,-0.39,31,6000,70.0,78.1,3.22,0.25,96.53,1,17.14,4.61,0.101,0.6,0.298

You may have some experience with reading and parsing CSV files on your
own with Python. If not you may wish to `have a quick
review <https://runestone.academy/runestone/static/fopp/Files/ReadingCSVFiles.html>`__

.. code:: python3

    %matplotlib inline

    import pandas as pd
    import matplotlib
    import matplotlib.pyplot as plt
    import psycopg2
    import textatistic
    import seaborn as sbn
    from altair import Chart, X, Y, Color, Scale
    import altair as alt
    from vega_datasets import data
    import requests
    from bs4 import BeautifulSoup
    matplotlib.style.use('ggplot')
    # for plotly py.offline.init_notebook_mode()



Meanwhile, we will make use of one of the many data reading functions
pandas provides for us ``read_csv``

.. code:: python3

    wd = pd.read_csv('world_countries.csv')

.. code:: python3

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
          <th>Ct</th>
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
          <td>4</td>
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
          <td>8</td>
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
          <td>12</td>
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
          <td>16</td>
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
          <td>20</td>
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



Describing the Data
~~~~~~~~~~~~~~~~~~~

-  Country
-  Area Square Miles
-  Population Density per square mile
-  Coastline coast/area ratio
-  Net migration
-  Infant mortaility per 1000 births
-  GDP $ per capita
-  Literacy %
-  Phones per 1000
-  Arable land %
-  Crops %
-  other %
-  Climate
-  Birthrate
-  Deathrate
-  Agriculture % GDP
-  Inustry % GDP
-  Service % GDP

The Climate numbers are as follows:

1. Dry tropical or tundra and ice
2. Wet tropical
3. Temperate humid subtropical and temperate continental
4. Dry hot summers and wet winters

Somehow some values of 1.5 and 2.5 have crept in, so we will assume that 1.5 is mixed tropical and 2.5 mixed.


.. code:: python3

    wd.describe()




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
          <th>CodeNum</th>
          <th>Population</th>
          <th>Area</th>
          <th>Pop. Density</th>
          <th>Coastline</th>
          <th>Net migration</th>
          <th>Infant mortality</th>
          <th>GDP</th>
          <th>Literacy</th>
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
          <th>count</th>
          <td>225.000000</td>
          <td>2.250000e+02</td>
          <td>2.250000e+02</td>
          <td>225.000000</td>
          <td>225.000000</td>
          <td>222.000000</td>
          <td>222.000000</td>
          <td>224.000000</td>
          <td>209.000000</td>
          <td>221.000000</td>
          <td>223.000000</td>
          <td>223.000000</td>
          <td>223.000000</td>
          <td>203.000000</td>
          <td>222.000000</td>
          <td>221.000000</td>
          <td>210.000000</td>
          <td>209.000000</td>
          <td>210.000000</td>
        </tr>
        <tr>
          <th>mean</th>
          <td>436.213333</td>
          <td>2.897847e+07</td>
          <td>6.035169e+05</td>
          <td>362.911111</td>
          <td>21.304089</td>
          <td>0.017838</td>
          <td>35.635180</td>
          <td>9770.089286</td>
          <td>82.838278</td>
          <td>236.435294</td>
          <td>13.715247</td>
          <td>4.425695</td>
          <td>81.858700</td>
          <td>2.130542</td>
          <td>21.993604</td>
          <td>9.290045</td>
          <td>0.151710</td>
          <td>0.282722</td>
          <td>0.564395</td>
        </tr>
        <tr>
          <th>std</th>
          <td>254.713527</td>
          <td>1.183891e+08</td>
          <td>1.797370e+06</td>
          <td>1650.160243</td>
          <td>72.591840</td>
          <td>4.906187</td>
          <td>35.523302</td>
          <td>10057.808157</td>
          <td>19.722173</td>
          <td>228.942889</td>
          <td>13.057554</td>
          <td>8.268356</td>
          <td>16.029195</td>
          <td>0.697558</td>
          <td>11.147278</td>
          <td>4.986086</td>
          <td>0.147199</td>
          <td>0.138935</td>
          <td>0.166357</td>
        </tr>
        <tr>
          <th>min</th>
          <td>4.000000</td>
          <td>7.026000e+03</td>
          <td>2.000000e+00</td>
          <td>0.000000</td>
          <td>0.000000</td>
          <td>-20.990000</td>
          <td>2.290000</td>
          <td>500.000000</td>
          <td>17.600000</td>
          <td>0.200000</td>
          <td>0.000000</td>
          <td>0.000000</td>
          <td>33.330000</td>
          <td>1.000000</td>
          <td>7.290000</td>
          <td>2.290000</td>
          <td>0.000000</td>
          <td>0.020000</td>
          <td>0.062000</td>
        </tr>
        <tr>
          <th>25%</th>
          <td>214.000000</td>
          <td>4.361310e+05</td>
          <td>5.128000e+03</td>
          <td>29.000000</td>
          <td>0.100000</td>
          <td>-0.962500</td>
          <td>8.070000</td>
          <td>1900.000000</td>
          <td>70.600000</td>
          <td>37.200000</td>
          <td>3.160000</td>
          <td>0.190000</td>
          <td>72.825000</td>
          <td>2.000000</td>
          <td>12.597500</td>
          <td>5.980000</td>
          <td>0.038000</td>
          <td>0.190000</td>
          <td>0.427750</td>
        </tr>
        <tr>
          <th>50%</th>
          <td>434.000000</td>
          <td>5.042920e+06</td>
          <td>8.836100e+04</td>
          <td>77.400000</td>
          <td>0.730000</td>
          <td>0.000000</td>
          <td>21.000000</td>
          <td>5700.000000</td>
          <td>92.500000</td>
          <td>176.200000</td>
          <td>10.380000</td>
          <td>1.010000</td>
          <td>86.070000</td>
          <td>2.000000</td>
          <td>18.750000</td>
          <td>8.100000</td>
          <td>0.099500</td>
          <td>0.270000</td>
          <td>0.566500</td>
        </tr>
        <tr>
          <th>75%</th>
          <td>654.000000</td>
          <td>1.765484e+07</td>
          <td>4.465500e+05</td>
          <td>183.500000</td>
          <td>10.320000</td>
          <td>0.965000</td>
          <td>56.095000</td>
          <td>15775.000000</td>
          <td>98.000000</td>
          <td>394.400000</td>
          <td>20.000000</td>
          <td>4.425000</td>
          <td>95.470000</td>
          <td>3.000000</td>
          <td>29.645000</td>
          <td>10.620000</td>
          <td>0.223000</td>
          <td>0.342000</td>
          <td>0.677500</td>
        </tr>
        <tr>
          <th>max</th>
          <td>894.000000</td>
          <td>1.313974e+09</td>
          <td>1.707520e+07</td>
          <td>16271.500000</td>
          <td>870.660000</td>
          <td>23.060000</td>
          <td>191.190000</td>
          <td>55100.000000</td>
          <td>100.000000</td>
          <td>1035.600000</td>
          <td>62.110000</td>
          <td>50.680000</td>
          <td>100.000000</td>
          <td>4.000000</td>
          <td>50.730000</td>
          <td>29.740000</td>
          <td>0.769000</td>
          <td>0.906000</td>
          <td>0.954000</td>
        </tr>
      </tbody>
    </table>
    </div>

Visualizing Distribution with Histograms
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python3

    c = Chart(wd) # make a chart
    m = c.mark_bar() # set the mark -- returns a new Chart
    e = m.encode(X('Birthrate',bin=True),y='count()') # set the encoding
    e.display()



.. image:: WorldFactbook_files/WorldFactbook_15_0.png


We can shortcut a lot of what we did above into a single line because
once we have created a mark there is really nothing more to do with it
besides add the encoding. Because the methods are all cleverly designed
to return the proper object we can string all of the calls above into a
single line. We also do not need to explicitly call display because
Altair returns an object that the Jupyter environment knows how to
display automatically.

.. code:: python3

    Chart(wd).mark_bar().encode(x=X('Birthrate', bin=True), y='count()')




.. image:: WorldFactbook_files/WorldFactbook_17_0.png



Practice
~~~~~~~~

.. fillintheblank:: fact_literacy

   What is the range of values for the tallest bar when creating a histogram of the literacy rate? lower: |blank| upper: |blank|

   - :90: Is the correct answer
     :89: just a little too low
     :x: Please try again, the number will be between 10 and 100

   - :100: Is correct
     :x: Please try again, the number will be between 10 and 100

.. fillintheblank:: fact_service1

   What is the range of values for the tallest bar when creating a histogram of the fraction of the economy due to service? lower: |blank| upper: |blank|

   - :(.5|.50|0.50): Is the correct answer
     :.49: just a little too low
     :x: Please try again, the number will be between 0 and 1.0

   - :(.60|.6|0.60): Is correct
     :x: Please try again, the number will be between 0.0 and 1.0

.. fillintheblank:: fact_service2

   Approximately how many countries (to the nearest 5) have between 90 and 100% of their economy based on service?

   - :(5|6): Is the correct answer
     :x: Please try again.  The number is less than 15

Scatter Plots for discovering relationships
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now lets make a simple scatter plot of area versus population of the
countries.

.. code:: python3

    Chart(wd).mark_point().encode(x='Population', y='Area', tooltip='Country')




.. image:: WorldFactbook_files/WorldFactbook_22_0.png




Thats not a very satisfying graph. But it does make us want to focus
more on the lower left corner. Let’s redo the graph but focus on the
countries with a population under 150 million and an area under 4
million. Lets start with the first part

To do this we will create a new DataFrame where we focus on the
countries with populations less than 150 million and areas less than 4
million. Pandas makes this really easy with its querying power.

The statement below produces a Series of boolean values. These boolean
values are used to index the data frame and only the rows corresponding
to True values are returned in the result.

.. code:: python3

    (wd.Population < 150000000).head(20)




.. parsed-literal::

    0     True
    1     True
    2     True
    3     True
    4     True
    5     True
    6     True
    7     True
    8     True
    9     True
    10    True
    11    True
    12    True
    13    True
    14    True
    15    True
    16    True
    17    True
    18    True
    19    True
    Name: Population, dtype: bool



To be a bit more dramatic lets look at the countries of less than
150,000

.. code:: python3

    wd[wd.Population < 150000]




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
          <th>Ct</th>
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
          <th>3</th>
          <td>American Samoa</td>
          <td>American Samoa</td>
          <td>ASM</td>
          <td>16</td>
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
          <td>20</td>
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
        <tr>
          <th>6</th>
          <td>Anguilla</td>
          <td>Anguilla</td>
          <td>AIA</td>
          <td>660</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>13477</td>
          <td>102</td>
          <td>132.1</td>
          <td>59.80</td>
          <td>10.76</td>
          <td>...</td>
          <td>460.0</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>2.0</td>
          <td>14.17</td>
          <td>5.34</td>
          <td>0.040</td>
          <td>0.180</td>
          <td>0.780</td>
        </tr>
        <tr>
          <th>7</th>
          <td>Antigua &amp; Barbuda</td>
          <td>Antigua &amp; Barbuda</td>
          <td>ATA</td>
          <td>10</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>69108</td>
          <td>443</td>
          <td>156.0</td>
          <td>34.54</td>
          <td>-6.15</td>
          <td>...</td>
          <td>549.9</td>
          <td>18.18</td>
          <td>4.55</td>
          <td>77.27</td>
          <td>2.0</td>
          <td>16.93</td>
          <td>5.37</td>
          <td>0.038</td>
          <td>0.220</td>
          <td>0.743</td>
        </tr>
        <tr>
          <th>10</th>
          <td>Aruba</td>
          <td>Aruba</td>
          <td>ABW</td>
          <td>533</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>71891</td>
          <td>193</td>
          <td>372.5</td>
          <td>35.49</td>
          <td>0.00</td>
          <td>...</td>
          <td>516.1</td>
          <td>10.53</td>
          <td>0.00</td>
          <td>89.47</td>
          <td>2.0</td>
          <td>11.03</td>
          <td>6.68</td>
          <td>0.004</td>
          <td>0.333</td>
          <td>0.663</td>
        </tr>
        <tr>
          <th>22</th>
          <td>Bermuda</td>
          <td>Bermuda</td>
          <td>BMU</td>
          <td>60</td>
          <td>NORTHERN AMERICA</td>
          <td>65773</td>
          <td>53</td>
          <td>1241.0</td>
          <td>194.34</td>
          <td>2.49</td>
          <td>...</td>
          <td>851.4</td>
          <td>20.00</td>
          <td>0.00</td>
          <td>80.00</td>
          <td>2.0</td>
          <td>11.40</td>
          <td>7.74</td>
          <td>0.010</td>
          <td>0.100</td>
          <td>0.890</td>
        </tr>
        <tr>
          <th>28</th>
          <td>British Virgin Is.</td>
          <td>British Virgin Is.</td>
          <td>IOT</td>
          <td>86</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>23098</td>
          <td>153</td>
          <td>151.0</td>
          <td>52.29</td>
          <td>10.01</td>
          <td>...</td>
          <td>506.5</td>
          <td>20.00</td>
          <td>6.67</td>
          <td>73.33</td>
          <td>2.0</td>
          <td>14.89</td>
          <td>4.42</td>
          <td>0.018</td>
          <td>0.062</td>
          <td>0.920</td>
        </tr>
        <tr>
          <th>38</th>
          <td>Cayman Islands</td>
          <td>Cayman Islands</td>
          <td>CYM</td>
          <td>136</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>45436</td>
          <td>262</td>
          <td>173.4</td>
          <td>61.07</td>
          <td>18.75</td>
          <td>...</td>
          <td>836.3</td>
          <td>3.85</td>
          <td>0.00</td>
          <td>96.15</td>
          <td>2.0</td>
          <td>12.74</td>
          <td>4.89</td>
          <td>0.014</td>
          <td>0.032</td>
          <td>0.954</td>
        </tr>
        <tr>
          <th>47</th>
          <td>Cook Islands</td>
          <td>Cook Islands</td>
          <td>COK</td>
          <td>184</td>
          <td>OCEANIA</td>
          <td>21388</td>
          <td>240</td>
          <td>89.1</td>
          <td>50.00</td>
          <td>NaN</td>
          <td>...</td>
          <td>289.9</td>
          <td>17.39</td>
          <td>13.04</td>
          <td>69.57</td>
          <td>2.0</td>
          <td>21.00</td>
          <td>NaN</td>
          <td>0.151</td>
          <td>0.096</td>
          <td>0.753</td>
        </tr>
        <tr>
          <th>56</th>
          <td>Dominica</td>
          <td>Dominica</td>
          <td>DMA</td>
          <td>212</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>68910</td>
          <td>754</td>
          <td>91.4</td>
          <td>19.63</td>
          <td>-13.87</td>
          <td>...</td>
          <td>304.8</td>
          <td>6.67</td>
          <td>20.00</td>
          <td>73.33</td>
          <td>2.0</td>
          <td>15.27</td>
          <td>6.73</td>
          <td>0.177</td>
          <td>0.328</td>
          <td>0.495</td>
        </tr>
        <tr>
          <th>66</th>
          <td>Faroe Islands</td>
          <td>Faroe Islands</td>
          <td>FRO</td>
          <td>234</td>
          <td>WESTERN EUROPE</td>
          <td>47246</td>
          <td>1399</td>
          <td>33.8</td>
          <td>79.84</td>
          <td>1.41</td>
          <td>...</td>
          <td>503.8</td>
          <td>2.14</td>
          <td>0.00</td>
          <td>97.86</td>
          <td>NaN</td>
          <td>14.05</td>
          <td>8.70</td>
          <td>0.270</td>
          <td>0.110</td>
          <td>0.620</td>
        </tr>
        <tr>
          <th>77</th>
          <td>Gibraltar</td>
          <td>Gibraltar</td>
          <td>GIB</td>
          <td>292</td>
          <td>WESTERN EUROPE</td>
          <td>27928</td>
          <td>7</td>
          <td>3989.7</td>
          <td>171.43</td>
          <td>0.00</td>
          <td>...</td>
          <td>877.7</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>NaN</td>
          <td>10.74</td>
          <td>9.31</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>79</th>
          <td>Greenland</td>
          <td>Greenland</td>
          <td>GRL</td>
          <td>304</td>
          <td>NORTHERN AMERICA</td>
          <td>56361</td>
          <td>2166086</td>
          <td>0.0</td>
          <td>2.04</td>
          <td>-8.37</td>
          <td>...</td>
          <td>448.9</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>1.0</td>
          <td>15.93</td>
          <td>7.84</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>80</th>
          <td>Grenada</td>
          <td>Grenada</td>
          <td>GRD</td>
          <td>308</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>89703</td>
          <td>344</td>
          <td>260.8</td>
          <td>35.17</td>
          <td>-13.92</td>
          <td>...</td>
          <td>364.5</td>
          <td>5.88</td>
          <td>29.41</td>
          <td>64.71</td>
          <td>2.0</td>
          <td>22.08</td>
          <td>6.88</td>
          <td>0.054</td>
          <td>0.180</td>
          <td>0.766</td>
        </tr>
        <tr>
          <th>84</th>
          <td>Guernsey</td>
          <td>Guernsey</td>
          <td>GGY</td>
          <td>831</td>
          <td>WESTERN EUROPE</td>
          <td>65409</td>
          <td>78</td>
          <td>838.6</td>
          <td>64.10</td>
          <td>3.84</td>
          <td>...</td>
          <td>842.4</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>3.0</td>
          <td>8.81</td>
          <td>10.01</td>
          <td>0.030</td>
          <td>0.100</td>
          <td>0.870</td>
        </tr>
        <tr>
          <th>98</th>
          <td>Isle of Man</td>
          <td>Isle of Man</td>
          <td>IMN</td>
          <td>833</td>
          <td>WESTERN EUROPE</td>
          <td>75441</td>
          <td>572</td>
          <td>131.9</td>
          <td>27.97</td>
          <td>5.36</td>
          <td>...</td>
          <td>676.0</td>
          <td>9.00</td>
          <td>0.00</td>
          <td>91.00</td>
          <td>3.0</td>
          <td>11.05</td>
          <td>11.19</td>
          <td>0.010</td>
          <td>0.130</td>
          <td>0.860</td>
        </tr>
        <tr>
          <th>103</th>
          <td>Jersey</td>
          <td>Jersey</td>
          <td>JEY</td>
          <td>832</td>
          <td>WESTERN EUROPE</td>
          <td>91084</td>
          <td>116</td>
          <td>785.2</td>
          <td>60.34</td>
          <td>2.76</td>
          <td>...</td>
          <td>811.3</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>3.0</td>
          <td>9.30</td>
          <td>9.28</td>
          <td>0.050</td>
          <td>0.020</td>
          <td>0.930</td>
        </tr>
        <tr>
          <th>107</th>
          <td>Kiribati</td>
          <td>Kiribati</td>
          <td>KIR</td>
          <td>296</td>
          <td>OCEANIA</td>
          <td>105432</td>
          <td>811</td>
          <td>130.0</td>
          <td>140.94</td>
          <td>0.00</td>
          <td>...</td>
          <td>42.7</td>
          <td>2.74</td>
          <td>50.68</td>
          <td>46.58</td>
          <td>2.0</td>
          <td>30.65</td>
          <td>8.26</td>
          <td>0.089</td>
          <td>0.242</td>
          <td>0.668</td>
        </tr>
        <tr>
          <th>118</th>
          <td>Liechtenstein</td>
          <td>Liechtenstein</td>
          <td>LIE</td>
          <td>438</td>
          <td>WESTERN EUROPE</td>
          <td>33987</td>
          <td>160</td>
          <td>212.4</td>
          <td>0.00</td>
          <td>4.85</td>
          <td>...</td>
          <td>585.5</td>
          <td>25.00</td>
          <td>0.00</td>
          <td>75.00</td>
          <td>4.0</td>
          <td>10.21</td>
          <td>7.18</td>
          <td>0.060</td>
          <td>0.390</td>
          <td>0.550</td>
        </tr>
        <tr>
          <th>129</th>
          <td>Marshall Islands</td>
          <td>Marshall Islands</td>
          <td>MHL</td>
          <td>584</td>
          <td>OCEANIA</td>
          <td>60422</td>
          <td>11854</td>
          <td>5.1</td>
          <td>3.12</td>
          <td>-6.04</td>
          <td>...</td>
          <td>91.2</td>
          <td>16.67</td>
          <td>38.89</td>
          <td>44.44</td>
          <td>2.0</td>
          <td>33.05</td>
          <td>4.78</td>
          <td>0.317</td>
          <td>0.149</td>
          <td>0.534</td>
        </tr>
        <tr>
          <th>135</th>
          <td>Micronesia, Fed. St.</td>
          <td>Micronesia, Fed. St.</td>
          <td>FSM</td>
          <td>583</td>
          <td>OCEANIA</td>
          <td>108004</td>
          <td>702</td>
          <td>153.9</td>
          <td>870.66</td>
          <td>-20.99</td>
          <td>...</td>
          <td>114.8</td>
          <td>5.71</td>
          <td>45.71</td>
          <td>48.58</td>
          <td>2.0</td>
          <td>24.68</td>
          <td>4.75</td>
          <td>0.289</td>
          <td>0.152</td>
          <td>0.559</td>
        </tr>
        <tr>
          <th>137</th>
          <td>Monaco</td>
          <td>Monaco</td>
          <td>MCO</td>
          <td>492</td>
          <td>WESTERN EUROPE</td>
          <td>32543</td>
          <td>2</td>
          <td>16271.5</td>
          <td>205.00</td>
          <td>7.75</td>
          <td>...</td>
          <td>1035.6</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>NaN</td>
          <td>9.19</td>
          <td>12.91</td>
          <td>0.170</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>139</th>
          <td>Montserrat</td>
          <td>Montserrat</td>
          <td>MSR</td>
          <td>500</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>9439</td>
          <td>102</td>
          <td>92.5</td>
          <td>39.22</td>
          <td>0.00</td>
          <td>...</td>
          <td>NaN</td>
          <td>20.00</td>
          <td>0.00</td>
          <td>80.00</td>
          <td>2.0</td>
          <td>17.59</td>
          <td>7.10</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>143</th>
          <td>Nauru</td>
          <td>Nauru</td>
          <td>NRU</td>
          <td>520</td>
          <td>OCEANIA</td>
          <td>13287</td>
          <td>21</td>
          <td>632.7</td>
          <td>142.86</td>
          <td>0.00</td>
          <td>...</td>
          <td>143.0</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>2.0</td>
          <td>24.76</td>
          <td>6.70</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>152</th>
          <td>N. Mariana Islands</td>
          <td>N. Mariana Islands</td>
          <td>MMR</td>
          <td>104</td>
          <td>OCEANIA</td>
          <td>82459</td>
          <td>477</td>
          <td>172.9</td>
          <td>310.69</td>
          <td>9.61</td>
          <td>...</td>
          <td>254.7</td>
          <td>13.04</td>
          <td>4.35</td>
          <td>82.61</td>
          <td>2.0</td>
          <td>19.43</td>
          <td>2.29</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>156</th>
          <td>Palau</td>
          <td>Palau</td>
          <td>PLW</td>
          <td>585</td>
          <td>OCEANIA</td>
          <td>20579</td>
          <td>458</td>
          <td>44.9</td>
          <td>331.66</td>
          <td>2.85</td>
          <td>...</td>
          <td>325.6</td>
          <td>8.70</td>
          <td>4.35</td>
          <td>86.95</td>
          <td>2.0</td>
          <td>18.03</td>
          <td>6.80</td>
          <td>0.062</td>
          <td>0.120</td>
          <td>0.818</td>
        </tr>
        <tr>
          <th>170</th>
          <td>Saint Helena</td>
          <td>Saint Helena</td>
          <td>BLM</td>
          <td>652</td>
          <td>SUB-SAHARAN AFRICA</td>
          <td>7502</td>
          <td>413</td>
          <td>18.2</td>
          <td>14.53</td>
          <td>0.00</td>
          <td>...</td>
          <td>293.3</td>
          <td>12.90</td>
          <td>0.00</td>
          <td>87.10</td>
          <td>NaN</td>
          <td>12.13</td>
          <td>6.53</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>171</th>
          <td>Saint Kitts &amp; Nevis</td>
          <td>Saint Kitts &amp; Nevis</td>
          <td>SHN</td>
          <td>654</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>39129</td>
          <td>261</td>
          <td>149.9</td>
          <td>51.72</td>
          <td>-7.11</td>
          <td>...</td>
          <td>638.9</td>
          <td>19.44</td>
          <td>2.78</td>
          <td>77.78</td>
          <td>2.0</td>
          <td>18.02</td>
          <td>8.33</td>
          <td>0.035</td>
          <td>0.258</td>
          <td>0.707</td>
        </tr>
        <tr>
          <th>173</th>
          <td>St Pierre &amp; Miquelon</td>
          <td>St Pierre &amp; Miquelon</td>
          <td>LKA</td>
          <td>144</td>
          <td>NORTHERN AMERICA</td>
          <td>7026</td>
          <td>242</td>
          <td>29.0</td>
          <td>49.59</td>
          <td>-4.86</td>
          <td>...</td>
          <td>683.2</td>
          <td>13.04</td>
          <td>0.00</td>
          <td>86.96</td>
          <td>NaN</td>
          <td>13.52</td>
          <td>6.83</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>174</th>
          <td>Saint Vincent and the Grenadines</td>
          <td>Saint Vincent and the Grenadines</td>
          <td>VCT</td>
          <td>670</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>117848</td>
          <td>389</td>
          <td>303.0</td>
          <td>21.59</td>
          <td>-7.64</td>
          <td>...</td>
          <td>190.9</td>
          <td>17.95</td>
          <td>17.95</td>
          <td>64.10</td>
          <td>2.0</td>
          <td>16.18</td>
          <td>5.98</td>
          <td>0.100</td>
          <td>0.260</td>
          <td>0.640</td>
        </tr>
        <tr>
          <th>176</th>
          <td>San Marino</td>
          <td>San Marino</td>
          <td>SMR</td>
          <td>674</td>
          <td>WESTERN EUROPE</td>
          <td>29251</td>
          <td>61</td>
          <td>479.5</td>
          <td>0.00</td>
          <td>10.98</td>
          <td>...</td>
          <td>704.3</td>
          <td>16.67</td>
          <td>0.00</td>
          <td>83.33</td>
          <td>NaN</td>
          <td>10.02</td>
          <td>8.17</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>181</th>
          <td>Seychelles</td>
          <td>Seychelles</td>
          <td>SYC</td>
          <td>690</td>
          <td>SUB-SAHARAN AFRICA</td>
          <td>81541</td>
          <td>455</td>
          <td>179.2</td>
          <td>107.91</td>
          <td>-5.69</td>
          <td>...</td>
          <td>262.4</td>
          <td>2.22</td>
          <td>13.33</td>
          <td>84.45</td>
          <td>2.0</td>
          <td>16.03</td>
          <td>6.29</td>
          <td>0.032</td>
          <td>0.304</td>
          <td>0.665</td>
        </tr>
        <tr>
          <th>202</th>
          <td>Tonga</td>
          <td>Tonga</td>
          <td>TON</td>
          <td>776</td>
          <td>OCEANIA</td>
          <td>114689</td>
          <td>748</td>
          <td>153.3</td>
          <td>56.02</td>
          <td>0.00</td>
          <td>...</td>
          <td>97.7</td>
          <td>23.61</td>
          <td>43.06</td>
          <td>33.33</td>
          <td>2.0</td>
          <td>25.37</td>
          <td>5.28</td>
          <td>0.230</td>
          <td>0.270</td>
          <td>0.500</td>
        </tr>
        <tr>
          <th>207</th>
          <td>Turks &amp; Caicos Is</td>
          <td>Turks &amp; Caicos Is</td>
          <td>TKM</td>
          <td>795</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>21152</td>
          <td>430</td>
          <td>49.2</td>
          <td>90.47</td>
          <td>11.68</td>
          <td>...</td>
          <td>269.5</td>
          <td>2.33</td>
          <td>0.00</td>
          <td>97.67</td>
          <td>2.0</td>
          <td>21.84</td>
          <td>4.21</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>208</th>
          <td>Tuvalu</td>
          <td>Tuvalu</td>
          <td>TUV</td>
          <td>798</td>
          <td>OCEANIA</td>
          <td>11810</td>
          <td>26</td>
          <td>454.2</td>
          <td>92.31</td>
          <td>0.00</td>
          <td>...</td>
          <td>59.3</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>2.0</td>
          <td>22.18</td>
          <td>7.11</td>
          <td>0.166</td>
          <td>0.272</td>
          <td>0.562</td>
        </tr>
        <tr>
          <th>219</th>
          <td>Virgin Islands</td>
          <td>Virgin Islands</td>
          <td>VIR</td>
          <td>850</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>108605</td>
          <td>1910</td>
          <td>56.9</td>
          <td>9.84</td>
          <td>-8.94</td>
          <td>...</td>
          <td>652.8</td>
          <td>11.76</td>
          <td>2.94</td>
          <td>85.30</td>
          <td>2.0</td>
          <td>13.96</td>
          <td>6.43</td>
          <td>0.010</td>
          <td>0.190</td>
          <td>0.800</td>
        </tr>
        <tr>
          <th>220</th>
          <td>Wallis and Futuna</td>
          <td>Wallis and Futuna</td>
          <td>WLF</td>
          <td>876</td>
          <td>OCEANIA</td>
          <td>16025</td>
          <td>274</td>
          <td>58.5</td>
          <td>47.08</td>
          <td>NaN</td>
          <td>...</td>
          <td>118.6</td>
          <td>5.00</td>
          <td>25.00</td>
          <td>70.00</td>
          <td>2.0</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
      </tbody>
    </table>
    <p>37 rows × 23 columns</p>
    </div>



Now lets graph these countries. The easiest way to do this is to plug
the query right into the call to create a Chart rather than assigning it
to a variable first.

.. code:: python3

    Chart(wd[wd.Population < 150000]).mark_point().encode(x='Population', y='Area', tooltip='Country').interactive()




.. image:: WorldFactbook_files/WorldFactbook_30_0.png



How interesting! One country has such a large value that it pushes all the others down. We added a
tooltip parameter so that if you hover over that point you will see it
is Greenland! Lots of land area but not too many people. There are large
universities that have more people than the country of Greenland. Lets
improve out query to focus on area less than 200,000

We can do more complicated boolean expressions by using the ``|``
(logical or) and ``&`` (logical and) operators. Normally in Python these
two operators are used for bitwise or and bitwise and. So we can create
a more complicated boolean expression to limit our DataFrame in both
directions.

.. code:: python3

    wd[(wd.Population < 150000) & (wd.Area < 200000)]




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
          <th>Ct</th>
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
          <th>3</th>
          <td>American Samoa</td>
          <td>American Samoa</td>
          <td>ASM</td>
          <td>16</td>
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
          <td>20</td>
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
        <tr>
          <th>6</th>
          <td>Anguilla</td>
          <td>Anguilla</td>
          <td>AIA</td>
          <td>660</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>13477</td>
          <td>102</td>
          <td>132.1</td>
          <td>59.80</td>
          <td>10.76</td>
          <td>...</td>
          <td>460.0</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>2.0</td>
          <td>14.17</td>
          <td>5.34</td>
          <td>0.040</td>
          <td>0.180</td>
          <td>0.780</td>
        </tr>
        <tr>
          <th>7</th>
          <td>Antigua &amp; Barbuda</td>
          <td>Antigua &amp; Barbuda</td>
          <td>ATA</td>
          <td>10</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>69108</td>
          <td>443</td>
          <td>156.0</td>
          <td>34.54</td>
          <td>-6.15</td>
          <td>...</td>
          <td>549.9</td>
          <td>18.18</td>
          <td>4.55</td>
          <td>77.27</td>
          <td>2.0</td>
          <td>16.93</td>
          <td>5.37</td>
          <td>0.038</td>
          <td>0.220</td>
          <td>0.743</td>
        </tr>
        <tr>
          <th>10</th>
          <td>Aruba</td>
          <td>Aruba</td>
          <td>ABW</td>
          <td>533</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>71891</td>
          <td>193</td>
          <td>372.5</td>
          <td>35.49</td>
          <td>0.00</td>
          <td>...</td>
          <td>516.1</td>
          <td>10.53</td>
          <td>0.00</td>
          <td>89.47</td>
          <td>2.0</td>
          <td>11.03</td>
          <td>6.68</td>
          <td>0.004</td>
          <td>0.333</td>
          <td>0.663</td>
        </tr>
        <tr>
          <th>22</th>
          <td>Bermuda</td>
          <td>Bermuda</td>
          <td>BMU</td>
          <td>60</td>
          <td>NORTHERN AMERICA</td>
          <td>65773</td>
          <td>53</td>
          <td>1241.0</td>
          <td>194.34</td>
          <td>2.49</td>
          <td>...</td>
          <td>851.4</td>
          <td>20.00</td>
          <td>0.00</td>
          <td>80.00</td>
          <td>2.0</td>
          <td>11.40</td>
          <td>7.74</td>
          <td>0.010</td>
          <td>0.100</td>
          <td>0.890</td>
        </tr>
        <tr>
          <th>28</th>
          <td>British Virgin Is.</td>
          <td>British Virgin Is.</td>
          <td>IOT</td>
          <td>86</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>23098</td>
          <td>153</td>
          <td>151.0</td>
          <td>52.29</td>
          <td>10.01</td>
          <td>...</td>
          <td>506.5</td>
          <td>20.00</td>
          <td>6.67</td>
          <td>73.33</td>
          <td>2.0</td>
          <td>14.89</td>
          <td>4.42</td>
          <td>0.018</td>
          <td>0.062</td>
          <td>0.920</td>
        </tr>
        <tr>
          <th>38</th>
          <td>Cayman Islands</td>
          <td>Cayman Islands</td>
          <td>CYM</td>
          <td>136</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>45436</td>
          <td>262</td>
          <td>173.4</td>
          <td>61.07</td>
          <td>18.75</td>
          <td>...</td>
          <td>836.3</td>
          <td>3.85</td>
          <td>0.00</td>
          <td>96.15</td>
          <td>2.0</td>
          <td>12.74</td>
          <td>4.89</td>
          <td>0.014</td>
          <td>0.032</td>
          <td>0.954</td>
        </tr>
        <tr>
          <th>47</th>
          <td>Cook Islands</td>
          <td>Cook Islands</td>
          <td>COK</td>
          <td>184</td>
          <td>OCEANIA</td>
          <td>21388</td>
          <td>240</td>
          <td>89.1</td>
          <td>50.00</td>
          <td>NaN</td>
          <td>...</td>
          <td>289.9</td>
          <td>17.39</td>
          <td>13.04</td>
          <td>69.57</td>
          <td>2.0</td>
          <td>21.00</td>
          <td>NaN</td>
          <td>0.151</td>
          <td>0.096</td>
          <td>0.753</td>
        </tr>
        <tr>
          <th>56</th>
          <td>Dominica</td>
          <td>Dominica</td>
          <td>DMA</td>
          <td>212</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>68910</td>
          <td>754</td>
          <td>91.4</td>
          <td>19.63</td>
          <td>-13.87</td>
          <td>...</td>
          <td>304.8</td>
          <td>6.67</td>
          <td>20.00</td>
          <td>73.33</td>
          <td>2.0</td>
          <td>15.27</td>
          <td>6.73</td>
          <td>0.177</td>
          <td>0.328</td>
          <td>0.495</td>
        </tr>
        <tr>
          <th>66</th>
          <td>Faroe Islands</td>
          <td>Faroe Islands</td>
          <td>FRO</td>
          <td>234</td>
          <td>WESTERN EUROPE</td>
          <td>47246</td>
          <td>1399</td>
          <td>33.8</td>
          <td>79.84</td>
          <td>1.41</td>
          <td>...</td>
          <td>503.8</td>
          <td>2.14</td>
          <td>0.00</td>
          <td>97.86</td>
          <td>NaN</td>
          <td>14.05</td>
          <td>8.70</td>
          <td>0.270</td>
          <td>0.110</td>
          <td>0.620</td>
        </tr>
        <tr>
          <th>77</th>
          <td>Gibraltar</td>
          <td>Gibraltar</td>
          <td>GIB</td>
          <td>292</td>
          <td>WESTERN EUROPE</td>
          <td>27928</td>
          <td>7</td>
          <td>3989.7</td>
          <td>171.43</td>
          <td>0.00</td>
          <td>...</td>
          <td>877.7</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>NaN</td>
          <td>10.74</td>
          <td>9.31</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>80</th>
          <td>Grenada</td>
          <td>Grenada</td>
          <td>GRD</td>
          <td>308</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>89703</td>
          <td>344</td>
          <td>260.8</td>
          <td>35.17</td>
          <td>-13.92</td>
          <td>...</td>
          <td>364.5</td>
          <td>5.88</td>
          <td>29.41</td>
          <td>64.71</td>
          <td>2.0</td>
          <td>22.08</td>
          <td>6.88</td>
          <td>0.054</td>
          <td>0.180</td>
          <td>0.766</td>
        </tr>
        <tr>
          <th>84</th>
          <td>Guernsey</td>
          <td>Guernsey</td>
          <td>GGY</td>
          <td>831</td>
          <td>WESTERN EUROPE</td>
          <td>65409</td>
          <td>78</td>
          <td>838.6</td>
          <td>64.10</td>
          <td>3.84</td>
          <td>...</td>
          <td>842.4</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>3.0</td>
          <td>8.81</td>
          <td>10.01</td>
          <td>0.030</td>
          <td>0.100</td>
          <td>0.870</td>
        </tr>
        <tr>
          <th>98</th>
          <td>Isle of Man</td>
          <td>Isle of Man</td>
          <td>IMN</td>
          <td>833</td>
          <td>WESTERN EUROPE</td>
          <td>75441</td>
          <td>572</td>
          <td>131.9</td>
          <td>27.97</td>
          <td>5.36</td>
          <td>...</td>
          <td>676.0</td>
          <td>9.00</td>
          <td>0.00</td>
          <td>91.00</td>
          <td>3.0</td>
          <td>11.05</td>
          <td>11.19</td>
          <td>0.010</td>
          <td>0.130</td>
          <td>0.860</td>
        </tr>
        <tr>
          <th>103</th>
          <td>Jersey</td>
          <td>Jersey</td>
          <td>JEY</td>
          <td>832</td>
          <td>WESTERN EUROPE</td>
          <td>91084</td>
          <td>116</td>
          <td>785.2</td>
          <td>60.34</td>
          <td>2.76</td>
          <td>...</td>
          <td>811.3</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>3.0</td>
          <td>9.30</td>
          <td>9.28</td>
          <td>0.050</td>
          <td>0.020</td>
          <td>0.930</td>
        </tr>
        <tr>
          <th>107</th>
          <td>Kiribati</td>
          <td>Kiribati</td>
          <td>KIR</td>
          <td>296</td>
          <td>OCEANIA</td>
          <td>105432</td>
          <td>811</td>
          <td>130.0</td>
          <td>140.94</td>
          <td>0.00</td>
          <td>...</td>
          <td>42.7</td>
          <td>2.74</td>
          <td>50.68</td>
          <td>46.58</td>
          <td>2.0</td>
          <td>30.65</td>
          <td>8.26</td>
          <td>0.089</td>
          <td>0.242</td>
          <td>0.668</td>
        </tr>
        <tr>
          <th>118</th>
          <td>Liechtenstein</td>
          <td>Liechtenstein</td>
          <td>LIE</td>
          <td>438</td>
          <td>WESTERN EUROPE</td>
          <td>33987</td>
          <td>160</td>
          <td>212.4</td>
          <td>0.00</td>
          <td>4.85</td>
          <td>...</td>
          <td>585.5</td>
          <td>25.00</td>
          <td>0.00</td>
          <td>75.00</td>
          <td>4.0</td>
          <td>10.21</td>
          <td>7.18</td>
          <td>0.060</td>
          <td>0.390</td>
          <td>0.550</td>
        </tr>
        <tr>
          <th>129</th>
          <td>Marshall Islands</td>
          <td>Marshall Islands</td>
          <td>MHL</td>
          <td>584</td>
          <td>OCEANIA</td>
          <td>60422</td>
          <td>11854</td>
          <td>5.1</td>
          <td>3.12</td>
          <td>-6.04</td>
          <td>...</td>
          <td>91.2</td>
          <td>16.67</td>
          <td>38.89</td>
          <td>44.44</td>
          <td>2.0</td>
          <td>33.05</td>
          <td>4.78</td>
          <td>0.317</td>
          <td>0.149</td>
          <td>0.534</td>
        </tr>
        <tr>
          <th>135</th>
          <td>Micronesia, Fed. St.</td>
          <td>Micronesia, Fed. St.</td>
          <td>FSM</td>
          <td>583</td>
          <td>OCEANIA</td>
          <td>108004</td>
          <td>702</td>
          <td>153.9</td>
          <td>870.66</td>
          <td>-20.99</td>
          <td>...</td>
          <td>114.8</td>
          <td>5.71</td>
          <td>45.71</td>
          <td>48.58</td>
          <td>2.0</td>
          <td>24.68</td>
          <td>4.75</td>
          <td>0.289</td>
          <td>0.152</td>
          <td>0.559</td>
        </tr>
        <tr>
          <th>137</th>
          <td>Monaco</td>
          <td>Monaco</td>
          <td>MCO</td>
          <td>492</td>
          <td>WESTERN EUROPE</td>
          <td>32543</td>
          <td>2</td>
          <td>16271.5</td>
          <td>205.00</td>
          <td>7.75</td>
          <td>...</td>
          <td>1035.6</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>NaN</td>
          <td>9.19</td>
          <td>12.91</td>
          <td>0.170</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>139</th>
          <td>Montserrat</td>
          <td>Montserrat</td>
          <td>MSR</td>
          <td>500</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>9439</td>
          <td>102</td>
          <td>92.5</td>
          <td>39.22</td>
          <td>0.00</td>
          <td>...</td>
          <td>NaN</td>
          <td>20.00</td>
          <td>0.00</td>
          <td>80.00</td>
          <td>2.0</td>
          <td>17.59</td>
          <td>7.10</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>143</th>
          <td>Nauru</td>
          <td>Nauru</td>
          <td>NRU</td>
          <td>520</td>
          <td>OCEANIA</td>
          <td>13287</td>
          <td>21</td>
          <td>632.7</td>
          <td>142.86</td>
          <td>0.00</td>
          <td>...</td>
          <td>143.0</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>2.0</td>
          <td>24.76</td>
          <td>6.70</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>152</th>
          <td>N. Mariana Islands</td>
          <td>N. Mariana Islands</td>
          <td>MMR</td>
          <td>104</td>
          <td>OCEANIA</td>
          <td>82459</td>
          <td>477</td>
          <td>172.9</td>
          <td>310.69</td>
          <td>9.61</td>
          <td>...</td>
          <td>254.7</td>
          <td>13.04</td>
          <td>4.35</td>
          <td>82.61</td>
          <td>2.0</td>
          <td>19.43</td>
          <td>2.29</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>156</th>
          <td>Palau</td>
          <td>Palau</td>
          <td>PLW</td>
          <td>585</td>
          <td>OCEANIA</td>
          <td>20579</td>
          <td>458</td>
          <td>44.9</td>
          <td>331.66</td>
          <td>2.85</td>
          <td>...</td>
          <td>325.6</td>
          <td>8.70</td>
          <td>4.35</td>
          <td>86.95</td>
          <td>2.0</td>
          <td>18.03</td>
          <td>6.80</td>
          <td>0.062</td>
          <td>0.120</td>
          <td>0.818</td>
        </tr>
        <tr>
          <th>170</th>
          <td>Saint Helena</td>
          <td>Saint Helena</td>
          <td>BLM</td>
          <td>652</td>
          <td>SUB-SAHARAN AFRICA</td>
          <td>7502</td>
          <td>413</td>
          <td>18.2</td>
          <td>14.53</td>
          <td>0.00</td>
          <td>...</td>
          <td>293.3</td>
          <td>12.90</td>
          <td>0.00</td>
          <td>87.10</td>
          <td>NaN</td>
          <td>12.13</td>
          <td>6.53</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>171</th>
          <td>Saint Kitts &amp; Nevis</td>
          <td>Saint Kitts &amp; Nevis</td>
          <td>SHN</td>
          <td>654</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>39129</td>
          <td>261</td>
          <td>149.9</td>
          <td>51.72</td>
          <td>-7.11</td>
          <td>...</td>
          <td>638.9</td>
          <td>19.44</td>
          <td>2.78</td>
          <td>77.78</td>
          <td>2.0</td>
          <td>18.02</td>
          <td>8.33</td>
          <td>0.035</td>
          <td>0.258</td>
          <td>0.707</td>
        </tr>
        <tr>
          <th>173</th>
          <td>St Pierre &amp; Miquelon</td>
          <td>St Pierre &amp; Miquelon</td>
          <td>LKA</td>
          <td>144</td>
          <td>NORTHERN AMERICA</td>
          <td>7026</td>
          <td>242</td>
          <td>29.0</td>
          <td>49.59</td>
          <td>-4.86</td>
          <td>...</td>
          <td>683.2</td>
          <td>13.04</td>
          <td>0.00</td>
          <td>86.96</td>
          <td>NaN</td>
          <td>13.52</td>
          <td>6.83</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>174</th>
          <td>Saint Vincent and the Grenadines</td>
          <td>Saint Vincent and the Grenadines</td>
          <td>VCT</td>
          <td>670</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>117848</td>
          <td>389</td>
          <td>303.0</td>
          <td>21.59</td>
          <td>-7.64</td>
          <td>...</td>
          <td>190.9</td>
          <td>17.95</td>
          <td>17.95</td>
          <td>64.10</td>
          <td>2.0</td>
          <td>16.18</td>
          <td>5.98</td>
          <td>0.100</td>
          <td>0.260</td>
          <td>0.640</td>
        </tr>
        <tr>
          <th>176</th>
          <td>San Marino</td>
          <td>San Marino</td>
          <td>SMR</td>
          <td>674</td>
          <td>WESTERN EUROPE</td>
          <td>29251</td>
          <td>61</td>
          <td>479.5</td>
          <td>0.00</td>
          <td>10.98</td>
          <td>...</td>
          <td>704.3</td>
          <td>16.67</td>
          <td>0.00</td>
          <td>83.33</td>
          <td>NaN</td>
          <td>10.02</td>
          <td>8.17</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>181</th>
          <td>Seychelles</td>
          <td>Seychelles</td>
          <td>SYC</td>
          <td>690</td>
          <td>SUB-SAHARAN AFRICA</td>
          <td>81541</td>
          <td>455</td>
          <td>179.2</td>
          <td>107.91</td>
          <td>-5.69</td>
          <td>...</td>
          <td>262.4</td>
          <td>2.22</td>
          <td>13.33</td>
          <td>84.45</td>
          <td>2.0</td>
          <td>16.03</td>
          <td>6.29</td>
          <td>0.032</td>
          <td>0.304</td>
          <td>0.665</td>
        </tr>
        <tr>
          <th>202</th>
          <td>Tonga</td>
          <td>Tonga</td>
          <td>TON</td>
          <td>776</td>
          <td>OCEANIA</td>
          <td>114689</td>
          <td>748</td>
          <td>153.3</td>
          <td>56.02</td>
          <td>0.00</td>
          <td>...</td>
          <td>97.7</td>
          <td>23.61</td>
          <td>43.06</td>
          <td>33.33</td>
          <td>2.0</td>
          <td>25.37</td>
          <td>5.28</td>
          <td>0.230</td>
          <td>0.270</td>
          <td>0.500</td>
        </tr>
        <tr>
          <th>207</th>
          <td>Turks &amp; Caicos Is</td>
          <td>Turks &amp; Caicos Is</td>
          <td>TKM</td>
          <td>795</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>21152</td>
          <td>430</td>
          <td>49.2</td>
          <td>90.47</td>
          <td>11.68</td>
          <td>...</td>
          <td>269.5</td>
          <td>2.33</td>
          <td>0.00</td>
          <td>97.67</td>
          <td>2.0</td>
          <td>21.84</td>
          <td>4.21</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>208</th>
          <td>Tuvalu</td>
          <td>Tuvalu</td>
          <td>TUV</td>
          <td>798</td>
          <td>OCEANIA</td>
          <td>11810</td>
          <td>26</td>
          <td>454.2</td>
          <td>92.31</td>
          <td>0.00</td>
          <td>...</td>
          <td>59.3</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>2.0</td>
          <td>22.18</td>
          <td>7.11</td>
          <td>0.166</td>
          <td>0.272</td>
          <td>0.562</td>
        </tr>
        <tr>
          <th>219</th>
          <td>Virgin Islands</td>
          <td>Virgin Islands</td>
          <td>VIR</td>
          <td>850</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>108605</td>
          <td>1910</td>
          <td>56.9</td>
          <td>9.84</td>
          <td>-8.94</td>
          <td>...</td>
          <td>652.8</td>
          <td>11.76</td>
          <td>2.94</td>
          <td>85.30</td>
          <td>2.0</td>
          <td>13.96</td>
          <td>6.43</td>
          <td>0.010</td>
          <td>0.190</td>
          <td>0.800</td>
        </tr>
        <tr>
          <th>220</th>
          <td>Wallis and Futuna</td>
          <td>Wallis and Futuna</td>
          <td>WLF</td>
          <td>876</td>
          <td>OCEANIA</td>
          <td>16025</td>
          <td>274</td>
          <td>58.5</td>
          <td>47.08</td>
          <td>NaN</td>
          <td>...</td>
          <td>118.6</td>
          <td>5.00</td>
          <td>25.00</td>
          <td>70.00</td>
          <td>2.0</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
      </tbody>
    </table>
    <p>36 rows × 23 columns</p>
    </div>



.. code:: python3

    Chart(wd[(wd.Population < 150000) & (wd.Area < 200000)]).mark_point().encode(x='Population', y='Area', tooltip='Country').interactive()




.. image:: WorldFactbook_files/WorldFactbook_34_0.png



OK, so maybe you have a favorite country you have visited or lived in at
some point. I lived in Malta for six months, so I’m always curious about
Malta. Lets see what data we have in the data frame for Malta using an
equality:

.. code:: python3

    wd[wd.Country == 'Malta']




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
          <th>Ct</th>
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
      </tbody>
    </table>
    <p>0 rows × 23 columns</p>
    </div>



Hmmm.. that seems odd that Malta would not be in the dataset. Lets try
some other countries. Nothing seems to work. One common problem is that
names and other strings can end up with spaces at the beginning or the
end. If you do a quick try you will see that ‘Malta’ works. But that is
horrible. We don’t want to have to remember to put spaces at the end of
every string all the time. We should do a little data cleanup and strip
those spaces.

.. code:: python3

    wd[wd.Country == 'Malta ']




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
          <th>Ct</th>
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
          <th>128</th>
          <td>Malta</td>
          <td>Malta</td>
          <td>MLT</td>
          <td>470</td>
          <td>WESTERN EUROPE</td>
          <td>400214</td>
          <td>316</td>
          <td>1266.5</td>
          <td>62.28</td>
          <td>2.07</td>
          <td>...</td>
          <td>505.0</td>
          <td>28.13</td>
          <td>3.13</td>
          <td>68.74</td>
          <td>NaN</td>
          <td>10.22</td>
          <td>8.1</td>
          <td>0.03</td>
          <td>0.23</td>
          <td>0.74</td>
        </tr>
      </tbody>
    </table>
    <p>1 rows × 23 columns</p>
    </div>



You may recall that Python has a string method called ``strip`` that
does exactly what we want. How can we get that to apply to all of the
strings in the Series? Pandas allows us to do this using the str
attribute of the series in combination with most of the standard string
methods you know about.

.. code:: python3

    wd.Country.str.strip()




.. parsed-literal::

    0                                            Afghanistan
    1                                                Albania
    2                                                Algeria
    3                                         American Samoa
    4                                                Andorra
    5                                                 Angola
    6                                               Anguilla
    7                                      Antigua & Barbuda
    8                                              Argentina
    9                                                Armenia
    10                                                 Aruba
    11                                             Australia
    12                                               Austria
    13                                            Azerbaijan
    14                                          Bahamas, The
    15                                               Bahrain
    16                                            Bangladesh
    17                                              Barbados
    18                                               Belarus
    19                                               Belgium
    20                                                Belize
    21                                                 Benin
    22                                               Bermuda
    23                                                Bhutan
    24                                               Bolivia
    25                                  Bosnia & Herzegovina
    26                                              Botswana
    27                                                Brazil
    28                                    British Virgin Is.
    29                                                Brunei
                                 ...
    195                                          Switzerland
    196                                                Syria
    197                                               Taiwan
    198                                           Tajikistan
    199                                             Tanzania
    200                                             Thailand
    201                                                 Togo
    202                                                Tonga
    203                                    Trinidad & Tobago
    204                                              Tunisia
    205                                               Turkey
    206                                         Turkmenistan
    207                                    Turks & Caicos Is
    208                                               Tuvalu
    209                                               Uganda
    210                                              Ukraine
    211                                 United Arab Emirates
    212    United Kingdom of Great Britain and Northern I...
    213                             United States of America
    214                                              Uruguay
    215                                           Uzbekistan
    216                                              Vanuatu
    217                                            Venezuela
    218                                              Vietnam
    219                                       Virgin Islands
    220                                    Wallis and Futuna
    221                                       Western Sahara
    222                                                Yemen
    223                                               Zambia
    224                                             Zimbabwe
    Name: Country, Length: 225, dtype: object



Now we can replace our original Country column with the stripped column.

.. code:: python3

    wd['Country'] = wd.Country.str.strip()

.. code:: python3

    wd[wd.Country == 'Malta']




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
          <th>Ct</th>
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
          <th>128</th>
          <td>Malta</td>
          <td>Malta</td>
          <td>MLT</td>
          <td>470</td>
          <td>WESTERN EUROPE</td>
          <td>400214</td>
          <td>316</td>
          <td>1266.5</td>
          <td>62.28</td>
          <td>2.07</td>
          <td>...</td>
          <td>505.0</td>
          <td>28.13</td>
          <td>3.13</td>
          <td>68.74</td>
          <td>NaN</td>
          <td>10.22</td>
          <td>8.1</td>
          <td>0.03</td>
          <td>0.23</td>
          <td>0.74</td>
        </tr>
      </tbody>
    </table>
    <p>1 rows × 23 columns</p>
    </div>



Power Tools – Scatter Matrix
----------------------------

It would be pretty tedius to look at all the different pairs of things
we might want to look at for correlation one at a time, but we can Use a
scatter matrix to make life easier.

.. code:: python3

    alt.Chart(wd).mark_circle().encode(
        alt.X(alt.repeat("column"), type='quantitative'),
        alt.Y(alt.repeat("row"), type='quantitative'),
        color='Region:N'
    ).properties(
        width=150,
        height=150
    ).repeat(
        row=['Birthrate', 'Deathrate', 'Infant mortality', 'GDP'],
        column=['Birthrate', 'Deathrate', 'Infant mortality', 'GDP']
    ).interactive()




.. image:: WorldFactbook_files/WorldFactbook_45_0.png



.. code:: python3

    list(reversed(['a','b']))





.. parsed-literal::

    ['b', 'a']




Developing Fluency
~~~~~~~~~~~~~~~~~~

Pandas will only become a part of your daily workflow when you develop
fluency with the basics. You need to be able to do easy queries without
having to think hard about the syntax. The only way that happens is
through repetition. Lots of repetition and ideally that repetitive
practice is spread out over time.

That doesn’t mean you can’t go on and do lots of much harder things, it
just means it will take longer at first as you have to go back and
review documentation in order to become efficient.

Practice Questions
------------------

1. What are the top 10 countries with the largest GDP?
2. What are the top 20 countries by Population?
3. What are the 10 countries with the largest net migration?
4. What is distribution of Argiculture, Industry, and service for the
   countries in Western Europe?
5. What are the names, population and Area of the 5 largest (by area)
   landlocked countries?
6. What are the names and population of the five most populous
   landlocked countries?
7. What what is the name and GDP of the 10 countries with the most cell
   phones/1000 people?
8. What are the 10 countries with the largest GDP that have a “Wet
   Tropical” climate?


**Lesson Feedback**

.. poll:: LearningZone_6_2
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_6_2
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_6_2
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_6_2
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...
