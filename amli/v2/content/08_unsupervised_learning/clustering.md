# Clustering

<!--
We are about to start the "final project" phase of AMLI. So far we have learned about two very popular machine learning techniques: regression and classification.

As we have discussed, regression models attempt to predict a continuous value. These are values such as housing prices, life expectancies, salaries, etc.

Classification models predict discrete values. These can be binary: did someone survive the Titanic disaster; Or they can be multi-class: which handwritten digit is depicted in an image.

In this section we are going to briefly look at clustering algorithms. These models are different from classification or regression. They can be applied to classification and [rarely] regression problems, but the core purpose of the models is to discover relationships in datasets. These relationships provide insights that we might not have been able to derive ourselves.

Clustering is a powerful form of discovery.

AMLI doesn't spend a lot of time on clustering and currently, we only talk about the most popular clustering algorithm. Don't take this as a signal that clustering isn't important. Clustering algorithms are powerful, popular, and fundamental. They are also difficult to interpret and focus more on discovery than prediction.

Prediction is easy to measure: What is the r-squared score? What is the F1 score?

Clustering, though it can be measured (as we will see) is a little more nebulous. Sometimes data clusters in ways that are non-intuitive. Sometimes clusters are hard to decode.

We can't teach you machine learning without discussing clustering. However, we are only lightly touching the top of the iceberg of clustering in this course. In your future data science careers, if you see a problem that might be a good fit for clustering… try it. Research algorithms that we only mention in passing. Much of this course is about application of models and tooling. Discovery is important too. Don't be shy about attempting clustering if your problem domain fits.
-->

---

![](res/clustering01.jpg)

<!--
Do the fastener clustering exercise. Have the students divide the fasteners they have into 6 groups, then 4, then 2. Explain why.

Examine the groupings across teams. Did some group on function? color? 

Prose:

Let's start our exploration of clustering with a hands-on exercise. The word "clustering" is fairly intuitive: you are attempting to group you data. But what constitutes a group?

Let's start with a hands-on exercise.

Take this pile of fasteners and divide it into 6 groupings.

Why did you chose these groups?

Now 4.

Why did you choose these groups?

Now 2.

Why did you choose these groups?

What changed when you lowered 'k'?

Notice that your choice of 'k' is very important to the makeup of your groups.

This is important when we start examining clustering algorithms.

Source: https://pixabay.com/photos/darkness-panorama-background-3075379/
-->

---

Clustering {.big}

<!--
Cluster analysis or clustering is the task of grouping a set of objects in such a way that objects in the same group are more similar to each other than to those in other groups. Wikipedia

How does this compare to the algorithms that we have seen so far?

The algorithms we have seen so far attempt to map features to outcomes. Clustering instead tries to map features to class attributes.
-->

---

Unsupervised {.big}

<!--
Clustering is typically an unsupervised process where patterns emerge from the data. It can be semi-supervised where some side data is used as hints. Supervised clustering is basically classification.

We have worked with "supervised" learning so far. In supervised learning we have "tagged" data that has been curated to train the model. With unsupervised learning we instead allow the algorithm to discover the underlying model.
-->

---

k-means {.big}

<!--
k-means is the most common form of clustering. You performed a k-means clustering with your fastener exercise.

There are many more clustering algorithms, but k-means is the most common that you'll currently see in practice.

In this algorithm, you need to define a distance function and then use that function to separate your data into 'k' groups.

What is a good distance function? That depends on your problem statement.
-->

---

* Affinity propagation {.big}
* Mean-shift {.big}
* Spectral {.big}
* Ward hierarchical {.big}
* Agglomerative {.big}
* DBSCAN {.big}
* Gaussian mixtures {.big}
* Birch {.big}

<!--
Other algorithms include, but are not limited to what you see here.

Are they important? Yes!

Will you seem them in practice? Maybe!

Remember, this is an active area of research and the algorithms may change.

Source: https://scikit-learn.org/stable/modules/clustering.html
-->

---

quality measures? {.big}

<!--
We have seen quite a few measures of quality. Remember:

r-squared
mse (mean squared error)
mas (mean absolute error)
precision
accuracy
recall
F1

But how do you measure the quality of a clustering algorithm since you don't necessarily have a label for the cluster? In many cases you can't.

In cases where you do have labels for the data you can apply one of the measure s that we have used previously.

There are also three new measures that are important for clustering when you are working with labeled classification data.
-->

---

homogeneity {.big}

<!--
The first metric that we use is homogeneity. This metric ensures that each cluster contains only members of a single class.

The scale is from 0.0 - 1.0, where 1.0 consists of clusters that each contain one and only one class of object.

Basically, this is "does everything else in the cluster look like me'?

How can you hack this metric? Have a lot of clusters (make your k very big) so that each k contains only items in one class.
-->

---

completeness {.big}

<!--
Another metric we will look at is 'completeness'. Completeness measures that all members of a given class are assigned to the same cluster.

Completeness scores range from 0.0 - 1.0 where 1.0 indicates that every object of a given label is in the same class.

How can we hack this score? Just have one class.
-->

---

V-measure

<!--
Since homogeneity and completeness are somewhat opposed in how they can be increased, it is important to find a balance between the two. Similar to the F1 score that we have seen, there is a harmonic mean of homogeneity and completeness, called V-measure, that we can find that determines if both of these metrics are clase and high.

Our model is typically better if the homogeneity and completeness are both high. We accomplish this be finding a high v-measure.

https://scikit-learn.org/stable/modules/generated/sklearn.metrics.v_measure_score.html
-->
