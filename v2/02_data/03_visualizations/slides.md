# Visualizations

A powerful way to identify patterns in data that otherwise can be hard to find and analyze

<!--
One of the most important things in machine learning is understanding your
dataset. Visualizations provide us with a powerful tool to analyze and gather
patterns to better understand our datasets. There are many varieties of
visualizations, and in this lecture we will go over some of the most common
visualizations. We will show scenarios when each visualization is useful.

To start, we want to examine a scenario when a visualization is particularly helpful.
-->

---

# Visualizations: Raw Data

What patterns can you see in these raw data of common PIN numbers?

{.column}

![](res/pins.png)

<!--
Here you can see a dataset containing PIN numbers. Given the raw data shown, can
you see any patterns?

Not really. You may notice that 1111 is repeated a few times,
but other than that it's difficult.

Image Details:
* [pins.png](http://www.google.com): Copyright Google
-->

---

# Visualizations: Heatmap

![](res/heatmap.png)

<!--
Here we have a heatmap of the PIN numbers in the previous dataset. The first two
digits are along the x-axis and the last two digits are along the y-axis. In
this particular map yellow means that the pattern occurs more often.

What patterns do you see?

Note that the dark square on the right represents a very unpopular PIN.

Image Details:
* [heatmap.png](http://www.google.com): Copyright Google
-->

---

# Visualizations: Heatmap

![](res/heatmap-repeat.png)

<!--
Here we see that repeated pairs of numbers are common. This is shown by the
diagonal line.

Image Details:
* [heatmap-repeat.png](http://www.google.com): Copyright Google
-->

---

# Visualizations: Heatmap

![](res/heatmap-year.png)

<!--
Here we see that using a year in the 1900s is pretty common too.

Image Details:
* [heatmap-year.png](http://www.google.com): Copyright Google
-->

---

# Visualizations: Heatmap

![](res/heatmap-01.png)

<!--
Small numbers are also very popular. There tend to be lots of zeros and ones at
the start and end of PINs.

Image Details:
* [heatmap-01.png](http://www.google.com): Copyright Google
-->

---

# Visualizations: Chart Types

![](res/charts.png)

<!--
There are many different types of charts. This is just a sample of types of
charts that you might see to visualize data.

Image Details:
* [charts.png](http://www.google.com): Copyright Google
-->

---

# Visualizations: Pie Charts

![](res/pie-chart.png)

<!--
Pie Charts are good for representing percentages of a whole. Pie charts are great for representing data that is in the form of fractions adding up to one or percentages adding up to 100. They create a natural comparison between portions of a whole.

Image Details:
* [pie-chart.png)(http://www.google.com): Copyright Google
-->

---

# Visualizations: Pie Charts

![](res/bad-pie-chart.png)

<!--
Pie charts cannot be used for all data, and they can create misleading conclusions.

Problems:
* creating percentages where they're not necessary or helpful, solely to put it into the visualization
* the states have separate budgets, so this visualization indicates correlation when there is none

Think pair share: How could it be better represented?
It would appear better as a bar chart, comparing the pieces side-by-side, rather than as parts of a whole.

Image Details:
* [bad-pie-chart.png](http://www.google.com): Copyright Google
-->

---

# Visualizations: Bar Charts

![](res/bar-chart.png)

<!--
Bar charts can help compare categorical data.

The same data is much easier to see and compare in a bar chart form!

Why:
* You can see the actual number and not the arbitrary percentage because bar charts have axes
* Easier to compare between them, as seeing them side by side gives a better natural comparison

In general bar charts are good for representing categorical data, as the x-axis can be used to represent categories very easily, and the bars create a natural comparison between categories.

Image Details:
* [bar-chart.png](http://www.google.com): Copyright Google
-->

---

# Visualizations: Bar Charts

![](res/bad-bar-chart.png)

<!--
For continuous data, bar charts might not be the best choice.

Problems:
* Unable to put specific times, just within an hour in general. So it could be more specific.
* Unable to gather many trends from this other than which hour had the highest or lowest temperature is most popular
* Hours are continuous, whereas separated bars like this give the impression that for an entire hour the temperature was the same.

Context around it makes it bad; if you want a max from the hours of the temperature, this would be good. But if you want to predict temperatures, etc, this is bad.

Also, usually bar charts go in descending order of size but since these x values have a meaningful ordering we can’t properly construct the chart

Image Details:
* [bad-bar-chart.png](http://www.google.com): Copyright Google
-->

---

# Visualizations: Line Charts

![](res/line-chart.png)

<!--
Line graphs can help estimate missing data points and find trends.

This is a much more useful visualization than the bar chart!

Why:
* Shows a relationship between the two things that is relevant and helpful!
* This relationship can now be fit mathematically
* Now we can estimate missing points and make predictions!
* We can use the meaningful ordering on the x-axis to actually make a prediction, whereas bar charts are usually organized in decrementing order of size.

In general for data that could be well fit with a function (i.e. an x,y category where every x has just one correlating y value that strongly correlate in a mathematical way), a line graph is a fantastic choice. It allows you to make inferences on what values would be that weren’t in the original dataset, expanding your ability to analyze your data.

Image Details:
* [line-chart.png](http://www.google.com): Copyright Google
-->

---

# Visualizations: Line Charts

![](res/bad-line-chart.png)

<!--
When there are multiple data points for the same place on the x-axis, line charts are not as useful.

Problems:
* Students with different study habits will have different GPAs, despite studying the same amoun, and vice versa. A visualization with a continuous line masks these values.
  * These values could have been interesting to analyze and -- without losing the ability to see other trends -- this can be encapsulated in other visualizations.
* Indicates a continuous correlation where there might not be one.
  * Ex. Does an extra ½ hour of work per day really boost you an extra little bit on GPA, or is it actually that you have to jump to a whole hour?
  * These gaps are missing when seeing it as a continuous line.

Image Details:
* [bad-line-chart.png](http://www.google.com): Copyright Google
-->

---

# Visualizations: Scatter Plots

![](res/scatter-plot.png)

<!--
Scatterplots can help show correlations between two variables.

Why:
* Much more clear where the gaps, overlaps, and groups form
* We are still able to grasp the general trends (lose very little value) without the line and now we also have more possibilities for analysis!

In general if you have x,y data where you have multiple y values for every x, a scatter plot is a good choice as it allows you to see all the data clearly and doesn’t average out y values for a given x like a line graph would.

Image Details:
* [scatter-plot.png](http://www.google.com): Copyright Google
-->

---

# Visualizations: Scatter Plots

![](res/bad-scatter-plot.png)

<!--
When there is too much data, a scatterplot will not be useful.

Problems:
* Too many points to draw conclusions
* There may be a higher concentration of points in some areas, but in this format we cannot tell

Image Details:
* [bad-scatter-plot.png](http://www.google.com): Copyright Google
-->

---

# Visualizations: Heat Maps

![](res/heat-map.png)

<!--
Heatmaps are good for visualizing concentrated, continuous data.

Why:
* We can now see the maximums and minimum amounts, where before we could only estimate
* We can better analyze trends when we know the concentrations of points in each area

In general heatmaps are good when you have lots of overlapping points in an x,y format. It allows you to see trends in very large datasets, and can often be overlayed on maps or other graphics to show concentrations in an even clearer visual format.

Think Pair Share: We can imagine a heatmap wouldn’t work as well for other types of data. What types wouldn’t be as good with a heatmap?

Answers:
* Categorical data
* Data with a linear (or other basic math) correlation (an x,y category that strongly correlate in a mathematically easy to fit way)
* Data with representing different proportions of a whole (percentages)

Image Details:
* [heat-map.png](http://www.google.com): Copyright Google
-->

---

# Which Visualization is Best?

Which type of visualization do you think would best represent following data?

* Line chart
* Bar chart
* Scatter Plot
* Line chart or Bar Chart with averages
* Heat map
* Pie Chart

<!--

Think pair share: Discuss the possible charts that would be good for each of these types of data.

*It might be helpful to write the following list on the board, or have the students take notes, so they can reference it during their discussions with peers.*

* Line chart or bar chart depending on scope of the data
* Scatter Plot
* Line chart or Bar Chart w/averages?
* Heat map - maybe on a US map
* Pie Chart

-->

---

# Which Visualization is Best?

Which type of visualization do you think would best represent the data below?

![](res/candy-count.png)

<!--
Quickly look at the data come up with a prediction for which type of visualization should be used.

Image Details:
* [candy-count.png](http://www.google.com): Copyright Google
-->

---

# Which Visualization is Best?

Which visualization best represents the data?

![](res/candy-count-charts.png)

<!--
Think pair share: Which visualizations work well? Which work poorly?

Pie Chart - could work, good if you want to see how the bag has been portioned out as a whole
Bar Chart - could work, good because the data is categorical better for analysis between individual candy types
Scatter Plot - not good, draws correlation + x axis has no meaningful ordering
Line Graph - not good, draw a correlation where there is none in the space between chocolate types - masks the true values

Image Details:
* [candy-count-charts.png](http://www.google.com): Copyright Google
-->

---

# Which Visualization is Best?

Average monthly revenues for a small business

```
January: $15,000 | February: $17,500 | ...
```

<!--
What are the possible charts that would be good for this data?

*Line chart or bar chart depending on scope of the data.*
-->

---

# Which Visualization is Best?

Times for running a program based on input length

```
6 digits: 1:34:07 | 6 digits: 1:26:55 | 7 digits: 2:13:47
```

<!--
What are the possible charts that would be good for this data?

*Scatter plot*
-->

---

# Which Visualization is Best?

Driving times compared to minute when left house

```
8:00am: 15 mins | 8:01am: 17mins
```

<!--
What are the possible charts that would be good for this data?

*Line chart or bar chart with averages*
-->

---

# Which Visualization is Best?

Concentration of hardware stores by geographical location

```
(latitude, longitude) pairs
```

<!--
What are the possible charts that would be good for this data?

*Heat map, possibly geographical heat map*
-->

---

# Which Visualization is Best?

Student poll responses to the question: “Do you live on or off campus?”

<!--
What are the possible charts that would be good for this data?

*Pie chart*
-->

---

# Visualizations: Matplotlib & seaborn

![](https://matplotlib.org/_static/logo2_compressed.svg)

<!--
So how do we build these visualizations?

There are actually many toolkits for building visualizations that range from
low-level libraries where you are rending shapes manually to automated systems
that you feed data and get a chart back.

One library that you'll often see used in data science is
[Matplotlib](https://matplotlib.org/). Matplotlib is a classic visualization
can produce two-dimensional charts using Python.

Another library that you'll often see is
[seaborn](https://seaborn.pydata.org/). Seaborn is built on top of Matplotlib
and can produce eye-pleasing charts easily.

In the lab you'll get to use both to create the types of charts that we've
discussed in this lecture.

Image Details:
* [logo2_compressed.svg](https://matplotlib.org/): Externally Linked
-->


