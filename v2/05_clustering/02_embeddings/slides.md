# Embeddings

---

# Review: one-hot encodings

![](res/embeddings01.png)

<!--
Suppose we’re working with input data with a large number of possible categories, such as words. Our machine learning models can’t work directly on words; they need to take a vector of numbers as input. Traditionally, we could do this using a “one-hot encoding” (as shown). 

This has 2 main problems:
1) Similar items don’t have similar encodings (“hotel in Quito” may not lead to similar search results as “motel in Quito”).
2) We may need huge vectors to encode all possible items.
-->

# Embeddings

* Efficient, dense representation
* Similar items have similar encodings


![](res/embeddings02.png)

<!--
The embedding dimension is a parameter you specify.
higher dimension = more descriptive, but the model takes more data / time to learn.
-->

---

# Using embeddings

![](res/embeddings03.png)

<!--
The first number, 15, is the number of possible items.
The second number, 4, is your chosen embedding size.
Instead of manually specifying embedding values, we can train them (they are treated similarly to weights learned by the model during training).
No separate training process needed, they are treated as another hidden layer.
-->

---

# Using embeddings

![](res/embeddings04.png)

<!--
The embedding layer acts as a “lookup table”, where each item has a unique index that is used to lookup its corresponding embedding. This particular table has 15 rows (corresponding to unique items) and 4 columns (one for each embedding dimension). You’ll investigate this more in the colab.
-->

---

# Visualizing embeddings

<!--
One of the big advantages of embeddings is that they can meaningfully represent items and relationships between items, in a way we can easily visualize. Here we can see that the embeddings for “hotel” and “resort” are fairly close. Based on the dataset used to train these embeddings, this means these two words are used in similar contexts.
-->

![](res/embeddings05.png)

---

# Embeddings in practice

* You can either train your own or use pre-trained embeddings
* Not just words! You can embed:
  * entire books
  * medical labels
  * images
  * any discrete data

---
  
# Your Turn

[Embeddings](https://colab.sandbox.google.com/drive/1LlkhE9uY6qZVxiwTjQSO37E2pp-YZ6X6)
  
<!--
Let’s work on the Embeddings colab where we can apply these skills to:
* Training your own embeddings
* Visualizing your trained embeddings
-->


