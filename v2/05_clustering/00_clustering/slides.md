---

marp: true

---

<style>
img[alt~="center"] {
  display: block;
  margin: 0 auto;
}
</style>

# Clustering

<!--
So far we have learned about two very popular machine learning techniques: regression and classification.

Regression models predict a continuous target. These are targets such as housing prices, life expectancies, salaries, etc.

Classification models predict discrete values. These can be binary, e.g. whether or not someone survived the Titanic disaster. Or they can be multi-class, e.g., which handwritten digit is drawn in an image.

In this section we are going to briefly look at clustering algorithms. These models are different from classification and regression models. The core purpose of the models is to discover relationships in datasets. These relationships provide insights we might not have been able to derive ourselves.

In this course we don't focus on clustering as much as we do regression and classification. Don't take this as a signal that clustering isn't important. Clustering algorithms are powerful, popular, and fundamental. However, they can be difficult to interpret and focus more on discovery than prediction.

Prediction is easy to measure. Think, what is the r-squared score? Or, what is the F1 score?

Clustering, though it can be measured (as we will see), is a little more nebulous. Sometimes data clusters in ways that are un-intuitive. Sometimes clusters are hard to decode.

-->

---

![center](res/clustering01.jpg)

<!--
Let's start our exploration of clustering with a hands-on exercise. The word "clustering" is fairly intuitive; you are attempting to group your data points. But what constitutes a group?

Let's start with a hands-on exercise. 

@Exercise (15 minutes) {
Break the class into groups of 3-4 students. Have each group take a pile of fasteners (or screws, bolts, pins, buttons, etc.) and divide it into six distinct groups. Then go around and ask each group to describe their process. Why did they choose these clusters? Now ask students to divide the pile into four distinct groups. Go around again and ask students to describe their process for creating these clusters. How different are they from the first clusters? Now try clustering into two groups. What changed as we lowered the number of clusters (typically denoted by k in ML)?
}

Image Details:
* [clustering01.jpg](https://pixabay.com/photos/darkness-panorama-background-3075379/): Pixabay License
-->

---

# Clustering 

<!--
"Cluster analysis or clustering is the task of grouping a set of objects so that objects in the same group are more similar to each other than to those in other groups." https://en.wikipedia.org/wiki/Cluster_analysis

How does this compare to the algorithms we have seen so far?

The algorithms we have seen so far attempt to map features to targets. Clustering instead tries to map features to class attributes.
-->

---

# Unsupervised 

<!--
We have worked with "supervised" learning so far. In supervised learning, we have "tagged" data that has been curated to train the model. For example, with classification, we knew exactly how many classes existed (e.g., three species of iris flower), and we had training data in which the species was provided for each data point. With unsupervised learning algorithms, we do not have labeled training data. The model effectively trains on unlabeled test data. When performing unsupervised clustering, we do not necessarily know the appropriate number of clusters, nor do we have a training set where the data points are labeled by their appropriate cluster.  

Clustering is typically an unsupervised process where patterns emerge from the data. It can be semi-supervised where some external data is used. Supervised clustering is basically classification.

-->

---

# k-means 

<!--
An algorithm called k-means is the most common clustering algorithm. You effectively performed a k-means in the clustering exercise earlier.

There are many more clustering algorithms, but k-means is the most common you'll see in practice.

In this algorithm, we define a distance function and use that function to separate your data into 'k' groups.

What is a good distance function? That depends on your problem statement.
-->

---

# Other Algorithms

* Affinity propagation 
* Mean-shift 
* Spectral 
* Ward hierarchical 
* Agglomerative 
* DBSCAN 
* Gaussian mixtures 
* Birch 

<!--
Other algorithms include, but are not limited to, what you see here.

Are they important? Yes!

Will you see them in practice? Maybe!

Remember, this is an active area of research, and the most popular algorithms may change.

Source: https://scikit-learn.org/stable/modules/clustering.html
-->

---

# Quality Measures? 

<!--
We have seen quite a few measures of quality for regression and classification. Remember:

r-squared
MSE (mean squared error)
MAE (mean absolute error)
precision
accuracy
recall
F1

But how do you measure the quality of a clustering algorithm since you don't have training/testing data with a "correct" label for the cluster? 

In cases where you do have labels for the data, you can apply one of the measures we've used previously.

There are also three new measures that are important for clustering when you are working with labeled classification data.
-->

---

# Homogeneity 

<!--
The first metric that we use is homogeneity. This metric ensures that each cluster contains only members of a single class.

The scale is from 0.0 to 1.0, where 1.0 consists of clusters that each contain one and only one class of object.

Basically, this amounts to, "Does everything else in the cluster look roughly the same?"

However, this metric can be hacked by having a lot of clusters (make your k very big), so that each k contains only items in one class.
-->

---

# Completeness 

<!--
Another metric we will look at is 'completeness'. Completeness measures whether all members of a given class are assigned to the same cluster.

Completeness scores range from 0.0 to 1.0, where 1.0 indicates that every object of a given label is in the same class.

We can hack this score by just having one class.
-->

---

# v-measure

<!--
Since homogeneity and completeness are somewhat opposed in how they can be increased, it is important to find a balance between the two. Similar to the F1 score that we have seen, there is a harmonic mean of homogeneity and completeness, called v-measure, that we can find. It determines if both of these metrics are close and high.

Our model is typically better if the homogeneity and completeness are both high. We accomplish this by finding a high v-measure.

https://scikit-learn.org/stable/modules/generated/sklearn.metrics.v_measure_score.html
-->
