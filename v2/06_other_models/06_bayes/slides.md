---

marp: true

---

<style>
img[alt~="center"] {
  display: block;
  margin: 0 auto;
}
</style>

# Naive Bayes

<!--
This unit is about an algorithm called "Naive Bayes." It is one of the most popular classifier algorithms, especially for spam detection and filtering.

-->

---

# Spam Detection

![center](res/no_spam.png)

<!--
One of the most common uses of Naive Bayes is in spam detection. It is one of the simplest algorithms to use for detecting "spammy" language in a block of text. This is particularly useful in email, for example.

Image Details:
* [no_spam.png](https://pixabay.com/vectors/email-mail-spam-message-e-mail-29853/): Pixabay License

-->

---

# Bayes' Theorem

Given two events $A$ and $B$:

> $$ P(A|B) = \frac{P(B|A) P(A)}{P(B)} $$

<!--
Recall Bayes' Theorem. It allows us to calculate the probability of one event (A) given another event (B), if we know the probability of the reverse conditionality - B given A.

In other words, how often A happens given that B happens (P(A|B)) can be computed if we know the following: how often B happens given that A happens (P(B|A)), the probability that A happens on its own (P(A)), and the probability that B happens on its own (P(B)).

Some Notation: P(A|B) is often referred to as the posterior probability, and P(A) is often referred to as the prior probability. This language is used in many references for Naive Bayes, so it's helpful to know it upfront. 

Bayes' Theorem is the basis of the Naive Bayes algorithm, as well as the entire field of Bayesian statistics!

-->

---

# Why "Naive"?

- Bayes' Theorem assumes events are independent
- This assumption works pretty well for Naive Bayes

<!--
The "naive" assumption can actually be extended from independence to low multicollinearity, or "almost" independence. 

Independence is rarely actually true, and it can be cause for error. So we need to be careful when applying this algorithm. 

Naive Bayes does not perform well for more complex tasks; natural language processing (NLP) is usually a better choice. But for spam detection, Naive Bayes works well.

-->

---

# The Naive Bayes Classifier

![center](res/sorting_eggs.jpeg)

<!--
The Naive Bayes classifier is one of the simplest but most effective classifiers.

The classifier calculates the conditional probability of seeing each of the possible options, given the data, and just chooses the option with the highest/maximum probability.

Image Details:
* [sorting_eggs.jpeg](https://unsplash.com/photos/BiZ-_6kNjbI): Unsplash License

-->

---

# The Naive Bayes Spam Filter

> $$ P(spam|word) = \frac{P(word|spam) P(spam)}{P(word)} $$

<!--

* "spam" is the event that a given email is spam. $P(spam)$ is usually set as a threshold, e.g. 5% of all emails are spam.

* "word" is the event of seeing a given word. $P(word|spam)$ is usually set by the user. For example, "GIVEAWAY" is likely to be a spammy word. These can also be set using historical data.

* "ham" is the event that a given email is not spam. $P(ham)$ is $1 - P(spam)$.

-->

---

# The Naive Bayes Spam Filter: Multiple Words


> $$ P(spam|word_{1}, word_{2}, ..., word_{n} ) = \frac{P(word_{1}|spam)P(word_{2}|spam)\cdot \cdot \cdot P(word_{1}|spam)P(spam)}{P(word_{1})P(word_{2})\cdot \cdot \cdot P(word_{n})} $$

<!--

If we have multiple "spammy" words like GIVEAWAY, Viagra, etc., then Bayes' Theorem still applies, and we multiply the probabilities. 

Note that the denominator is a constant for all data points in your dataset. Thus we have that P(spam|word_{1}, word_{2}, ..., word_{n}) is proportional to the numerator. 

We want the "spam" value (predicted class: 1 = spam, 0 = ham) that maximizes the probability on the left hand side. 

-->

---

# The Naive Bayes Spam Filter


> $$ spam = argmax_{spam} P(word_{1}|spam)P(word_{2}|spam)\cdot \cdot \cdot P(word_{1}|spam)P(spam)$$

<!--

Note that argmax or "arguments of the maxima" are the points in the domain that maximize a given function. So what we're looking for is the "spam" value that maximizes the probability that an email is spam given whether or not particular words are present. 

-->


---

# Your Turn!

<!--
In this lab we will implement a Bayesian model using a Naive Bayes classifier from scikit-learn. Your goal is to predict the likelihood of spam in a sample of text data.

-->
