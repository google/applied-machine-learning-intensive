# Loss Functions

---

# L1 and L2 Formulas

![](res/lossfunction1.png)

<!--
Loss functions are essential to machine learning -- at its core, machine learning “learns” by trying to optimize some loss function. A loss function is simply a way to evaluate how well your algorithm models your data. You can think of it as similar to a measure of error: higher loss means your model is performing worse, while lower loss is a sign of better performance.

Two of the most common loss functions for regression are L1 and L2. L1 minimizes the sum of *absolute* differences between the true value and the predicted value of all samples while L2 minimizes the sum of *squared* differences.
-->

---

# Averaging

![](res/lossfunction2.png)

<!--
It’s common to either take the sum or average over all data points to calculate overall loss. “Mean Squared Error” is another widely used loss function that is closely related to L2 loss -- instead of the sum of squared differences, it’s the *average* of squared differences.

You should choose a loss function based on your specific problem and dataset. L1 and L2 loss are used for regression problems. We’ll discuss loss functions used for other machine learning problems, such as classification, later. 
-->

---

# L1 loss: example

![](res/lossfunction3.png)

<!--
Work through example of calculating L1 loss, starting from data values and predictions.
-->

---

L1 loss: example {.big}

![](res/lossfunction4.png)

<!--
The first step is to find the differences (y_true - y_predicted)
-->

---

L1 loss: example {.big}

<!--
Take absolute value of each difference
-->

![](res/lossfunction5.png)

---

L1 loss: example {.big}

<!--
Add all absolute values
-->

![](res/lossfunction6.png)

---

# L2 loss: example

<!--
Work through same example with L2 loss
-->

![](res/lossfunction7.png)

---

L2 loss: example {.big}

<!--
First step is again to find the differences (y_true - y_predicted)
-->

![](res/lossfunction8.png)

---

L2 loss: example {.big}

<!--
Now square each difference
-->

![](res/lossfunction9.png)

---

L2 loss: example {.big}

<!--
Add the squared values
-->

![](res/lossfunction10.png)

---

# Your Turn

![](res/lossfunction11.png)

<!--
Students work on Loss worksheet (give around 5 min):
* 3 sets of true / predicted data points on page 1
* intermediate steps on page 2 (can choose to give or not give to students)
* solution on page 3
* previous worked through example on page 4 (can choose to give or not give as reference) 
-->

---

# How did you do?

Compare answers with your neighbor.
Resolve any discrepancies.

<!--
End by asking what’s the difference between L1 and L2 as summary measures? Why might you want to use one over the other?

Answer: L2 is more sensitive to outliers in the data set.
-->

---

# Solution

![](res/lossfunction12.png)

---

# Solution

![](res/lossfunction13.png)
