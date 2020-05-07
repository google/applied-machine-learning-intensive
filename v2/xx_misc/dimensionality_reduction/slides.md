---
marp: true
---

# Dimensionality Reduction

<!--
This lesson is about dimensionality reduction.

This class is largely focused on prediction models and algorithms. Dimensionality reduction is not a prediction algorithm, but
is a very important preprocessing algorithm. Dimensionality reduction is often performed on a dataset before building a
prediction model, such as logistic regression.

-->

---

# What "dimensions" are being reduced?

![](res/3d_glasses.png)

<!--
The dimensionality being reduced here is the number of input features. Say we have a dataset with 100 features. So we
initially have 100 dimensions in our model. This can be unwieldy and lead to overfitting, in the same way on training on too
much data and leaving none for testing can lead to overfitting.

The aim of dimensionality reduction is to reduce the number of features to just those that are most important.

Image Details:
* [3d_glasses.png](https://unsplash.com/photos/GsGs_FvQyac): Unsplash License

-->

---

# Correlated Features

<!--
Dimensionality reduction is most important when some features may be correlated. Many prediction models actually assume that
features are independent, or at least have low collinearity or correlation. But this is not always true! Having correlated
features can lead to violations of model assumptions, which brings the entire model in question.

-->

---

# Correlated Features

- Height (m)
- Mass (kg)
- Body Mass Index (BMI) = mass/height^2

<!--
Take an extreme example:

Say we have a model that uses height, mass, and BMI as features. Now, BMI is entirely a derived feature from height and mass.
Having all 3 of these features means we *definitely* have correlated features. Even alone, height and mass are extremely
correlated, and may lead to issues. Having all 3 is a perfect example of too many dimensions.

We would run dimensionality reduction on this to find just the dimensions that matter, before running this feature set through
any models.

-->

---

# Principal Component Analysis (PCA)

- Find the "principal" components (or features) in the feature set
- Resulting components are linear combinations of original features
- Build a model with components rather than raw features

<!--
PCA is by far the most widely used algorithm for dimensionality reduction. PCA works by taking the feature matrix and finding
the eigenvalues and eigenvectors of this matrix.

(NOTE: Mentioning this will be useful to those with a linear algebra background, but may intimidate those who haven't heard of
eigenvectors. Make sure to stress that the implementation isn't that important because sklearn does it for you under the hood.
No need to explain what eigenvectors do, suffice to say that the eigenvalues tell you how important an "eigenvector" of
features is.)

Note that the final components are not a subset of the original features, but a linear combination of features. That is how we
distinguish between "feature" (an input feature) and a "component" (result of PCA, which is a linear combination of input
features).

-->

---

# So how many components?

- As many as you want!
- The least amount that explains a sufficient amount of variance
- You can let sklearn choose the best number of components

<!--
As usual, it is probably best to let sklearn choose the optimal number of components, unless you have a set number in mind.

-->

---

# Your Turn!

<!--
Direct students to the colab, where they will apply PCA to a dataset on wine, before applying logistic regression to the
components.

-->
