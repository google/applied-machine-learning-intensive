# Random Forests
## Review Questions

---

# What is ensemble learning?

---

# Using multiple learning algorithms to obtain better predictive performance.

<!--
Reference: https://en.wikipedia.org/wiki/Ensemble_learning
-->

---

# What is the name of the scikit-learn class used for performing regression modelling using a decision tree?

---

# sklearn.ensemble.RandomForestRegressor

---

# What is one of the risks of setting `max_depth` too small when tuning a random forest?

---

# Unbalanced trees might not be able to have pure leaves on the overpopulated branches.

---

# What does Gini measure?

---

# Impurity

---

# What is impurity?

---

# Measure of how often a randomly chosen element from the set would be incorrectly labeled if it was randomly labeled according to the distribution of labels in the subset.

<!--
Reference: https://en.wikipedia.org/wiki/Decision_tree_learning#Gini_impurity
-->

---

# Name some random forest hyperparameters and describe their purpose?

---

# Some possibilities:

* n_estimators: how many trees?
* max_depth: how tall of a tree?
* min_samples_split: how big of a set is needed to create a split?
* min_samples_leaf: how small can a leaf be?
* max_features: how many features used in a split?

More at [RandomForestRegressor](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestRegressor.html)
and [RandomForestClassifier](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html).
