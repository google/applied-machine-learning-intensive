---
marp: false
---

<style>
img[alt~="center"] {
  display: block;
  margin: 0 auto;
}
</style>

# Loss Functions

---

# L1 and L2 Formulas

![center](res/lossfunction1.png)

<!--
Loss functions are essential to machine learning. At its core, machine learning “learns” by trying to optimize a loss function. A loss function is simply a way to evaluate how well your algorithm models your data. You can think of it as similar to a measure of error: higher loss means your model is performing worse, and lower loss is a sign of better performance.

Two of the most common loss functions for regression are called L1 and L2. L1 minimizes the sum of *absolute* differences between the true value and the predicted value of all samples, and L2 minimizes the sum of *squared* differences.

Image Details:
* [lossfunction1.png](http://www.google.com): Copyright Google
-->

---

# Averaging

![center](res/lossfunction2.png)

<!--
It’s common to either take the sum or average over all data points to calculate overall loss. “Mean Squared Error” is another widely used loss function that is closely related to L2 loss, but instead of the sum of squared differences, it’s the *average* of squared differences.

You should choose a loss function based on your specific problem and dataset. L1 and L2 loss are used for regression problems. We’ll discuss loss functions used for other machine learning problems, such as classification, later.

Image Details:
* [lossfunction2.png](http://www.google.com): Copyright Google
-->

---

# L1 loss: example

![center](res/lossfunction3.png)

<!--
Work through example of calculating L1 loss, starting from data values and predictions.

Image Details:
* [lossfunction3.png](http://www.google.com): Copyright Google
-->

---

# L1 loss: example 

![center](res/lossfunction4.png)

<!--
The first step is to find the differences (y_true - y_predicted).

Image Details:
* [lossfunction4.png](http://www.google.com): Copyright Google
-->

---

# L1 loss: example 

![center](res/lossfunction5.png)

<!--
Take the absolute value of each difference.

Image Details:
* [lossfunction5.png](http://www.google.com): Copyright Google

-->


---

# L1 loss: example 

![center](res/lossfunction6.png)

<!--
Add all absolute value differences.

Image Details:
* [lossfunction6.png](http://www.google.com): Copyright Google
-->



---

# L2 loss: example

![center](res/lossfunction7.png)

<!--
Work through same example with L2 loss.

Image Details:
* [lossfunction7.png](http://www.google.com): Copyright Google
-->


---

# L2 loss: example 

![center](res/lossfunction8.png)

<!--
First step is again to find the differences (y_true - y_predicted).

Image Details:
* [lossfunction8.png](http://www.google.com): Copyright Google
-->


---

# L2 loss: example

![center](res/lossfunction9.png)

<!--
Now square each difference.

Image Details:
* [lossfunction9.png](http://www.google.com): Copyright Google
-->

---

# L2 loss: example 

![center](res/lossfunction10.png)

<!--
Add the squared differences.

Image Details:
* [lossfunction10.png](http://www.google.com): Copyright Google
-->


---

# Your Turn

![center](res/lossfunction11.png)

<!--
Students work on Loss worksheet (give around 5 min):
* 3 sets of true / predicted data points on page 1
* intermediate steps on page 2 (can choose to give or not give to students)
* solution on page 3
* previous worked through example on page 4 (can choose to give or not give as reference)

Image Details:
* [lossfunction11.png](http://www.google.com): Copyright Google
-->

---

# How did you do?

Compare answers with your neighbor.

<!--
*End by asking what’s the difference between L1 and L2 as summary measures? Why might you want to use one over the other?*

*Answer: L2 is more sensitive to outliers in the data set, because squaring the difference makes the difference more extreme.*

-->

---

# Solution

![center](res/lossfunction12.png)

<!-- 
*Prompt students for answers.* 

Image Details:
* [lossfunction12.png](http://www.google.com): Copyright Google
-->

---

# Solution

![center](res/lossfunction13.png)

<!-- 
Image Details:
* [lossfunction12.png](http://www.google.com): Copyright Google
-->