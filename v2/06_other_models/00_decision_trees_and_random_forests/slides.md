---
marp: true
---

# Random Forests

<!--
In this unit we are going to talk about random forests. Random forests build upon a concept called decision trees. 

-->

---

![](res/tree.png)

<!--
Let's take a moment to see how a decision tree works. The idea is to then take many trees and create a forest. 

Image Details:
* [tree.png](https://pixabay.com/vectors/tree-silhouette-winter-plant-3979965/): Pixabay License

-->

---

# Decision Trees

![](res/decision-tree.png)

<!--

Let's start by taking a look at a decision tree. This particular example is a tree predicting iris
species from the iris dataset. In each box we have the feature we're testing, the gini impurity score (which we'll talk more about in a bit), the number of samples at that node, and an array called value whose entries correspond to classification into one of the three different species of iris flower. 

Recall that in the iris dataset there are four features, namely, petal width, petal length, sepal width, and sepal length. The target variable is a categorical variable representing three different species of iris flower. The dataset contained 150 total samples, and each there are 50 samples of each species. 

Decision trees have a single root node and a variable depth number of intermediate nodes, ending in
many leaf nodes. A decision is made by comparing one of our features to some derived value at the
node and then following a path based on the comparison. The leaf node that you arrive at is your
"decision".

For example, our root node is petal width. We first ask "is the petal width less than .8cm?" For 50 of our samples the answer is "yes" and all those samples are of species #1 For the rest of our 100 samples, the answer is "no," and we still don't have a good sense of how to identify species #2 or #3. For the remaining samples, we ask "is the petal width less than 1.75cm?" We see that the answer is "yes" for a total of 54 samples, where 49 of those are of species #2 and 5 are of species #3. We also see that the answer is "no" for a total of 46 samples, where 1 of those samples is of species #2 and 45 of them are species #3. Continuing in this way we get our entire decision tree. 

Now, the final tree in this form is our trained model. If we were to get a new sample of iris flower, we would use the tree to classify the sample. We'd start at the root node and follow each question until we hit a leaf node. Each of the leaf nodes contains a final classification. For example, if at the root node we answer "yes," then we would classify our new sample a species #1. 

But this just seems like a series of if/then statements? How is this machine learning?? 

Well... we need to "learn" things like which feature is most appropriate for the root node (i.e. which one is most important and should go at the top?). In general, the order in which we examine the features is important. Furthermore, we need to learn the parameters for the cutoff values at each node. For example, at the root node the cutoff we use for testing a new sample is .8cm, and this is a learned parameter. 

One last thing to note. Notice that we test petal width several times at different levels and with different cutoffs. There is no assumption that each feature will be tested exactly one time, and the cutoff values can change depending on where you are in the tree. In this example, we tested petal width at the root node with a cutoff of .8cm, we also tested petal width in level one with a cutoff of 1.75cm. In other words, for the samples with petal width greater than .8, we then ask "well it's bigger than .8cm, but is it still smaller than 1.75cm?" 

