.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


Predicting Bike Rentals
=======================

The data we will use in this chapter is used with the permission of Capital
Bikeshare. You can download the data from
`their website <https://www.capitalbikeshare.com/system-data>`_. We are using a
prepared version of this data that has already been augmented with additional
weather data which you can download from the
`UCI Machine Learning Repository <https://archive.ics.uci.edu/ml/datasets/bike+sharing+dataset#>`_.

Predicting bike rental trends is very important from both an operational and
planning perspective. Bikeshare companies need to stay up to date on rental
trends to know where they should add new facilities, and how to reposition bikes
to get them to the locations with the highest demand. They do not want to wait
until all of the bikes are rented at a particular location before moving
additional bikes into position, as that is lost revenue for them.

Both ``hour.csv`` and ``day.csv`` have the following fields (with the exception
of ``hr`` which is not available in ``day.csv``).

- ``instant``: record index
- ``dteday``: date
- ``season``: season (1:spring, 2:summer, 3:fall, 4:winter)
- ``yr``: year (0: 2011, 1:2012)
- ``mnth``: month (1 to 12)
- ``hr``: hour (0 to 23)
- ``holiday``: whether day is holiday or not
- ``weekday``: day of the week
- ``workingday``: 0 if day is either weekend nor holiday is 1, otherwise 1

- ``weathersit``:

  - 1: Clear, Few clouds, Partly cloudy, Partly cloudy
  - 2: Mist + Cloudy, Mist + Broken clouds, Mist + Few clouds, Mist
  - 3: Light Snow, Light Rain + Thunderstorm + Scattered clouds, Light Rain +
    Scattered clouds
  - 4: Heavy Rain + Ice Pellets + Thunderstorm + Mist, Snow + Fog

- ``temp``: Normalized temperature in Celsius
- ``atemp``: Normalized feeling temperature in Celsius
- ``hum``: Normalized humidity
- ``windspeed``: Normalized wind speed
- ``casual``: count of casual users
- ``registered``: count of registered users
- ``cnt``: count of total rental bikes including both casual and registered


`You can read about UCI's work with this data set here. <https://link.springer.com/article/10.1007/s13748-013-0040-3>`