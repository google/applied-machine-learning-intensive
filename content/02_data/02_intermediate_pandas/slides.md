---

marp: true

---

<style>
img[alt~="center"] {
  display: block;
  margin: 0 auto;
}
</style>

# Intermediate Pandas

<!--
Welcome to Intermediate Pandas. At this point in the course you should be
familiar with Pandas Series and DataFrame objects. If these words are
unfamiliar to you, you probably want to go back and revisit the Introduction to
Pandas unit.
-->

---

# Why more Pandas?

* Grouping
* Filtering
* Sorting
* ... and more!

<!--
You might be asking, "Why more Pandas? I'm ready to do some data science!"
Well, it turns out that quite a bit of the work in data science and machine
learning involves getting quality data ready to feed into our models. Pandas is
a toolkit you'll regularly see used for this part of the data science pipeline.

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
First, we will explore a few more ways to get information about a DataFrame. One
of the most basic is the `.shape` property of a DataFrame.

What is shape?

Shape is a property of a DataFrame that lets you know the number of rows and
columns in the DataFrame. Returns a tuple with dimensions of DataFrame.
Specifically, (# rows, # columns).

If you know about NumPy, then you may recall that NumPy has a `.shape` attribute
on NumPy arrays. Pandas `.shape` has the same functionality. The primary
difference is that NumPy supports n-dimensional matrices where n can be greater
than two, while Pandas' DataFrame objects typically just have two dimensions:
rows and columns.
-->

---

# Columns

```python
print(df.columns) # Index(...)
```

<!--
DataFrames are typically thought of as tabular structures containing rows and
columns. Rows are often indexed by number (but not always), while columns
typically have meaningful names like, 'Games Played' or 'Square Meters.'

Monotonically increasing numbers are easy enough to iterate over, but
arbitrarily-named columns are a different story.

Sometimes it is useful to know all of the names of the columns in a DataFrame.
To get this information you can use the `.columns` property of the DataFrame.
This returns an `Index` object that allows you to iterate over all of the column
names of the DataFrame in left-to-right order.

`Index` is a Pandas object, but it is also a Python iterable. This allows you to
loop over the columns' names, extract them into a list, or perform any other
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
measures. Instead, we'll address them in examples throughout the course.
-->

---

# Filtering

Selectively include or exclude specific rows or columns

<!--
Filtering is a powerful operation that allows us to selectively include or
exclude specific rows or columns.

Let's start by taking a look at row filtering.
-->

---

# Filtering: Rows

![center](res/table_for_row_filter.png)

<!--
In this slide we see data from a DataFrame.
The DataFrame has four rows and five columns, so df.shape would return (4,5).
Let's say that we would like to find people with more than two dogs.
How would we do that?

Image Details:
* [table_for_row_filter.png](https://opensource.google/docs/copyright/): Copyright Google
-->

---

# Filtering: Rows

```python
df[df['num_pet_dogs'] > 1]
```

![center](res/table_more_than_two_dogs.png)

<!--
Here we have put the expression `df['num_pet_dogs'] > 1` inside another selector
for `df`. The inner-expression creates a "boolean index," which is an index that is
the same length as the DataFrame (in this case the length is 4), where an entry is True if num_pet_dogs > 1.
For this specific example,`df['num_pet_dogs'] > 1` returns an index with entries True, False, True, False.
Then we take df[boolean index], and this selects the rows for which the boolean value is True.

Note that a DataFrame is returned. You may want to assign this to a new variable to work with it further.
This filtering is not done in place and does not modify the original DataFrame, df.

Image Details:
* [table_more_than_two_dogs.png](https://opensource.google/docs/copyright/): Copyright Google
-->

---

# Filtering: Columns

![center](res/table_for_column_filter.png)

<!--
It is also possible to filter out columns of data. In the pictured DataFrame
there are pieces of personally identifiable information that could be used to
locate someone. If we wanted to make the data a little more anonymous, we could
filter out the 'last_name' and 'state' columns.

How would we do that?

Image Details:
* [table_for_column_filter.png](https://opensource.google/docs/copyright/): Copyright Google
-->

---

# Filtering: Columns

```python
df[[‘first_name’, ‘num_pet_dogs’, ‘num_pet_cats’]]
```

![center](res/table_less_pii.png)

<!--
To filter by columns, we can also use the DataFrame selector. Instead of passing
in a boolean index, we pass in a list of strings that match the column names that
we want to keep.

Image Details:
* [table_less_pii.png](https://opensource.google/docs/copyright/): Copyright Google
-->

---

# Filtering: Logical Operators

Boolean Operator | Boolean Index Operator
-----------------|-----------------------
`and`            | &
`or`             | |
`not`            | ~

<!--
You are likely familiar with the boolean operators `and`, `or`, and `not` found
in standard Python. You can use the operators to make expressions like:

```python
price > 70 and weight < 5
```

You can do similar things with Pandas boolean indices; however, you can't use
the standard `and`, `or`, and `not` operators. Instead, you must use the more
terse `&`, `|`, and `~`.

You might recognize these as the bitwise boolean operators. Pandas has
overridden these operators to be logical boolean operators for boolean indices.
-->

---

# Filtering: Logical Operators

```python
(df['Price'] > 70) & (df['Weight'] < 5)
```

<!--
Here you can see logical operators in action. We are looking at the 'Price'
column of a DataFrame object and creating a boolean index that is `True` when
the price is greater than 70. We are also creating a boolean index that is
`True` when the weight is less than 5. The `&` operator is then used to combine
these indices into a single index.

You might notice that we put parentheses around each boolean expression. This is
because the precedence for `&`, `|`, and `~` is higher than `>` and `<` so we
must add parenthesis to ensure that the `>` and `<` happen first.
-->

---

# Grouping

Condensing rows within a `DataFrame`

<!--
Often you can gather insights about the data in a `DataFrame` by condensing
many rows into one. This is called "grouping." Let's start by looking at an
example using renderings of tables.
-->

---

# Grouping

![center](res/table_to_group.png)

<!--
Here we have a `DataFrame` that contains pet owner data at an individual level.
Say we want to know which state has the most cats and dogs per pet owner. To do
that we can **group** our rows by state and find the mean count of cats and dogs
per owner per state.

How would we do that?

Image Details:
* [table_to_group.png](https://opensource.google/docs/copyright/): Copyright Google
-->

---

# Grouping

```python
df.groupby(‘state’).mean()
```

![center](res/table_grouped.png)

<!--
The `DataFrame` object has a method called `groupby()` that allows us to group
data by the column name or names passed to it. In this case we grouped by
'state' and then calculated the mean.

From the results we can see that Texas is the clear winner on 'pets per pet
owner.'

There are many other statistics that we can gather when grouping data in a
`DataFrame`. These include min, max, count, standard deviation, and more.

Image Details:
* [table_grouped.png](https://opensource.google/docs/copyright/): Copyright Google
-->

---

# Grouping: Multiple Statistics

```python
df.groupby('Age').agg({
    'Height': 'mean',
    'Weight': ['max', 'min'],
})
```

<!--
In the example we saw earlier, we calculated the mean for every numeric
column in a `DataFrame`. Often you'll want different statistics for different
columns, or even multiple statistics for some columns.

Here you can see that we are grouping by 'Age' and calculating different
statistics for the 'Height' and 'Weight' columns. We are doing this by passing a
dictionary of aggregation requests to the `agg()` function.

-->

---

# Merging

Combining two or more `DataFrame` objects

<!--
So far we have worked with individual `DataFrame` objects. Often the data that
we will work with will be stored in multiple sources. In these cases it is often
useful to **merge** the data in order to process it.

In order to merge data, a common **key** must exist between the `DataFrame`
objects to be merged. By default, Pandas considers matching column names to be
matching keys.

Let's look at an example.
-->

---

# Merging

![center](res/tables_to_merge.png)

<!--
Here is an illustration of two `DataFrame` objects that we'd like to merge. One
contains the name, state, and pet data that we are familiar with. The other
contains first names and a count of the number of children that each person has.

You can see that 'first_name' is the common column between the two tables.

Let's see how Pandas would merge these tables.

Image Details:
* [tables_to_merge.png](https://opensource.google/docs/copyright/): Copyright Google
-->

---

# Merging

```python
pd.merge(df1, df2)
```

![center](res/tables_merged.png)

<!--
Here we can see the call to `merge()`. It accepts two `DataFrame` objects and
merges them on common column names. In this case, 'first_name'.

Image Details:
* [tables_merged.png](https://opensource.google/docs/copyright/): Copyright Google
-->

---

# Merging

![center](res/tables_to_merge_uneven.png)

<!--
What about this case? We have four rows in one table and three in the other.
'Seo-yeon' is missing from the table that counts children. If you remember from
our previous slide, Seo-yeon had a zero-count of children. It is common for rows
with zero values to be missing from tables.

Any guesses on what happens?

Image Details:
* [tables_to_merge_uneven.png](https://opensource.google/docs/copyright/): Copyright Google
-->

---

# Merging

```python
pd.merge(df1, df2)
```

![center](res/tables_merged_uneven.png)

<!--
In this case we completely lost the record of Seo-yeon! Since Pandas couldn't
find a match, it didn't include the datapoint.

This is standard join functionality. There are ways to get around this, though.

Image Details:
* [tables_merged_uneven.png](https://opensource.google/docs/copyright/): Copyright Google
-->

---

# Merging

```python
pd.merge(df1, df2, how='outer')
```

![center](res/tables_merged_outer.png)

<!--
You can instruct Pandas to keep the data in one or both of the tables in a join.
This is called an outer join. There is a left-outer join that keeps unmatched
rows in the left table. There is a right-outer join that keeps unmatched rows in
the right table. And then there is the full outer join, which you see here, that
keeps unmatched rows found in both tables.

In any of the outer join cases, missing data is filled in with null values.
`NaN` for numbers. `None` for strings and other objects.

Image Details:
* [tables_merged_outer.png](https://opensource.google/docs/copyright/): Copyright Google
-->

---

# Sorting

Ordering the values in a `DataFrame`

<!--
Another way of modifying a `DataFrame` is to sort the data contained in it.
Sorting can be done in an ascending or descending manner. Sorting can be
performed on one or more columns.

Let's look at an example.
-->

---

# Sorting

![center](res/table_to_sort.png)

<!--
Again we have the name-state-pets table that we've seen in this presentation.
Let's say we want to view that data sorted by the number of cats owned by
each person in ascending order.

How would we do that?

Image Details:
* [table_to_sort.png](https://opensource.google/docs/copyright/): Copyright Google
-->

---

# Sorting

```python
df.sort_values('num_pet_cats')
```

![center](res/table_sorted.png)

<!--
Here we can see the `sort_values()` method in use. We have asked to sort by the
'num_pet_cats' column. The default sort order is ascending.

Image Details:
* [table_sorted.png](https://opensource.google/docs/copyright/): Copyright Google
-->

---

# Sorting: Multiple Columns

```python
df.sort_values(['num_pet_dogs', 'num_pet_cats'])
```

<!--
There are many other options for sorting. For instance, we can sort on multiple
columns as seen in this example. First the `DataFrame` will be sorted by the
number of pet dogs. The next level of sorting is by the number of pet cats.
-->

---

# Sorting: Modifying the `DataFrame`

```python
df = df.sort_values('num_pet_cats')

df.sort_values('num_pet_cats', inplace=True)
```

<!--
Also, sorting doesn't actually modify the `DataFrame`, but instead creates a
view into the `DataFrame`. If we actually want to modify the `DataFrame` we can
either assign the result of `sort_values()` back to the original `DataFrame` or
we can pass an `inplace=True` argument to `sort_values()`.
-->

---

# References vs Copies

```python
df = pd.DataFrame(...)
df2 = df # Reference
df2.sort_values('num_pet_cats', inplace=True)
```
<!--
When working with `DataFrame` objects it is often important to know when you are
working with a reference-to or copy-of the original `DataFrame`.

Take, for instance, this example. We create a new `DataFrame`, `df`, and then
store a reference to the original `DataFrame` in the variable `df2`. When we then
ask to sort `df2` and modify it in-place, we change the original `DataFrame`.
-->

---

# References vs Copies

```python
df = pd.DataFrame(...)
df2 = df.copy() # Copy
df2.sort_values('num_pet_cats', inplace=True)
```

<!--
If we want to leave the original `DataFrame` intact, we can make a copy of it
and then work with the copy. Be warned that this can be slow and
memory-intensive on large `DataFrame` objects.

Often you don't have to worry whether you're working with a reference or a
copy. Pandas strives to be efficient and will use references or views, depending 
on which makes most sense in most cases. But sometimes the abstractions break down,
and you need to know a little more about what specific data you are working with.
-->
