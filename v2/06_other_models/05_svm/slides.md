---
marp: true
---

# Support Vector Machines
<!--
Support vector machines (SVM) can be used for both classification and regression tasks, but classification is far more common. In this lecture, we will focus on using SVM for classification. The lab also focuses mainly on classification, but does include a regression example. 
-->

---

# Linear Classification 
## Maximal Margin Classifier 

<!--
A support vector machine is a generalization of a much simpler model, called a maximal margin classifier. Let's first discuss the maximal margin classifiers, then we'll see how to extend to a support vector machine. 
-->

---

# Hyperplane 
In d-dimensional space, a hyperplane is a plane of (d-1) dimensions. 

* In two dimensions, a hyperplane is a line (1-dimensional).
* In three dimensions, a hyperplane is a typical plane (2-dimensional).

## Goal - use a hyperplane to separate data. 
<!--
A hyperplane is the analogue of a line in higher dimensions. If we are looking at d-dimensional space, then a hyperplane has dimension d-1. 

For example, if we look at the typical 2-dimensional Cartesian coordinate system, then a hyperplane is a line. 

Similarly, if we consider 3-dimensional space, then a hyperplane is a 2-dimensional plane. 

Although we cannot visualize this in higher dimensions, the analogy carries through. 


-->

---

# Hyperplane Decision Boundary 

![](res/svm01.png)

<!--
Here we have two classes of observations. Class 1 is shown in yellow, and class 2 is shown in red. They are linearly separated by the hyperplane X_{2} = m*X_{1} + b. In other words, X_{2} - m*X_[1} - b = 0.

Image Details:
* [svm01.png](http://www.google.com): Copyright Google

-->

---



---

![](res/supvecmac01.png)

<!--
Image Details:
* [supvecmac01.png](http://www.oreilly.com): Unlicensed
-->
---

![](res/supvecmac02.png)

<!--
Image Details:
* [supvecmac02.png](http://www.oreilly.com): Unlicensed
-->
---

# Soft vs. Hard Margin

![](res/supvecmac03.png)

<!--
Image Details:
* [supvecmac03.png](http://www.oreilly.com): Unlicensed
-->
---

# C Hyperparameter

![](res/supvecmac04.png)

<!--
Smaller values allow more data in the highway and create wider highways.

Image Details:
* [supvecmac04.png](http://www.oreilly.com): Unlicensed
-->

---

# Regression

![](res/supvecmac05.png)

<!--
The support vectors are the distances between the data points and the margin.

Image Details:
* [supvecmac05.png](http://www.oreilly.com): Unlicensed
-->

---

# Kernal Trick

[Kernal Trick](https://www.youtube.com/watch?time_continue=2&v=3liCbRZPrZA&feature=emb_logo)

<!--When Linear SVM won’t work, the kernel trick finds a hyperplane boundary in a higher dimension, for low computational power.

Source: https://www.youtube.com/watch?time_continue=2&v=3liCbRZPrZA&feature=emb_logo
-->
