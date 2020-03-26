---

marp: true

---

# Regression With TensorFlow

<!--
We have created numerous regression models in this course using both
scikit-learn and TensorFlow. These models have all been "classic" models,
but that is about to change.

In this unit, we are going to build a regression model using a deep neural
network. The model will take feature data, pass it through hidden neural network
layers, and output a continuous value.
-->

---

# Keras

## The Python Deep Learning Library

<!--
To build our deep neural network we will be using Keras, a high-level Python API
that can be used within TensorFlow.

Don't be put off by the term "deep neural network." Though the math and the
theory are complex, the actual code that you need to write to create one is as
easy as creating a simple linear regression.
-->

---

# Keras: Sequential

```python
from tensorflow import keras

model = keras.Sequential()
```

<!--
We will build our model using the `Sequential` class. Sequential simply means that the model will consist of a sequence of layers, one after the other. Each layer feeds the next in the sequence.

In Keras, the alternative to a sequential model is a functional model. Functional models allow layers to interconnect in more complex ways. Layers can branch and merge through different paths. The resultant model might look more like a graph with multiple inputs and outputs. This is different than the sequential model that looks much more like a funnel.
-->

---

# Keras: Layers

```python
from tensorflow.keras import layers

layer_1 = layers.Dense(32, input_shape=[8])

layer_2 = layers.Dense(16, activation='relu')

layer_3 = layers.Dense(1)
```

<!--
A model consists of layers of nodes. In the lab that we are about to do, those layers are `Dense` layers. A dense layer in a neural network is a layer where every node is connected to every node in the next layer.

In the example we have on this slide, we create three `Dense` layer classes. This actually creates a neural network that is four layers deep, though.

When we make the first layer, we pass in an input shape. This is the shape of the features that you'll be feeding into the model. In this case we chose an input shape of 8. That indicates that we'll be providing 8 features to the model. The input layer is the first layer.

But you should also notice that we passed the number 32 to the `Dense` constructor. This creates our first hidden layer with 32 nodes.

In review, this first line of code creates two layers. An input layer that accepts 8 features. That layer is densely connected to the next layer, which has 32 nodes. This means that there are 8x32 connections between the layers.

The next line of code creates another dense layer. This layer is 16 nodes wide. Notice that we pass an activation function to this layer. The activation we chose is the relu activation. By default the activation for a dense layer in TensorFlow Keras is $f(x) = x$. We can adjust the activation function layer by layer.

There are many activation functions available in the `tensorflow.keras.activations` namespace. Many of these can be referenced by name as shown in this example. There are more activation functions available in `tf.nn`. For these functions you'll need to pass in the class - like `tf.nn.leaky_relu` - instead of just the name.

The final layer that we create is our output layer. Since we have been doing single output regressions, this output layer has only one node. That node will be our predicted regression value for a given set of input features.

You aren't limited to one output though. As we move into classification, we'll see examples with more than one output node.
-->

---

# Keras: Dense NN

```python
from tensorflow import keras
from tensorflow.keras import layers

model = keras.Sequential([
  layers.Dense(64, input_shape=[8]),
  layers.Dense(64),
  layers.Dense(1)
])
```
<!--
In our previous slide, we created layers, but we didn't connect them. In this slide, we'll create the layers inside a sequential model. Now the layers are densely connected in sequence.

Questions to ask the class: 
How many layers are there in this model? Answer: 4

How many nodes are in the first layer? Answer: 8

How many nodes are in the second and third layers? Answer: 64

How many nodes are in the final layer? Answer: 1

How many connections are there between layer 1 and layer 2? Answer: 8x64

*It may be helpful to draw a schematic of the model on the board while asking students the questions.*

-->

---

# Keras: Other Layers

```python
from tensorflow.keras.layers import AveragePooling1D
...
from tensorflow.keras.layers import Conv3D
...
from tensorflow.keras.layers import GRU
...
from tensorflow.keras.layers import RNN
...
from tensorflow.keras.layers import ZeroPadding3D
```

<!--
`Dense` isn't the only type of layer. There are dozens of layers that can be found in the `tensorflow.keras.layers` namespace. Here is a sample. We will discuss some of these layers later in the course. They are all different and some work very well for certain types of data and use cases. 
-->

---

# Keras: Model Compilation

```python
model.compile(
  loss='mse',
  optimizer='Adam',
  metrics=['mae', 'mse'],
)
```

<!--
After we have defined the structure of the model, we need to tell TensorFlow what to optimize for. To do that, we compile the model.

In this example, we are using the Adam optimizer to optimize for mean squared error, while also tracking mean absolute error and mean squared error. The tracked values will be reported after training.
-->

---

# Keras: Model Training

```python
EPOCHS = 50

history = model.fit(
  training_df[feature_columns],
  training_df[target_column],
  epochs=EPOCHS,
  validation_split=0.2,
)
```

<!--
Once you have defined your model and set up optimization parameters, it is time to train your model. Training is done with the `fit()` method, which needs to know the feature and target data.

Fit also needs to know how many times to repeat the data. Each repetition is called an epoch. In this case, we asked for 50 epochs. In the history that is returned we will get measurements for the mean absolute error, mean squared error, and loss at each epoch.

The final argument that we pass to `fit()` is how much of the data to hold out as a validation set during training. This allows the model to track how it progresses over epochs using data that it isn't training on.
-->

---

# Keras: Predictions

```python
predictions = model.predict(testing_df[feature_columns])
```

<!--
The whole point of building a model is to make predictions. You can use the `predict` method to do that.
-->

---

# Lab
## Regression with TensorFlow

<!--
For our hands-on exercise, we will revisit the California housing prices dataset from an earlier lab. We'll use a sequential model with dense layers to create predictions that outperform the linear regression model we created earlier.
-->