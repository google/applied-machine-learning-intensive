---

marp: true

---

<style>
img[alt~="center"] {
  display: block;
  margin: 0 auto;
}
</style>

# Dimensionality Reduction

<!--
This lesson is about dimensionality reduction.

This class is largely focused on prediction models and algorithms. Dimensionality reduction is not a prediction algorithm, but it is a very important preprocessing algorithm. Dimensionality reduction is often performed on a dataset before building a prediction model, such as logistic regression.

-->

---

# What "Dimensions" Are Being Reduced?

![center](res/3d_glasses.png)

<!--
In this context "dimension" refers to the number of input features. So the dimensionality being reduced is the number of input features. Say we have a dataset with 100 features. This means we initially have 100 dimensions in our model. This can be unwieldy and lead to overfitting, in the same way that training on too much data and leaving none for testing can lead to overfitting.

The aim of dimensionality reduction is to reduce the number of features to just those that are most important.

Image Details:
* [3d_glasses.png](https://unsplash.com/photos/GsGs_FvQyac): Unsplash License

-->

---

# Correlated Features

<!--
Dimensionality reduction is most important when some features may be correlated. Many prediction models actually assume that features are independent or at least have low collinearity or correlation. But this is not always true! Having correlated features can lead to violations of model assumptions, which brings the validity of the entire model into question.

-->

---

# Correlated Features Example

- Height (m)
- Mass (kg)
- Body Mass Index (BMI) = mass/height^2

<!--
Let's consider this extreme example. 

Say we have a model that uses height, mass, and BMI as features. Now, BMI is entirely a derived feature from height and mass.
Having all 3 of these features means we *definitely* have correlated features. Even alone, height and mass are extremely
correlated and may lead to issues. Having all three is certainly an example of too many dimensions.

Before running the feature set through any models, we would run dimensionality reduction on these data to find just the dimensions that matter most.

-->

---

# Principal Component Analysis (PCA)

- Find the "principal" components (or features) in the feature set
- Resulting components are linear combinations of original features
- Build a model with components rather than raw features

<!--
PCA is by far the most widely used algorithm for dimensionality reduction. The goal of PCA is to identify vectors that explain the most variance in the data. These are the most important components. 

PCA works by taking the feature matrix and finding
the eigenvalues and eigenvectors of this matrix.

*(NOTE: Mentioning this will be useful to those with a linear algebra background, but it may intimidate those who haven't heard of eigenvectors. Make sure to stress that the implementation isn't that important because scikit-learn does it for you under the hood. There's no need to explain what eigenvectors do; it's sufficient to say that the eigenvalues tell you how important an "eigenvector" of features is.)

Note that the final components are not a subset of the original features, but a linear combination of features. That is how we
distinguish between a "feature" (an input feature) and a "component" (result of PCA, which is a linear combination of input
features). The results of PCA are no longer going to be physical features that were measured. This is okay, but it does make interpreting the results of a model slightly more subtle. 



-->

---

# So How Many Components?

- As many as you want!
- The least amount that explains a sufficient amount of variance
- You can let scikit-learn choose the best number of components

<!--
In general our goal is to end up with the smallest number of components that explains the most amount of variance. 

As usual, you may let scikit-learn choose the optimal number of components, unless you have a set number in mind for your use case. 

-->

---

# Your Turn

<!--
We will now turn to the lab, where we will apply PCA to a dataset on wine. Then we will build a logistic regression model. 

-->
