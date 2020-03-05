# Intro to Scikit Learn

---

[Scikit-Learn](https://scikit-learn.org) {.big}

![](res/introtoscikit1.png)

<!--
* scikit-learn.org is the primary website for the scikit-learn project. Here you will find information pertaining to the project including instructions on installation, documentation, and even the project source code.
* Let's take a few moments to look around the project website.
* *At this point, be sure to point out...*
  * The classification, regression, clustering, dimensionality reduction, model selection, and preprocessing sections on the main page. These represent core groupings of features provided by scikit-learn.
  * The top-page navigation with links on how to install the toolkit, documentation, and examples.
  * The banner on the upper-right corner that says "Fork me on GitHub". This leads to the source code.
  * That when you click the 'Documentation' drop-down in the upper navigation it tells you the current stable version and has a link to 'All available versions'. Be sure that the students know the version of scikit-learn they are working with once they start the colab.
  * That the 'Examples' linked to in the top navigation are not just API usage examples, but that they also contain some interesting machine learning insights.
-->

---

# Datasets

<!--
scikit-learn comes with support for acquiring and generating datasets. The library even comes packaged with some datasets that are commonly used for exploring new models.
Let's look at some of the ways you can acquire data with scikit-learn.
-->

---

# Loading

![](res/introtoscikit2.png)

<!--
scikit-learn has a few datasets that are installed alongside the library. To access these datasets you can rely on load functions like the load_iris function shown in this example.
-->

---

# Fetching

![](res/introtoscikit3.png)

<!--
Some common datasets aren't installed alongside scikit-learn, but the library does know how to access them. For these datasets we use 'fetch' functions which pull the dataset down from the internet if necessary.
-->

---

# Generating

![](res/introtoscikit4.png)

<!--
Some common datasets aren't installed alongside scikit-learn, but the library does know how to access them. For these datasets we use 'fetch' functions which pull the dataset down from the internet if necessary.
-->

---

# Bunches

<!--
Bunch objects are scikit-learn objects that are sometimes used to store datasets. If you find yourself using a load or fetch method, you'll likely encounter a bunch object.
The colab goes into more details on Bunch objects and explores the data store within them. You'll encounter data that is composed of named features, as well as, target values paired with sets of features.

For the most part in this course, we will convert scikit-learn Bunch objects into Pandas DataFrame objects or TensorFlow DataSet objects. The aforementioned objects work a little more intuitively with the methods and frameworks that we'll cover in this course.
-->

---

# Estimators

![](res/introtoscikit5.png)

<!--
Most of the models in scikit-learn are considered estimators. An estimator is expected to implement two methods: fit and predict.
* fit is used to train the model. At a minimum it is passed the feature data used to train the model. In supervised models it is also passed the target data.
* predict is used to get predictions from the model. This method is passed features and returns target predictions.
-->

---

# Transformers

![](res/introtoscikit6.png)

<!--
In practice it is rare that you will get perfectly clean data that is ready to feed into your model for training. Most of the time, you will need to perform some type of cleaning on the data first.
Transformers implement fit and transform methods. The fit method calculates parameters necessary to perform the data transformation. transform actually applies the transformation. There is a convenience fit_transform method that performs both fitting and transformation in one method call.
-->

---

# Pipelines

![](res/introtoscikit7.png)

<!--
It isn't a coincidence that transformers have fit and transform methods and that models have fit methods. The common interface across classes allows scikit-learn to create pipelines for data processing and model building.

A pipeline is simply a series of transformers, often with an estimator at the end.
-->

---

# Metrics

![](res/introtoscikit8.png)

<!--
Scikit-learn also comes with many functions for measuring model performance in the metrics package.
In this case we are calculating the "mean squared error". Don't worry too much about what that means for now. We have a unit dedicated to calculating error in your models that you will see soon.
-->

---

# Your Turn

<!--
Scroll through the colab associated with this unit. Be sure to point out the exercise, the number of points available, and the grading scale.
-->
