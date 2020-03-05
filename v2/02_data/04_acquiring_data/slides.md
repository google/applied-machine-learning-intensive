# Acquiring Data

<!--
So far we have only worked with tiny datasets that we have hard-coded into our
labs. As we begin to move deeper into data science we will need to work with
larger and more complex datasets. In order to do that, we need to know how to
get the datasets into our Colab environments.

Remember that Colab is running "in the cloud," so for it to process data you
have to get that data onto the server that Colab is running on.

We'll cover a few ways of doing that in this lecture.
-->

---

# Uploading Data

<!--
One of the most straight-forward ways of getting data into Colab is to upload it
into the lab. If you have a file on your machine and want to get it into Colab
you can do so with just a few clicks.

Let's walk through an example.
-->

---

# Uploading Data

Click on the "Files" icon.

![](res/files.png)

<!--
First, click on the 'Files' icon on the left side of the screen.

Image Details:
* [files.png](http://www.google.com): Copyright Google
-->

---

# Uploading Data

![](res/upload.png)

<!--
Next, click on the 'Upload' link.

Image Details:
* [upload.png](http://www.google.com): Copyright Google
-->

---

# Uploading Data

![](res/file-selector.png)

<!--
You will then be presented with a file selector dialog box. Find the file on
your local machine and then press the 'Open' button.

Image Details:
* [file-selector.png](http://www.google.com): Copyright Google
-->

---

# Uploading Data

![](res/warning.png)

<!--
The first time you upload a file to an active lab you will see a warning telling
you that the files won't stick around forever. Colab environments run for a
fixed amount of time, less than a day, and then the environment gets recycled.

For this class and for small data science and machine learning projects, this is
okay. For longer-running projects, there are ways to point Colab at a different
environment. You can also download Colab notebooks and run them in Jupyter on a
machine that can store the files longer-term.

Do be warned, though, if you do a lot of processing on data and save that data to
a file, you will want to download the file before the Colab environment gets
recycled.

Image Details:
* [warning.png](http://www.google.com): Copyright Google
-->

---

# Uploading Data

![](res/uploaded-files.png)

<!--
Once your file is uploaded, you will be able to see it in the left 'Files' panel
of Colab.

Image Details:
* [uploaded-files.png](http://www.google.com): Copyright Google
-->

---

# Uploading Data

![](res/root-folder.png)

<!--
If at any time you end up seeing a list of files and folders like this then you
clicked on the 'Parent Directory' link instead of the 'Upload' link. This moves
you from the `/content/` folder on the virtual machine to the `/` (root) folder.

From the root folder you can browse other folders like `/content/`, but any
uploads you do will go to root and not to `/content/`.

Why does this matter?

Image Details:
* [root-folder.png](http://www.google.com): Copyright Google
-->

---

# Uploading Data

```python
df = pd.read_csv('data.csv')    # Reads /content

df = pd.read_csv('../data.csv') # Reads /
df = pd.read_csv('/data.csv')   # Reads /
```

<!--
The landing spot of the file effects the way you then read the file into a
`DataFrame`. By default Colab considers `/content/` to be the working directory
so if you upload data to `/content/` you can read it directly as shown in the
first example of this slide. If you upload data to root you have to use the
`../` syntax to read from the parent directory or the `/` syntax to read from
root.
-->

---

# Uploading Data

![](res/to-cloud.png)

<!--
Let's think about what is happening when we are uploading data to Colab. We have
the data on our local computer and then we copy/upload that data to Colab
running on the cloud.

Image Details:
* [to-cloud.png](http://www.google.com): Copyright Google
-->

---

# Uploading Data

![](res/to-from-cloud.png)

<!--
It is actually even more likely, especially in this class, that you are
downloading data from the internet and then uploading that data back to Colab.

For small files this might be okay, but for large files this can be slow.
Especially in a classroom setting where many of us are uploading and downloading
large files at the same time

For small files this might be okay, but for large files this can be slow.
This is especially true in a classroom setting where many of us are uploading
and downloading large files at the same time. A session of this class actually
crashed the network at one of the schools where it was taught!

Image Details:
* [to-from-cloud.png](http://www.google.com): Copyright Google
-->

---

# Uploading Data

![](res/cloud-to-cloud.png)

<!--
Luckily, there are numerous ways to move data around without ever having to
bring it down to your local computer. You can write code in Colab to perform
"cloud-to-cloud" data transfers. This reduces the number of times that the data
is copied and keeps the data from having to transfer over your network
connection.

Image Details:
* [cloud-to-cloud.png](http://www.google.com): Copyright Google
-->

---

# Downloading With Python

```python
import urllib.request

urllib.request.urlretrieve(
    'http://www.example.com/data.csv',
    'data.csv')
```

<!--
It is possible to directly download data into Colab using the `urllib` library
in Python. The `urllib.request.urlretrieve` function takes two primary
arguments: a url to download and a file name to save the data into.
-->

---

# Downloading With Pandas

```python
import pandas as pd

pd.read_csv(
    'http://www.example.com/data.csv',
    names=column_names)
```

<!--
Pandas can also read data directly into a `DataFrame` using the `read_csv`
function. The only required argument is the URL to download. Another common
argument is `names=, which allows you to set column names if the data file
doesn't have them.
-->

---

# SQL

```python
import pyodbc
import pandas as pd

db_connection = pyodbc.connect(...)

query = pd.read_sql_query('''
  select * from data_table
''', db_connection)

df = pd.DataFrame(query, columns=column_names)
```

<!--
If your data is stored in a database, you can use SQL to read data into a
`DataFrame`. To do this you need to create a database connection. Then create a
query to read the data you are interested in. Finally, you can pass the query to
Pandas to create a new `DataFrame` containing the data.

We won't be working with databases much in this course, but there is a good
chance you'll encounter data in a database sometime in your data science career.
It is good to know that you can connect to the database from Python and load the
data directly into a `DataFrame`.
-->

---

# APIs

```python
import tweepy

auth = tweepy.OAuthHandler('key', 'secret')

api = tweepy.API(auth)

for tweet in api.search(q='Machine Learning'):
    print(tweet.text)
```

<!--
APIs are another common way to fetch data. Many services have APIs that you can
use to search through their data. Most of these services require that you
authenticate yourself before you use the API. Some APIs have free tiers and
for-pay tiers.

Here is an example of using the `tweepy` API to query Twitter for the term
'Machine Learning'.

You can see that we first have to authenticate and then once we authenticate we
can call the `search` functions on the API.

Every API is different. If you have a service that you want to get data from,
check and see if they have an API. Then, see if there is a Python wrapper around
that API. For example, tweepy is a library that makes working with the Twitter
API easier. Wrappers exist for many popular services, so always check before
trying to use any API directly.
-->

---

# Kaggle

![](https://www.kaggle.com/static/images/site-logo.png)

<!--
Now we'll talk about getting data from Kaggle into your Colab. We talk about
Kaggle specifically because it does require authentication to download data from
Kaggle, and we use Kaggle quite a bit in this course.

Image Details:
* [site-logo.png](https://www.kaggle.com): Externally Linked
-->

---

# Kaggle: Browser Download

![](res/kaggle-download.png)

<!--
Once you navigate to a dataset in Kaggle, you can download the dataset by
clicking the 'Download' link. If you aren't logged in, you'll be prompted to log
in first.

After you have downloaded the file to your local machine, you can then upload it
to Colab.

Image Details:
* [kaggle-download.png](http://www.google.com): Copyright Google
-->

---

# Kaggle: Command Line

```shell
kaggle datasets download rtatman/chocolate-bar-ratings
```

<!--
You can also use the `kaggle` command to directly download a dataset into Colab,
bypassing the need to download the dataset to your computer.

You can add an example of downloading a dataset on this slide. You run the `kaggle`
shell command. This program can work with numerous Kaggle objects such as
contents, notebooks, and datasets. In this case we are working with datasets. We
then say that we want to download a dataset. Finally, we tell the command the
dataset that we want to download.

Note that there is some setup required before running `kaggle`. You'll need to
get API credentials from Kaggle and store them in your lab. Instructions for
doing that are in the lab for this unit.
-->
