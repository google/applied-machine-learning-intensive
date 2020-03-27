---

marp: true

---

<style>
img[alt~="center"] {
  display: block;
  margin: 0 auto;
}
</style>

# Multiclass Classification

<!--
As we continue our journey into classification we will now move into multiclass classification. Multiclass classification is a classification problem where there are more than two classes.

Yes, we know, multi means more than one, not more than two.

Multiclass classification is common nomenclature in machine learning for classifiers that need to distinguish between more than three classes where binary classification is reserved for classifiers that work with only two classes.

If you think about it, there isn't really a single-class classifier since even predicting if some data is in a class or not is technically binary. So binary is the "zero" of classification.

Also many, not all, models just combine binary classifications to create a multiclass classifier, so for binary you have one classification and then you have to have multiple classifiers when you have more classes.

Regardless of why multiclass starts at three isn't too important. The fact is that these are the terms that the industry has adopted.
-->

---

# Multiclass Classification: OvA OvO

![center](res/yesno_yesno.png)

<!--
An easy way to perform multiclass classification is to simply string together binary predictions and choose the best match. This is "Other vs. All" (OvA) classification. Another option is to pair each class and see which class prevails in an "Other vs. Other" (OvO) competition.

Often this complexity is hidden from us, but it is important to know a little of what is going on under the hood.

Some models, such as decision trees and random forests don't have to be structured in this manner.

Image Details:
* [yesno_yesno.png](https://pixabay.com/illustrations/yes-no-button-orange-green-icon-1713011/): Pixabay License
-->

---

# Lab: The Dataset

![center](res/iris.jpg)

<!--
The dataset that we'll be using in the examples in this colab is the "Iris Dataset". The dataset comes packaged with scikit-learn and contains feature measurements of three different species of iris. This is a classic machine learning dataset that you'll see in many machine learning examples.

Image Details:
* [iris.jpg](https://pixabay.com/photos/iris-germanica-baardiris-purple-4215370/): Pixabay License
-->

---

# Lab: Cross-Fold Validation

![center](res/cross_fold.png)

<!--
In this lab we will introduce the concept of cross-fold validation. Cross-fold validation is a way to train on your entire dataset (minus final validation). The algorithm divides your dataset into even groups and then holds out one-at-a-time for validation while training on the remaining data.

This can be really useful on small datasets.

Image Details:
* [cross_fold.png](http://www.google.com): Copyright Google
-->

---

# Lab: Digit Identification

![center](res/digits.jpg)

<!--
For our final exercise in the lab we'll create a classifier that identified digits in a popular handwritten digits dataset. This exercise will have minimal guidance and will allow you to really demonstrate your machine learning skills.

Image Details:
* [digits.png](https://pixabay.com/photos/digits-counting-mathematics-4014181/): Pixabay License
-->

---

# Your Turn

<!--
Let's get to the lab!
-->