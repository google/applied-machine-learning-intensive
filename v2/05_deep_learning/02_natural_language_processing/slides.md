---
marp: true
---

<style>
img[alt~="center"] {
  display: block;
  margin: 0 auto;
}
</style>

<!-- footer: Copyright 2020 Google, LLC. -->

# Natural Language Processing 

<!--
This unit is about natural language processing.
-->

---

# What is Natural Language Processing?

![center](res/open-book.jpg)

<!--
But what is natural language processing?

What are some applications of NLP in your everyday life? *Prompt the group to respond.*

Image Details
* [res/open-book.jpg](https://www.pexels.com/photo/open-textbook-762687/): Pexels License
-->

---

# What is Natural Language Processing?

* autocorrect
* translation
* parsing text
* chatbots
* question answering
* speech recognition
* *... and so much more!*

<!--
Here are some examples of what is considered natural language processing. You have likely intereacted with systems that perform these tasks before.

There is some argument on speech recogintion actually being NLP. It is possible to convert sound waves into words without actually understanding what those words are. This is technically "processing" of natural language, but it falls short of "Natural Language Understanding". However, many speech recognition systems actually attempt to understand the speeh in order to correctly predict ambiguous words like "there", "their", and "they're".
-->

---

# Character vs. Word-Level Models

![center](res/character-model.png)

<!--
Models can process text at different levels. For language generation models you'll see some that use a character-by-character approach such as the RNN shown in this slide.

Image Details:
* [character-model.png](http://www.google.com): Copyright Google
-->

---

# Character vs. Word-Level Models

![center](res/word-model.png)

<!--
Here is a word-based model. It looks structurally like the character-based model except that it works at the word level.

Which is better?

It depends. For some languages and use cases, the character-based approach works well. In practice you see more word-based models, especially for English and similar languages. The models typically perform well and are quicker to train than character-based models.

Image Details:
* [word-model.png](http://www.google.com): Copyright Google
-->

---

# Text Processing

Regular Expression (Regex)
* pattern used to match character combinations in strings

regex | matches
------|---------
`[wW]ood`   | **w**ood, **W**ood
`beg.n`     | beg**i**n, beg**u**n, beg**3**n
`o+h`       | **o**h, **ooooo**h
`[^a-zA-Z]` | a single non**-**alpha character

<!--
Before machine learning, we solved NLP problems using mostly pattern matching. Even now, these text processing techniques can be very important in processing messy natural language. 

Regular Expressions are widely used in text processing (imagine needing to extract all the emails from a block of text, or remove prefixes/suffixes from a word). A regex defines a pattern that is used to match certain character combinations, following a set of rules. Here we show a few examples of pattern matching rules:
* “.” matches any single character
* “+” matches 1 or more of the previous character
* “[^...]” negates the rest of the pattern in the brackets

Regex rules can be very powerful but also very complex. Many guides exist for effectively using regexes: https://www.rexegg.com/regex-quickstart.html
-->

---

# Text Processing

Minimum edit distance (Levenshtein distance)
* minimum # edits needed to change one string into the other


![center](res/distance.png)

<!--
Another important concept for text processing is minimum edit distance (also called Levenshtein distance). This is especially useful for autocorrect tools and evaluating systems that generate language (e.g. translation). There are many open source Python implementations of this algorithm you can use.

Image Details:
* [distance.png](http://www.google.com): Copyright Google
-->

---

# Feature Extraction

n-grams
* consider sequences of n words instead of one word at a time

TFIDF (term frequency - inverse document frequency)
* determine how important a word is to a document
* discount more common words (“and”, “the”)

<!--
Before neural networks, the first step in NLP was “feature extraction”, or transforming raw text into informative features. The idea is that just the individual words in a text do not fully capture the meaning of the text.

One very common feature extraction technique is n-grams, which consider n-word sequences instead of just individual words. While in the original sentence “that movie was not horrible”, the word “horrible” may cause a model to predict very strong negative emotion, extracting bigrams (2-grams) would correctly pair “not horrible”, which is a much milder emotion.

Another common technique is TFIDF, which calculates how important a word is to a text. This often has the effect of ignoring more common words (like “the”) and letting the model focus on more unique words in the text.
-->

---

# Feature Extraction: spaCy

```python
tokens = spacy_model("Applied Machine Learning")

for token in tokens:
  print(token.text, token.pos_)
```

Token | Part of Speech
------|---------------
Applied | `ADJ`
Machine | `PROPN`
Learning | `PROPN`

<!--
There are many more linguistic features that you can extract from text. spaCy is a fast python library for advanced NLP tools. It converts text into a collection of “Token” objects, each of which contains useful annotations such as Part of Speech (pos) and Named Entities (ent_type).

In this example, spaCy breaks “San Francisco” into two Tokens, each of which is labeled as a proper noun (PROPN) and a Geographical/Political Entity (GPE). 
-->

---

# Language Modeling: Bag-of-Words

![center](res/bag-of-words.png)

<!--
To build models for NLP tasks, we must have some notion of how words fit together into sentences and text. Language modeling refers to determining how likely a certain sentence is. The simplest language modeling approach is a bag-of-words: treat a sentence like an unordered collection (set) of words.

Take an example movie review, "I love love loved it!", and another, "I HATED it :-(".  You as a human could guess which review corresponded to a positive sentiment and which review corresponded to a negative sentiment, even if we looked at these sentences out of order (e.g., "it! I loved love love" and "HATED :-( I it".  So bag-of-words is like saying, "I'm pretty sure I can glean the meaning of sentences, with words in any order, so why bother keeping track of the order? Sounds like more work to me..." But can you think of an example or two where this strategy would fail? Especially consider if you're trying to predict more than just two sentiments ("good" and "bad").

Image Details:
* [bag-of-words.png](http://www.google.com): Copyright Google
-->

---

# Language Modeling: Sequential Words


![center](res/sequential-words.png)

<!--
Bag-of-Words approaches are surprisingly successful on many tasks (email spam filter, sentiment analysis) and are less computationally intensive.

But, fundamentally, we know that the order of words matters. Harder NLP tasks build upon sequential approaches, which preserve the order of words in a text. This is exactly what RNNs are useful for. Recurrent Neural Networks handle this well.

Image Details:
* [sequential-words.png](http://www.google.com): Copyright Google
-->

---

# NLP Processing

![center](res/pipeline.png)

<!--
The typical process for any NLP task is:
1. Raw text
2. Transform to feature vectors (either through feature extraction or embeddings)
3. Run through some model
4. Perform supervised task

Image Details:
* [pipeline.png](http://www.google.com): Copyright Google
-->

---

# Your Turn

<!--
Now it is your turn. In this lab we will perform sentiment analysis on reviews as an example. After that you'll write a classifier that determines if a piece of text was written by Jane Austin or Charles Dickens.
-->