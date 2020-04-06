# Introduction to Image Classification

---

What is Keras? {.big}

---

Keras: The Python deep learning library {.big}

* Popular high-level API for building & training deep learning models
* Implemented in Python (2.7-3.6)
* Uses TensorFlow, CNTK, or Theano for its backend
* Open-source, developed and maintained by contributors 

<!--
A collection of high-level APIs that support neural network for deep learning modeling.  Can be used on several backend implementations, eg: TF, CNTK, Theano.
Microsoft Cognitive Toolkit, previously known as CNTK
* A deep learning framework developed by Microsoft Research. Microsoft Cognitive Toolkit describes neural networks as a series of computational steps via a directed graph
* Developer: Microsoft Research

Theano
* A Python library and optimizing compiler for manipulating and evaluating mathematical expressions, especially matrix-valued ones. In Theano, computations are expressed using a NumPy-esque syntax and compiled to run efficiently on either CPU or GPU architectures.
* Developer(s): Montreal Institute for Learning Algorithms (MILA), University of Montreal
-->

---

Why Keras vs. TensorFlow? {.big}

* User-friendly interface, optimized for common use cases
* Modular blocks
* Shallow learning curve
* Keras will be even more integrated in upcoming [TF 2.0](https://www.tensorflow.org/community/roadmap)

<!--
User friendly
* High level APIs - provides a scikit-learn type APIs
* Hides complexity of the backend engine (TF, etc)

Modular blocks
* Using Keras is much like dealing with Lego blocks
* Support a large set of neural network models, eg: fully connected, convolutional, pooling, recurrent, embedding, etc.
* These models can be combined to build more complex models

Shallow learning curve
* Great place for beginners to start
* It’s build to help developers perform quick tests, proof of concepts and experiments before going full scale
* Hopefully allow non-ML developers to solve their ML problems themselves with little overhead
-->

---

**Goal**: Allow the user to focus on defining models (instead of coding) and maximize experiment iteration speed {.big}

---

Using Keras {.big)

![](res/introkeras01.png)

<!--
Load
* As usual either use the built-in data loader function when available, or write one for your specific data set
* Data sets can potentially divided into: Training set, Validation set, Test set
* For simplicity, we’ll work with Training and Test set in this example

Define
* Model is defined by sequencing together pre-built layers
* It typically consists of input layer, one or more hidden layers in the middle which does the learning, and an output layer
* We’ll go through a concrete example in the upcoming Image Classification with Keras colab

Neural Net
* We will go deep into neural network model discussion in a couple of weeks but for now focus getting comfortable with Keras APIs and coding flow
-->

---

Sample Code {.big}

![](res/introkeras02.png)

<!--
Compile
* As the model train, you can influence how it improve the model between iterations by specifying: Optimizer, Loss Function, Metrics

Train
* Call model.fit() to start model training
* Training data in x_train
* Training labels in y_train
* Feed the training data 5 times
* Return: History object containing training accuracy and loss values in each iterations

Evaluate
* Call model.evaluate() to evaluate the model quality
* Use a separate test dataset to independently assess quality
* Return: evaluation accuracy and loss values
-->

---

# Your Turn

[Image Classification with Keras](https://colab.sandbox.google.com/drive/1OfhoB99E9h7SMWMXwBRLs54aGUMcwXFF)

<!--
Let’s work on the Image Classification colab where we can apply the skills we’ve been recently introduced to:
Keras API
Image Manipulation with Python
Introduction to Neural Network
-->