Image Details:
* [decision-tree.png](http://www.google.com): Copyright Google

-->

---

# Building Decision Trees

Gini

* Minimize mpurity


Entropy

* Maximize information gain

<!--
To choose the cutoff that we split on, we typically use Gini impurity or entropy. The Gini impurity measures the chance that you'll misclassify a random element in the dataset at this decision point. Smaller Gini score is better. The best Gini score is 0. Let's look back at the decision tree example with the iris dataset. We see that in the first level after the root node every datapoint in the training set with petal width less than .8cm was of type #1. At this leaf, we have a Gini value of 0. 

Another approach is to use the entropy to maximize information gained at each node.  

-->

---

# Decision Trees

## Decision Support Tools

* Typically binary
* Mostly for classification
* No confidence values provided
* No need to scale/normalize data

<!--
Here are a few other highlights about decision trees.

Typically decision trees have two paths that can be taken at any node (binary tree).

Decision trees are most often used for classification purposes. They can be used for regression, but
are usually less effective than other regression tools. 

Unlike other classification algorithms, decision trees don't provide a list of labels and the a
numeric confidence in the applicability of each label. Instead, we receive a single final decision.

Decision trees are not sensitive to features having different ranges of values. Most machine
learning algorithms benefit from scaling and/or normalizing data, but decision trees are an
exception.

-->

---

# Random Forests

![](res/forest.png)

<!--
Let's now move to random forests. A decision tree is a single set of comparisons that are made to
come to a single classification decision. A random forest is a collection of two or more decision
trees (hence the name "forest") built with your training data. Each tree is consulted when a
prediction is being made. The majority classification across all trees is the final classification
decision made by the random forest.

Image Details:
* [forest.png](https://pixabay.com/vectors/deciduous-trees-forest-trees-154168/): Pixabay License

-->

---

# Ensemble Learning 

<!--
This is our first foray into "ensemble learning". Ensemble learning is a technique in which multiple
learners are trained on the training data and their results are aggregated in some way. This
aggregation is typically one of majority vote (mode) for classification, and mean or median for
regression.

-->

---

# Bootstrapping 

<!--
You might be asking how training multiple trees with the same dataset would be much better than
simply training on a single tree. Typically, you don't actually train every tree in a random
forest with the same full dataset. Instead, each tree is trained with a sample of the data from
the dataset. This sampling is called bootstrapping.

For each tree in the forest, a random set of data is chosen for training. The samples can overlap.
This is considered sampling "with replacement".

You can also choose to train every tree with the entire dataset. In this case you get variation in
trees based on their random starting points.

-->

---

# Bootstrap Aggregation (Bagging) 

<!--
A specific form of bootstrapping that you'll hear about in machine learning is "bootstrap
aggregation." This term is often shortened to "bagging."

Bagging is a form of bootstrapping that creates multiple full-sized copies of your training dataset
with slightly different data.

For example, say you have a dataset with 1000 items in it and you want a random forest with 5 trees
in it. If you bag the data, 5 datasets of size 1000 will be created by randomly sampling your
original dataset with replacement. Since we replace items in the original dataset there will likely
be duplicates in each generated dataset. This allows each tree to have a slightly different view of
the data.

Note that after the datasets are made, trees can be built and used in parallel. 

-->

---

# Boosting 

<!--
While we are on the topic of ensemble learning techniques, let's take a moment to talk about another
popular technique: boosting. Boosting is a technique of first training a model, then determining which types of
predictions it performed poorly on, and then training a subsequent model to focus more on the
predictions that the model before it got wrong. You can think of it as an assembly line where each
worker has a specialty.

The downside of boosting is that it has to be done sequentially.

-->

---

# Random Forests in scikit-learn

* [RandomForestClassifier](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html)
* [RandomForestRegressor](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestRegressor.html)

<!--
The scikit-learn library provides a couple of random forest implementations, one for classification and one
for regression. The two implementations share many hyperparameters, but not all. We'll spend the
next few slides highlighting some of the hyperparameters.

-->

---

# Hyperparameter: n_estimators

* How many trees are in the forest?
* Space and time complexity vs. bias and variance

<!--
One of the most useful hyperparameters is `n_estimators`. This parameter sets the number of trees
that will be in the forest. As you increase the number of trees you should expect that the bias in
your model to be reduced. This comes at the cost of more resources being needed for training.

If you are training in parallel, then you'll have as many copies of your dataset as you do trees. If
you are training serially, then the time to train will increase linearly with the number of trees.

Can more trees ever be a bad thing? Probably not, though there will be diminishing returns as the
number of trees grows too much.

How do you choose the best number? Experimentation. Play with different settings and compare
training time and model scores until you find a value that seems to be fast and "good" enough for
your use case.

-->

---

# Hyperparameter: criterion

* How do you measure the quality of a node split?
* Regression: Error
  * Mean Squared Error
  * Mean Absolute Error
* Classification: Homogeneity
  * Gini: Impurity
  * Entropy: Information Gain

<!--
Another parameter that is shared, but different, across implementation is `criterion`. This is the
measure that will be used to determine the quality of a split decision at a given node.

For regression the options are mean squared error, MSE, or mean absolute error, MAE. Remember from
our model quality discussions that MSE penalizes outliers much more than MAE.

For classification we can choose to either use Gini, which is an impurity measurement, or entropy,
which is a measure of information gain. 

-->

---

# Hyperparameter: max_depth

* How deep is your tree?

<!--
By default every decision tree in the random forest will split until every leaf node is as pure as
it can be. This can lead to overfitting. You can prevent this by setting a max depth on the tree.

Can you think of how this parameter might be harmful?

What if the tree isn't well balanced and you end up with larger sets of data on one branch of the
tree? If you put an artificial depth cap on your tree, then the overpopulated branch might not have very pure
leaves.

Let's look at another hyperparameter that can help prevent overfitting without having to worry
about balance.

-->

---

# Hyperparameter: min_samples_(split|leaf)

* How many samples must be in a node to split?
* How many samples are required in a leaf?

<!--
These two hyperparameters are very related.

`min_samples_split` asks how many samples are required in a node for you to be able to split it.
Any value greater than one is allowed, with the default being two.

`min_samples_leaf` tells us the minimum number of samples needed to form a leaf node. The default
is one, which is very specific.

You should be able to see how these are related and how they can cancel each other out. If I say
that `min_samples_leaf` is two instead of one, then I've effectively set `min_samples_split` to at
least four because I need four samples in a parent node to make two leaf nodes each with two
samples.

The nice thing about these hyperparameters are that they work well with unbalanced trees, unlike
`max_depth`.

How do you pick a value for these parameters? Trial and error, like most hyperparameters.

-->

---

# Hyperparameter: max_features

* How many features can be used when making a split decision?

<!--
By default a decision tree in a random forest will attempt to use all features in determining the
best split for a node. If you have a lot of features this might be computationally expensive or
even lead to some overfitting. You can limit the number of features used in any decision so that
only the most significant features are used at each node.

-->

---

# Hyperparameters

* Many more exist
* Can differ between classifiers and regressors
* Apply to all trees in the forest
* Experiment to tune

<!--
We've just talked through a small sample of hyperparameters that are available for random forests, but many
more exist. Note that there are some differences in what parameters you can tweak between regressors
and classifiers. Also, any parameters you set will apply to all trees in a forest. And finally, the best
way to find the best parameters is to experiment with many different options and find which perform
best for your data.

-->

---

# Your Turn!

<!--
Now let's have a look at the lab. 
-->
