..  Copyright (C)  Google, Runestone Interactive LLC
    This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/4.0/.


Instacart Market Basket Analysis
================================

Instacart is a shopping and delivery service that works with stores in
your city such as whole foods or Costco or stores that are more local to
your city or region. They will pick up your order and deliver it to your
door. Consequently they have a lot of data on a lot of different
shopping behavior that we can use to make predictions about future
purchases or suggest items that a person may want to add to their
shopping cart based on their past behavior. Sound familiar? This is the
kind of thing that Amazon has been doing successfully for years.

.. code:: python3

    %matplotlib inline

    import pandas as pd
    import matplotlib
    import matplotlib.pyplot as plt
    import numpy as np
    import seaborn as sbn
    import altair as alt
    import requests
    matplotlib.style.use('ggplot')
    sbn.set_style("whitegrid")
    import json
    import pickle
    import scipy
    alt.data_transformers.enable('json')





.. parsed-literal::

    DataTransformerRegistry.enable('json')



Reading List
------------

-  `Market Basket
   Analysis <http://pbpython.com/market-basket-analysis.html>`__
-  Item Item Recommender Systems

The Data
--------

The data we will be using in this module is shopping data from Instacart.   The Instacart Online Grocery Shopping Dataset 2017, Accessed from https://www.instacart.com/datasets/grocery-shopping-2017 on October 15, 2018.  This is a BIG data set. The largest file has over 32 million rows. We don’t want to start there as that is crazy big. So we have a
smaller file, still with 1.3 million rows that we can use to start with.

aisles.csv
~~~~~~~~~~

::

    aisle_id,aisle
    1,prepared soups salads
    2,specialty cheeses
    3,energy granola bars
    ...

departments.csv
~~~~~~~~~~~~~~~

::

    department_id,department
    1,frozen
    2,other
    3,bakery
    ...

order_products__prio.csv
~~~~~~~~~~~~~~~~~~~~~~~~

These files specify which products were purchased in each order.
``order_products__prior.csv`` contains previous order contents for all
customers. ‘reordered’ indicates that the customer has a previous order
that contains the product. Note that some orders will have no reordered
items. ``order_products_train.csv`` is much smaller (even though it has
1.3 million records) and is a better place to start.

::

    order_id,product_id,add_to_cart_order,reordered
    1,49302,1,1
    1,11109,2,1
    1,10246,3,0
    ...

orders.csv
~~~~~~~~~~

This file tells to which set (prior, train, test) an order belongs. You
are predicting reordered items only for the test set orders. ‘order_dow’
is the day of week.

::

    order_id,user_id,eval_set,order_number,order_dow,order_hour_of_day,days_since_prior_order
    2539329,1,prior,1,2,08,
    2398795,1,prior,2,3,07,15.0
    473747,1,prior,3,3,12,21.0
    ...

products.csv
~~~~~~~~~~~~

::

    product_id,product_name,aisle_id,department_id
    1,Chocolate Sandwich Cookies,61,19
    2,All-Seasons Salt,104,13
    3,Robust Golden Unsweetened Oolong Tea,94,7
    ...



