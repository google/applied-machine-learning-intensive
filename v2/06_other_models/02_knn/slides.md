---
marp: true
---

# K Nearest Neighbors

<!--

-->

---


# K Nearest Neighbors (KNN)

One of the simplest **supervised** machine learning algorithms used mostly for classification. 

[Note: We can also use KNN for regression (example in Colab).]

<!--
KNN is one of the simplest supervised machine learning algorithms. It is mostly used for classification (which we'll talk about in this lecture), but it can also be used for regression (example in Colab). 
-->


---

# Example: classify as red or white wine

![](res/KNN02.png)

<!-- 
Let's say we have information about a particular wine's sulphur dioxide and chloride content, and we want to be able to say whether the wine is red or white. Let's appraoch this problem uing KNN. 

Consider this graph of sulphur dioxide vs. chorlide. Think of the colored dots as our training set. It is labeled, so we know whether each wine in the trianing set is actually red or white and the datapoints are colored accordingly. 

Assume we have a new wine for which we know the sulphur dioxide and chloride content (colored in grey). We want to know if it is red or white. 

The hyperparameter K denotes how many "neighbors" we should look at. In this example, assume K = 3. So we will look at the 3 nearest neighbors of the grey dot. 

Image Details:
* [KNN02.png](http://www.google.com): Copyright Google
-->

---

# Example: classify as red or white wine

![](res/KNN03.png)

<!-- 
In this example we use simple Euclidean distance and find the three points in our training set that are nearest to the grey dot. 

Note: It is common to use other distance metrics depending on the problem. 

Image Details:
* [KNN03.png](http://www.google.com): Copyright Google
-->

---

# Example: classify as red or white wine

![](res/KNN04.png)

<!-- 
It is clear that the unknown wine is closest to three red wines. Therefore, we would classify the grey point as red.  

Image Details:
* [KNN04.png](http://www.google.com): Copyright Google
-->

---

# Example: classify as red or white wine 

![](res/KNN05.png)

<!-- 
Let's try another example. Again, K=3. 

Prompt the class: What about this grey point? 

Image Details:
* [KNN05.png](http://www.google.com): Copyright Google
-->

---

# Example: classify as red or white wine

![](res/KNN06.png)

<!-- 
We see that its three nearest neighbors contain two whites and a red. What should we do? 

Image Details:
* [KNN06.png](http://www.google.com): Copyright Google
-->

---

Example: classify as red or white wine {.big} 

![](res/KNN07.png)

<!-- 
We can simply take the majority. So we classify this point as white. 

Image Details:
* [KNN07.png](http://www.google.com): Copyright Google
-->

---

# Example: classify as red or white wine

![](res/KNN08.png)

<!-- 
Finally, we'll do one last example when K=3. 

Two of the three nearest neighbors are red. 

Image Details:
* [KNN08.png](http://www.google.com): Copyright Google
-->

---

# Example: classify as red or white wine

![](res/KNN09.png)

<!-- 
So we'll classify this one as red. 

Image Details:
* [KNN09.png](http://www.google.com): Copyright Google
-->

---

# Example: classify as red or white wine

![](res/KNN10.png)

<!-- 
That looks pretty good! 

Image Details:
* [KNN10.png](http://www.google.com): Copyright Google
-->

---

# Example: classify as red or white wine

![](res/KNN011.png)

<!-- 
Let's run through the same example with the same datapoints, but we'll change the hyperparameter, K. This time K = 5. 

Image Details:
* [KNN11.png](http://www.google.com): Copyright Google
-->

---

# Example: classify as red or white wine

![](res/KNN12.png)

<!-- 
We see that the five nearest neighbors for the first data point are all red, so we classify it as red. 

Image Details:
* [KNN12.png](http://www.google.com): Copyright Google
-->

---

# Example: classify as red or white wine

![](res/KNN13.png)

<!-- 
We see that the four of the five nearest neighbors of the second datapoint are white, so we classify it as white. 

Image Details:
* [KNN13.png](http://www.google.com): Copyright Google
-->

---

# Example: classify as red or white wine 

![](res/KNN14.png)

<!-- 
We see that the four of the five nearest neighbors of the second datapoint are white, so we classify it as white. 

Image Details:
* [KNN14.png](http://www.google.com): Copyright Google
-->

---

# Example: classify as red or white wine

![](res/KNN15.png)

<!-- 
We see that three of the five nearest neighbors of the third datapoint are white, so we classify it as white. 

Image Details:
* [KNN15.png](http://www.google.com): Copyright Google
-->

---

# How do we choose K?

* Small K -- > noise has a higher influence
* Large K -- > computationally expensive

<!-- 
One *****

-->

---

# How do we choose K?

* Small K -- > noise has a higher influence
* Large K -- > computationally expensive

**SOME OPTIONS**:
* Let K = sqrt(m) (where m is the sample size)
* Try K=1, 2, 3, 4, 5, …. with multi training/testing compare F1, accuracy, etc.
* Try different K and use cross-validation (Colab to come!)
* Use a clustering algorithm (Colabs to come!)
* And more!

---

![](res/KNN16.png)

---

# When to use KNN?

KNN is a “lazy learner” algorithm - it doesn’t learn a discriminative function from the training set (no generalization until query is made).

Use when:
* Dataset is relatively small 
* Dataset is relatively noise-free

---

# Overfitting

**QUESTION**:

How might you run the risk of overfitting with KNN?

---

# Overfitting

![](res/KNN17.png)

---

# Drawing decision boundary

![](res/KNN18.png)
