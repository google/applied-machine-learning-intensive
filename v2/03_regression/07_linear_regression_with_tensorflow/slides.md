# Linear Regression With TensorFlow

<!--
We have learned about how to perform regression with scikit-learn and we have
taken a peak at TensorFlow. Now it is time to try to train a real model using
TensorFlow.
-->

---

# But why? {.big}

<!--
Why would we want to build a linear regression using TensorFlow?

It is true that scikit-learn is perfectly adquate much of the time. However,
TensorFlow has some features like distributed model training that can help you
build models when you have huge amounts of data.
-->

---

# [`LinearRegressor`](https://www.tensorflow.org/api_docs/python/tf/compat/v1/estimator/LinearRegressor)
## An implementation of [`Estimator`](https://www.tensorflow.org/api_docs/python/tf/compat/v1/estimator/Estimator)

<!--
In this lab we'll be using the [`LinearRegressor`](https://www.tensorflow.org/api_docs/python/tf/compat/v1/estimator/LinearRegressor)
class. `LinearRegressor` is a
[`Estimator`](https://www.tensorflow.org/api_docs/python/tf/compat/v1/estimator/Estimator).
`Estimator` is an API and programming model that was introduced in TensorFlow
version 1. It is a little more difficult to use than modern Keras-style
TensorFlow, but you will still see it used in practice and support for it will
continue in TensorFlow 2 because the `Estimator`-style of programming works
better for some specfic machine learning applicaitons.
-->

---

# `LinearRegressor`

```python
import tensorflow as tf

lr = tf.estimator.LinearRegressor(
    feature_columns=[...],
)

lr.train(input_fn=training_input)

p = lr.predict(input_fn=testing_input)
```

<!--
Here you can see the main programming flow of the `LinearRegressor`. We:

1. Import TensorFlow
1. Create an estimator class
1. Train the estimator by passing it a function that provides data
1. Use the model by passing it a function that provides data
-->

---

# `LinearRegressor`: Training Function

```python
def training_input():
  ds = tf.data.Dataset.from_tensor_slices((
    {c: training_df[c] for c in feature_columns},  # feature map
    training_df[target_column]                     # labels
  ))
  ds = ds.repeat(100)
  ds = ds.shuffle(buffer_size=10000)
  ds = ds.batch(100)
  return ds
```

<!--
Here you can see what an input function might look like. The function:

1. Creates a `DataSet` object. This particular `DataSet` is just wrapping a
   bunch of Pandas `Series` objects, but `DataSet` can represent other data
   acquisition and storage strategies.
1. Set the number of times to pass the data to the model. Remember that our
   models will be using an optimizer to try to find good weights. In order to do
   this it helps to pass the data to the model a few times.
1. Shuffles the data between repeats.
1. Defines the mini-batch size. This is the number of data points that will be
   passed to the model in each training step.

Note that repitition and batch are hyperparameters that you can change in the
model. You might find that you don't need to repeat the data as much or that you
need to repeat it more. You might find that smaller batches work better than big
batches.
-->

---

# `LinearRegressor`: Optimizer

```python
adam_optimizer = tf.keras.optimizers.Adam(
  learning_rate=0.001,
)
linear_regressor = tf.estimator.LinearRegressor(
    feature_columns=[...],
    optimizer=adam_optimizer,
)
```

<!--

Another interesting hypterparameter is the optimizer. By default
`LinearRegressor` uses the
[`Ftrl`](https://www.tensorflow.org/api_docs/python/tf/keras/optimizers/Ftrl)
optimizer, however there are many more options. In this example we use the
[`Adam`](https://www.tensorflow.org/api_docs/python/tf/keras/optimizers/Adam)
optimizer. In this case we also manually set the learning rate. Each optimizer
has settings like this that you can change to help your model train faster and
better.

-->

---

# `LinearRegressor`: Distribution

```python
mirrored_strategy = tf.distribute.MirroredStrategy()

config = tf.estimator.RunConfig(
    train_distribute=mirrored_strategy,
    eval_distribute=mirrored_strategy,
)

linear_regressor = tf.estimator.LinearRegressor(
    feature_columns=[...],
    config=config,
)
```

<!--
In order to distrubte training and evaluation across workers, you can optionally
pass the `LinearRegressor` a distribution method via config. We'll show how to
do this in the lab, though it doesn't help much on the small virtual machines
that we'll be working with.
-->

---

# The Lab
## Predicting Housing Prices

<!--
In the lab we will use United States census data to try to predict housing
prices in California. We'll examine the data, manipulate the data, and then
build and adjust a model.
-->

---
