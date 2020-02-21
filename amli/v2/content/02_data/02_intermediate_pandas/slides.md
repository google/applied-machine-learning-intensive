# Intermediate Pandas

<!--
Welcome to 'Intermediate Pandas'. At this point in the course you should be
familiar with Pandas' Series and DataFrame objects. If these words are
unfamiliar to you, you probably want to go back and revisit the 'Introduction to
Pandas' unit.
-->

---

# Why more Pandas?

* Grouping
* Filtering
* Sorting
* ... and more!

<!--
You might be asking, "Why more Pandas? I'm ready to do some data science!".
Well, it turns out that quite a bit of the work in data science and machine
learning involves getting quality data ready to feed into our models. Pandas is
a toolkit that you'll regularly see used for this part of the data science
pipeline.

In this unit we will take a closer look at DataFrames. We will learn more ways
to explore the data in a DataFrame. This includes merging, grouping, filtering,
sorting, and more!
-->

---

# Shape

```python
print(df.shape) # (2452431, 8)
```

<!--
First, we will explore a few more ways to get data about a DataFrame. One of the
most basic is the `.shape` property of a DataFrame.


What is shape?

Shape is a property of a DataFrame that lets you know the number of rows and
columns in the DataFrame. You might remember that NumPy has a `.shape` attribute
on NumPy arrays. Pandas `.shape` has the same functionality. The primary
difference is that NumPy supports n-dimensional matrices where n can be greater
than two while Panda's DataFrame objects typically just have two dimensions:
rows and columns.
-->

---

# Columns

```python
print(df.columns) # Index(...)
```

<!--
DataFrames are typically thought of as tabular structures containing rows and
columns. Rows are often indexed by number (but not always) while columns
typically have meaningful names like 'Games Played' or 'Square Meters'.

Monotonically increasing numbers are easy enough to iterate over, but
arbitrarily-named columns are a different story.

Sometimes it is useful to know all of the names of the columns in a DataFrame.
To get this information you can use the `.columns` property of the DataFrame.
This returns an `Index` object that allows you to iterate over all of the column
names of the DataFrame in left-to-right order.

`Index` is a Pandas object, but it is also a Python iterable. This allows you to
loop over the columns names, extract them into a list, or perform any other
iterable operation supported by Python.
-->

---

# Missing Values

```python
df.isna()
```

<!--
It is common to find instances of missing data in datasets. Pandas provides the
`.isna()` utility to help you find missing data. `.isna()` examines the data in
a DataFrame and returns a DataFrame containing boolean values: True if the data
is missing and False if the data is present.

You can use this to find missing data that you can then act upon to clean your
dataset. At this point we won't worry about specific missing data mitigation
measures. Instead we'll address them in examples throughout the course.
-->

---

# Filtering

Selectively include or exclude specific rows or columns

<!--
Filtering is a powerful operation that allows us to selectively include or
exclude specific rows or columns.

Let's start by taking a look at row filtering.
-->

<!--
https://github.com/google/applied-machine-learning-intensive/blob/master/amli/v2/content/02_data/02_intermediate_pandas/colab.ipynb
https://docs.google.com/presentation/d/1ytJza4fWtXdOetvj1I6O1NQvoqu346foPYAXGf1YwNQ/edit#slide=id.g554695ed75_0_31
-->
