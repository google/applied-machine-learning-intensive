---
marp: true

---

# XGBoost
## eXtreme Gradient Boosting

<!--
Deep learning is easily the most popular machine learning paradigm at the moment. However, we should not let that blind us to the fact that many traditional machine learning techniques are also still valuable.

An up-and-coming model that has shown some real potential is XGBoost. XGBoost is a unique take on random forests.

-->

---

# Boosting

<!--
The 'boost' part of the XGBoost hints that the algorithm uses a boosting algorithm. Boosting simply means that the algorithm works in stages. It first builds a model and tries to make predictions. The best predictions are kept as part of the model, and the underperforming predictions are used to train a second model on the lower-quality outputs. Now, the best predictions are kept, and a third model is trained on the underpredicting portions, and so on. 

-->

---

# Gradient Boosting

<!--
So what is "gradient boosting"?

This just means that the algorithm uses a gradient to try to find the appropriate number of "boosts" to provide. You don't say, "I want five levels of boosting across my forests." Instead, you let a gradient descent algorithm determine the makeup and number of random forests in this model.
-->

---

# Extreme!

<!--
But why "extreme"?

For one, it is great marketing!

Additionally, the penalty given to underperforming trees is extreme, or at least unique, according to modern models.
-->

---

# So What is XGBoost?

<!--

XGBoost is a library/framework. It is cross-platform and cross-language. The source code for XGBoost can be found at [https://github.com/dmlc/xgboost](GitHub).

One of the most interesting things about XGBoost is what it is not.

It is not a deep learning framework, despite it being a relatively new machine learning technique.

XGBoost is really just a series of random forests strung together with a very clever set of rules.
-->

---

# What can XGBoost do?

<!--
What can XGBoost do?

Well, XGBoost is built upon random forests, so it can perform classification and regression, just like a random forest. Interestingly enough, XGBoost is also really performant at ranking problems. We can classify, find regression values, and rank items using XGBoost.

-->

---

# How do we use XGBoost?

<!--
XGBoost is technically a separate library from Tensorflow, scikit-learn, and other libraries we have learned in this course. However, there are ports of XGBoost into most major libraries. 
-->

---

# scikit-learn style

```python
from xgboost import XGBClassifier
 
model = XGBClassifier()
model.fit(X_train, y_train)
```

<!--
XGBoost has a very scikit-learn-style interface. Beware! This interface works, but is very slow.

One of the most amazing parts of XGBoost is the speed of converging on a model. But that speed relies on a specific data format.
-->

---

# DMatrix

```python
import xgboost as xgb


d_train = xgb.DMatrix(X_train, y_train)
d_test = xgb.DMatrix(X_test, y_test)
```

<!--
The DMatrix is a data structure optimized for XGBoost. If you attempt to train a model without a DMatrix, you'll likely see an exponentially slower convergence.

If you use a DMatrix, you'll see a model that converges faster than a decision tree, and yet the model will perform nearly the same.
-->

---

# Parameters

```python
params = {
    # What type of model are we building?
    'objective': 'multi:softmax',

    # multi:softmax parameters
    'num_class': 3,

    # General parameters
    'booster': 'gbtree',

    # Tree-specific parameters
    'max_depth': 10, 
    'eta': 0.1,
}
```

<!--
The trick with the DMatrix is the parameters. They are unwieldy. The `objective` parameter is the primary parameter, and based on that you get an expanse of sub-parameters. We go into details in the colab.
-->

---

# Your Turn

<!--
And on that note, it is time to experiment with XGBoost in the colab. We'll build a multiclass classifier in the lab and then you'll create a binary classifier as an exercise. The most important takeaway from this lesson is to realize that there are effective non-deep-learning options available.
-->
