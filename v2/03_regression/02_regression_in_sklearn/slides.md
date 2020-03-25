---

marp: true

---

<style>
img[alt~="center"] {
  display: block;
  margin: 0 auto;
}
</style>

# Linear Regression with scikit-learn

<!--
We have learned about linear regression and we have learned about scikit-learn. In this unit we are going to perform a linear regression using the scikit-learn toolkit.
-->

---

# Linear Regression

![center](res/linearregressionwithscikit1.gif)

<!--
Remember that linear regression involves fitting a straight line to a dataset. Most of the time, the line doesn't fit perfectly for all data points. You can see in this illustration the blue datapoints, the regression line, and then the red lines between the datapoints and the regression line. The red lines indicate the "error". There are many ways to measure this error that we'll talk about in detail in a future unit.
-->

---

# scikit-learn: Closed-Form

```python
from sklearn.linear_model import LinearRegression

lin_reg = LinearRegression()
lin_reg.fit(X, y)
lin_reg.coef_, lin_reg.intercept_
```

<!--
In this unit we'll perform both closed-form and non-closed-form regressions. To perform a closed-form linear regression in scikit-learn we use the `LinearRegression` class from the `linear_model` package. As you can see in this example, performing the regression is as simple as instantiating the class and then calling the `fit()` method. The model then calculates the coefficient and intercept for the linear equation.
-->

---

# scikit-learn: Stochastic Gradient Descent

```python
from sklearn.linear_model import SGDRegressor

sgd_reg = SGDRegressor()
sgd_reg.fit(X, y)
sgd_reg.coef_, sgd_reg.intercept_
```

<!--
Using the stochasitic gradient descent looks strikingly similar to performing closed-form regression with `LinearRegression`. This is no accident. scikit-learn's API is very consistent.

In this example we load the data into memory, perform SGD, and the print out the coefficient and intercept.

Note that this might not be the optimal coefficient and intercept, just the best one that the SGD algorithm found after running through it's epochs.
-->

---

# scikit-learn: SGD Hyperparameters

```python
from sklearn.linear_model import SGDRegressor

sgd_reg = SGDRegressor(
    max_iter=100000,
    n_iter_no_change=10,
    tol=1e-4,
    learning_rate='adaptive',
)
sgd_reg.fit(X, y)
sgd_reg.coef_, sgd_reg.intercept_
```

<!--
There aren't really any hyperparameters to tune for `LinearRegression`. There are some settings that you can change based on your data, such as should the intercept be calculated or is the data already centered, but there is very little to explore.

`SGDRegressor`, however, has many hyperparameters that can be tuned. You can see some of those hyperparameters in use here.

The first parameter that we have changed is the `max_iter`. The changes the maxium number of times that the model will pass over the data for training. Sometimes you can improve model performance by just training more.

The second parameter, `n_iter_no_change`, manages "early stopping" for the model. The setting is the number of times the model will pass over the data, not see a meaningful change in loss, and keep going. We have said that if you don't see a meaningful change in 10 epochs, stop. Increasing this number can potentially help your model get out of a plateau of loss that is just a local minimum.

The `tol` setting defines what that meaningful change in loss is.

And finally the `learning_rate` effects the change in learning rate over time. At each epoch the algorithm adjusts weights by the learning rate and measures loss. This rate can be constant throughout the training, but can also change over time. There are schools of thought that favor making the learning rate smaller as training continues to allow the optimizer to make finer adjustments as it nears an optimal solution.

There are many more hyperparameters that can be found in the SGDRegressor documentation.
-->

---

# scikit-learn: SGD `partial_fit`

```python
from sklearn.linear_model import SGDRegressor

sgd_reg = SGDRegressor()
sgd_reg.partial_fit(X_1, y_1)
sgd_reg.partial_fit(X_2, y_2)
...
sgd_reg.partial_fit(X_n, y_n)
sgd_reg.coef_, sgd_reg.intercept_
```

<!--
Another capibility of the `SGDRegressor` is the ability to partially train the model. This can be useful if your data doesn't fit into memory. You can continutally call `partial_fit` with subsets of the full dataset.
-->

---

# Loss

## Mean Squared Error

## $MSE = \frac{1}{n} \sum_{n=1}^{n}(y_{i} - \hat{y_{i}})^{2}$

<!--
We'll got into loss and different ways to measure it in later units. For this unit we'll calculate loss using the mean squared error. The mean squared error is the measure of the values that our model predicts vs. what the values actually are. The differences are calculated, squared to get rid of negatives, and summed so that the average squared error can be found.
-->

---

# Train, Test, Validate

![center](res/train_validate_test.png)

<!--
This lab will also be the first time that we'll need to split our data for model training. 

When we train a model, we could use all of the data that we have. However, when we do that we risk overfitting the model to our data. The model might become really good at making predictions that look like the data that it has already seen, but really bad at generalizing.

For this reason we typically hold out some of the data and don't use it to train in the model at all. We keep this "test set" of data and use it only to evaluate the model after training has completed. We pass the trained models the features in the test set, get the predictions from the model, and then calculate the difference between the predictions and the actual values.

How much data do we hold out for testing? There is no exact answer, but it is common to see 10%, 20%, and even 25% of the data held out for testing.

When you do this hold out of data, it is important that you get a good random sample of the data. You might need to shuffle the data to get this sample.

Contrary to a purely random sample, you might also want to ensure some pattern in the data is represented in your test set. Say you have a dataset about dogs and there are 10 different breeds in the dataset that each make up 10% of the dataset. You might think that ratio of breeds represented in the test set match that of the overall dataset. This is called stratification of the test set.

Okay, so we all understand the test set, but what is the validation set?

The validation set is used during training to let the optimizer evaluate the model. The loss calculated with the validation set directly effects decisions the model makes.

Some models, like `LinearRegression` don't have a validation set since they aren't built using an optimizer. Others like `SGDRegressor` do utilize a validation set. The `validation_fraction` parameter can be adjusted to tell the model how much of the data to use for validation.
-->

---

# Your Turn

<!--
Let's now build a few different linear regression models using scikit-learn!
-->