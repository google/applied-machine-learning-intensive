
..  Copyright (C)  Google, Runestone Interactive LLC
    This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/4.0/.

Sentiment Analysis of UN Speeches
=================================

Sentiment Analysis is a probabilistic evaluation of a piece of text that classifies that text as either positive, negative or neutral.   This kind of analysis is really useful in today's online world where everyone tweets their opinion or complaint or love for a movie or a restaurant or an airline.  Whatever it is people are constantly sharing their opinion.  If you are a marketing person, or a movie producer or restauranteur you want to know what people think of your product.

We'll give you a bit of background on how this classification works, and then we'll use a popular Python package called ``nltk`` to produce a sentiment score for each speech.


Naive Bayes
-----------

This is a very old technique that comes from the 1600's but is emerging as a very important bit of math in the world of machine learning.  It was the first and primary algorithm to be used in classifying email messages as spam or not spam.  The beauty of this is that it is reasonably understandable and a programming project that is within your reach.

More later.  But for now `this introduction <https://towardsdatascience.com/cat-or-dog-introduction-to-naive-bayes-c507f1a6d1a8>`_ is a good starting point.

Using NLTK to score the speeches
--------------------------------

The Natural Language ToolKit (`NLTK <https://www.nltk.org/>`_) Provides us with many tools for working with text and natural language sentences.  NLTK provides a couple of different algorithms for sentiment analysis, a NaiveBayes classifier like we described above, and VADER (Valence Aware Dictionary and sEntiment Reasoner) - Not Darth.  VADER performs better on normal text and does not require us to manually train a model.  So we will use Vader as it gets us going a lot quicker.

To get started with Vader we will need a download the data files Vader uses.

.. code-block:: python3

    import nltk
    nltk.download('vader_lexicon')
    nltk.download('punkt')


Here is a function that we can use to map each of the speeches to a sentiment score.

.. code-block:: python3

    from nltk import tokenize
    from nltk.sentiment.vader import SentimentIntensityAnalyzer
    analyzer = SentimentIntensityAnalyzer()

    def score_text(text):
        sentence_list = tokenize.sent_tokenize(text)
        cscore = 0.0
        for sent in sentence_list:
            ss = analyzer.polarity_scores(sent)['compound']
            cscore += ss
        return cscore / len(sentence_list)

Lets try it out on a couple of sentences to see what we get.  ``score_text("This movie is horrible")`` gives us a values of -0.5423 while ``score_text("I love cute puppies")`` gives a score of 0.802.  In fact the scores will always range from -1.0 to +1.0 where -1 is the most negative sentiment and +1 is the most positive sentiment.

With our analyzer ready to go we can add a column to the undf DataFrame containing the sentiment score as follows:

.. code:: python3

    undf['sentiment'] = undf.text.map(lambda t : score_text(t))

You can start that line running in your notebook and grab a cup of coffee as it will take a bit of time to run.

Now comes the moment of truth.  Lets see the distribution of sentiment scores for all of the speeches.

.. code:: python3

    alt.Chart(undf).mark_bar().encode(x=X('sentiment', bin=True), y='count()')

.. figure:: Figures/sentiment_dist.png

Well it seems that the vast majority of the speeches are neutral to positive.  But that may not be a big surprise as you might expect that in the general assembly everyone tries to be careful and diplomatic with their speeches.

What is more interesting to investigate further are the speeches on the edges.

Questions for Investigation
---------------------------

* Which countries are the most positive or negative in their speeches throughout the years?

* Are there trends in positivity or negativity of speeches throughout the years?

* What are the main topics of the most negative speeches?

* What are the main topics of the most positive speeches?


**Lesson Feedback**

.. poll:: LearningZone_8_6
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_8_6
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_8_6
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_8_6
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...
