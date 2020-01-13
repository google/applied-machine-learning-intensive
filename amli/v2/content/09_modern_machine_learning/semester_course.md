![](res/TTXgreen.png)

---

# Goals of This Class

* Learn to take a real-life problem and apply machine learning to make predictions.
* Learn to implement machine learning solutions using TensorFlow
* Learn how to evaluate the quality of your solution
* Machine learning is a very broad field -- we only just touch upon some of the most common machine learning algorithms

---

![](res/TTXgroupchat.png) 

**get to know each other!** {.big}

* Find someone you don’t know and talk about what is your expectation of this ML course.
* You will introduce your partner and share your partner’s expectation briefly in 1-2 min.

---

![](res/TTXgreen.png)

# Applications

---

![](res/TTXblue01.png)

---

# Sample Applications of Machine Learning

* Medical applications such as disease prediction
* Speech recognition and understanding
* Recommendation systems
* Malware and spam detection
* Image understanding and annotation
* AI for games
* Translating between languages
* Predicting likelihood of earthquakes
* Matching resumes with jobs

<!--
Goal here is to make sure the students see the wide range of applications of machine learning.  First just some sample applications from a wide range of areas and then some explicit examples where ML is used at Google.
-->

---

# Google Products Using Machine Learning

![](res/TTXpic01.png)

---

# Google Assistant

![](res/TTXpic02.png)

<!--
Search - something we all us all the time
Voice recognition
Ranking - which pages to show
-->

---

# Google Photos: Searching Images via Text

![](res/TTXpic03.png)

<!--
Image collections are growing rapidly with digital cameras, especially our phones
Extremely hard to label every image to be able to find it when needed
There are people who do that
Google labels your pictures - allows you to search without ever adding a label
(Source: image: Photos taken by Wolff Dobson in Tokyo 2016 -- have permission to use here)
-->

---

# Gmail: Smart Reply

![](res/TTXpic04.png)

<!--
Smart Reply
A lunch invitation from a colleague
Makes good suggestions for simple replies to emails
-->

---

# Google Play Music: Recommending Music

![](res/TTXpic05.png)

<!--
Deep Learning is also used in everyday applications, like Google Play Music.
Here, it’s used to recommend artists you might enjoy
-->

---

# Game Playing: Alpha Go

![](res/TTXpic05.png)

<!--
Deep Learning can also be used to play games.
You might have heard of “DeepBlue” - the first computer to play chess at a championship level.
In 1997, it defeated the world champion - Garry Kasparov.
But to do it, DeepBlue used mostly brute force. In fact, it used an algorithm demonstrated by Claude Shannon, back in 1949! (recommendation: go read about Claude Shannon on Wikipedia)
-->

---

# Google Play Music: Recommending Music

![](res/TTXpic06.png)

---

# Combined Vision and Translation

![](res/TTXpic07.gif)

<!--
Deep Learning can also be used for text recognition and translation
Machine Learning powers translation from and to 90+ different languages, in Google Translate.
-->

---

![](res/TTXgroupchat.png) 

**your favorite ML applications** {.big}

* What are some applications of machine learning you know about and like?
* Where are some places you think machine learning might be helpful?
* Where do you think machine learning might be harmful?

---

![](res/TTXgreen.png)

# Introduction to AI and Machine Learning

---

# What is Machine Learning (ML)?

There are many ways to define ML.

* ML systems learn how to combine data to produce useful predictions on *never before seen data*
* ML algorithms find patterns in data and use these patterns to react correctly to brand *new data.*

---

# ML is a branch of Artificial Intelligence 

Artificial Intelligence (AI) focuses on the creation of computer programs that appear to work and react like humans

---

![](res/TTXgroupchat.png) 

**AI & ML** {.big}

Discuss about the relationship between AI and ML.
* What are examples of AI technologies?
* What are examples of ML technologies?

---

---

![](res/TTXgreen.png)

# Introduction to Linear Regression

---

# Sample Machine Learning Problem

![](res/TTXpic08.png)

<!--
Begin with a very simple example.  The goal here is to help the students really understand what we mean by a linear model.  Goal is to slowly build up from a line in two dimensions to a higher-dimension linear model.
-->

---

# Sample Machine Learning Problem (cont)

![](res/TTXpic09.png)

---

# Sample Machine Learning Problem (cont)

![](res/TTXpic10.png)

---

![](res/TTXgroupchat.png) 

**prediction** {.big}

Given our model of the data y = 7x - 30, how might we predict cricket chirps/minute (y) for a temperature (x) that we don't have a measurement for?

---

# Sample Machine Learning Problem (cont)

![](res/TTXpic11.png)

<!--
The goal of the green line is to illustrate using the model to make a prediction visually as well as algebraically.
-->

---

# Sample Machine Learning Problem (cont)

![](res/TTXpic12.png)

<!--
First introduce the notion of a model for the parameters of the network, and what is meant by a linear model.
-->

---

# Definition: Linear Regression

![](res/TTXpic13.png)

<!--
Begin defining linear regression. We are going to introduce some notation in the next few slides.  The goal is to step through this slowly so the students have time to get comfortable with the notation.
-->

---

![](res/TTXgreen.png)

# Linear Regression with Many Features

---

![](res/TTXgroupchat.png)

**applying ML** {.big}

Imagine the problem of building an ML model to predict apartment rental price.
* What features would you use?
* What would the training labels be?
* Describe some unlabeled examples
* Find a way to describe this as a regression task

---

# Linear Regression with Many Features

![](res/TTXpic14.png)

<!--
This is a good chance to discuss the w_1 is a weight giving the importance of x_1 (# of bedrooms) to predicting the rent and w_2 is the importance of x_2 (condition of the building) in predicting the rent.
-->

---

# Linear Regression Notation

![](res/TTXpic15.png)

<!--
Here we transition to an n-dimensional model.  In TF b is used for the bias but I think it’s also good to introduce the convention of using w_0 for b.  But after this slide, the convention is to stick with using b.
-->

---

# Summary of Linear Regression

![](res/TTXpic16.png)

<!--
Close with a single slide summarizing linear regression.  Stop here and ask the students if there are any questions about the slide.  Return to earlier slides if needed.
-->

---

![](res/TTXgreen.png)

# Visualizing Loss With a Scatter Plot

---

# Loss

![](res/TTXpic17.png)

<!--
First, we want to show some ways to visualize the model to evaluate if it is good.  Even after we define a mathematical definition of loss this is important as a way to evaluate if the model is good.  For example, looking at the RMSE doesn’t really tell you if the model is any good.  We’ll make this concrete later.
-->

---

# Evaluating if a Linear Model is Good

* We will eventually look at mathematical ways to evaluate the quality of a model but that should not replace more informal yet intuitive ways to evaluate a model 
* When you just have one variable, drawing a line on a scatter plot that shows the model predictions is a good tool.
* Let’s look at two different models to predict the price of a car from its engine’s horsepower.

---

# Which Model is Better?

![](res/TTXpic18.png)

---

![](res/TTXgreen.png)

# Visualizing Loss with a Calibration Plot

---

# Calibration Plots To Visualize a Model

![](res/TTXpic19.png)

---

# Which Model is Better?

![](res.TTXpic21.png)

---

![](res/TTXgreen.png)

# Quantifying Loss

---

![](res/TTXgroupchat.png) 

**measuring loss** {.big}

What are some mathematical ways to measure loss? Remember that
* Loss should become smaller when predictions improve.
* Loss should become larger when prediction get worse.

Lots of ideas are reasonable here; be creative.

---

![](res/TTXgreen.png)

# Squared Loss and RMSE 

---

# A Convenient Loss Function for Regression 

![](res/TTXpic22.png)

---

# Computing Squared Error on a Data Set

![](res/TTXpic23.png)

<!--
Talk through the notation and also re-iterate the vector notation so they understand it when it shows up later.
  -- x is our input example.  It’s bold because it’s a vector with many dimensions (features).
  -- y is our label.
  -- D is a data set containing many labeled examples, which are (x, y) pairs.
  -- (y-y’)2 is the loss for any given example; prediction(x) gives y’ for a given x.
-->

---

# RMSE - Root Mean Squared Error

![](res/TTXpic24.png)

---

![](res/TTXgroupchat.png)

**RMSE** {.big}

Why is minimizing root mean squared error (RMSE) the same as minimizing mean squared error (MSE)? 

(Reminder: The only difference is that RMSE is the square root of MSE.)

---

![](res/TTXgreen.png)

# Intro to SGD (Stochastic Gradient Descent)

---

![](res/TTXblue02.png)

---

# Gradient Descent: High Level View

![](res/TTXpic25.png)

---

# Pictorial View of Gradient Descent

![](res/TTXpic26.png)

---

# Pictorial View of Gradient Descent

![](res/TTXpic27.png)

---

# Pictorial View of Gradient Descent

![](res/TTXpic28.png)

---

# Training: A Gradient Step

![](res/TTXpic29.png)

<!--
Visual explanation of gradient descent in 3 slides:
First slide gives our starting point.  Can point out the shape of the loss function and the global minimum, noting that this is convex. 
Second slide shows the direction of the (negative gradient), and the particular step size we decide to take.  (more on step size in a bit)
Third slide shows where we end up on loss when we take a step.  It’s a bit closer to the minimum (hooray!) but we’ll need to iterate more.
-->

---

![](res/TTXgroupchat.png) 

**gradient ascent** {.big}

What would happen if we took a step in the positive gradient direction instead of the negative gradient direction? 

When might we do this?

---

![](res/TTXgreen.png)

# Using SGD in Tensorflow

---

# Using TensorFlow

Later in the course we will present **Gradient Descent** in more depth.  For now we just present enough detail for you to be apply to apply the TF API to obtain a good linear model for a simple real data set.

<!--
Step through all the arguments here
-->

---

# Learning Rate: Size of Step to Make

![](res/TTXpic30.png)

<!--
This all just applies to a convex function but for now we’ll not discuss this unless someone asks.
-->

---

# Using TensorFlow (TF)

![](res/TTXpic31.png)

<!--
Step through all the arguments here.
-->

--- 

# Training a Model with Gradient Descent

![](res/TTXpic32.png)

---

# Things You Need to Decide

* **Learning Rate**
  * Very important since this is the size of the step to take.  Typically change by powers of 10 until the model is training reasonably well and then fine tune
* **Number of Steps to Train**
  * Time to train is proportional to this (for fixed set of features). You want to make this is as small as you can while still getting to the minimum loss possible.
* **What Features to Use**
  * This is very important and will be our next main topic

---

![](res/TTXgreen.png)

# Using Learning Curve to Adjust the Learning Rate

---

![](res/TTXgroupchat.png) 

**learning rate** {.big}

What might happen if the learning rate is set much too small? Much too large?

---

# Learning Rate Way Too Low

![](res/TTXpic34.png)

---

# Learning Rate Way Too High

![](res/TTXpic35.png)

---

# Learning Rate Still Too High

![](res/TTXpic36.png)

---

# Need More Steps (loss still going down)

![](res/TTXpic37.png)

---

# Good Learning Rate and Number of Steps

![](res/TTXpic38.png)

---

# Converging to a Poor Model

![](res/TTXpic39.png)

<!--Make sure the students recognize the from the learning curve it looks like the model is good.  ALso looking at the RMSE it looks good.  However when looking at the calibration plot you can see that the model is not good. 

---

![](res/TTXgroupchat.png) 

**loss curves** {.big}

So far we have only been thinking about the loss curve for mean squared error, which looks like a bowl. 

How well do you think gradient descent would work for other loss function shapes? 

What would it mean if your loss function was flat? How would gradient descent work if your loss function was very bumpy?

---

![](res/TTXgreen.png)

# Introduction to Feature Engineering

---

![](res/TTXblue03.png)

---

# Start By Exploring Your Data

![](res/TTXpic40.png)

---

# Feature Engineering

![](res/TTXpic41.png)

---

# Why Transform Features

![](res/TTXpic42.png)

---

![](res/TTXgroupchat.png) 

**linear models** {.big}

Say you are predicting the price of a room on Craigslist and two features you have are the room's length and width. 

Can a linear model compute the room's area (length * width) when making predictions? How or why not?

---

# Why Transform Features (cont)

![](res/TTXpic43.png)

---

# Transforming Numeric Features

![](res/TTXpic44.png)

---

![](res/TTXgroupchat.png) 

**feature scales** {.big}

What if you are creating a linear model to predict city mpg of a car from highway mpg (x1) and price (x2)

What happens if you directly use these features?

---

# Transforming Numeric Features (cont)

![](res/TTXpic45.png)

# Transforming Numeric Features (cont)

![](res/TTXpic46.png)

---

![](res/TTXgreen.png)

# Scaling and Clipping Numeric Features

---

# Transforming Numeric Features

![](res/TTXpic47.png)

---

# Linear Scaling

![](res/TTXpic48.png)

<!--
On the board help them derive this formula.
-->

---

![](res/TTXgroupchat.png) 

**linear scaling** {.big}

What would happen if you used linear scaling, but there was an outlier? 

What other feature transformation could you use to prevent this?

---

# Feature Clipping

![](res/TTXpic49.png)

---

# Log Scaling

![](res/TTXpic50.png)

---

![](res/TTXgroupchat.png) 

**log scaling** {.big}


Why does log-scaling help spread out power-law data? 

As an example, what is log10(10)? log10(10^2)? log10(10^3)?

---

# Z-score scaling

![](res/TTXpic51.png)

---

![](res/TTXgreen.png)

# Introducing Non-Linearities via Bucketizing Features

---

# Add Non-Linearities To a Linear Model

![](res/TTXpic52.png)

---

# Motivation: Bucketizing Numeric Features

![](res/TTXpic53.png)

---

# Bucketizing Compression Ratio

![](res/TTXpic54.png)

---

# Using Raw and Bucketized Features

![](res/TTXpic55.png)

---

# Selection of Bucket Boundaries

![](res/TTXpic56.png)

---

![](res/TTXgreen.png)

# Using Quantiles to Compute Bucket Boundaries

---

# Creating Buckets by Quantiles

![](res/TTXpic56a.png)

---

# Creating Bins by Quantiles

![](res/TTXpic56b.png)

---

![](res/TTXgroupchat.png) 

**quantiles** {.big}

What is the advantage of using quantiles (left) versus equal width bins (right)?

![](res/TTXpic56c.png)

---

![](res/TTXgroupchat.png) 

**quantiles** {.big}

How could we transform the data so that uniform scaling makes more sense?

![](res/TTXpic56d.png)

---

# Quantiles vs. Equal Width Bins

* Both forms of binning provide non-linear behavior since the feature weight for each bin can be independently set
* Using quantiles gives more resolution in areas where there is more data
* For both techniques, you can adjust the number of bins to vary the amount of resolution versus the number of features introduced.

---

![](res/TTXgreen.png)

# Representing Categorical Features

---

# Representing Categorical Features

* How can we represent features such as:
  * The day of the week
  * A person’s occupation(s)
  * The words in an advertisement
  * The movies a person has rated
* Remember a linear model can only take a weighted combination of features.

---

# Graphical View of a Linear Model

![](res/TTXpic57.png)

<!--
Remind students that this is one way to represent a linear model.  We have three inputs, x1, x2, and x3, shown by the blue circles.  They’re combined with some weight (given on each edge) to produce an output.  Bias term isn’t shown.
-->

---

# Transforming Categorical Features

![](res/TTXpic58.png)

---

# Categorical Features: One-Hot Encoding

![](res/TTXpic59.png)

---

# Efficiently Representing One-Hot Encoding

![](res/TTXpic60.png)

---

# Efficiently Representing One-Hot Encoding

![](res/TTXpic61.png)

---

# One-Hot Encoding vs Single Numeric Feature

![](res/TTXpic62.png)

--- 


![](res/TTXgroupchat.png) 

**numerical vs. one-hot** {.big}

Can you think of a type of data where a one-hot representation makes more sense than a numerical one? 

What about vice versa?

---

# Encoding Features that are Sets/Phrases 

![](res/TTXpic63.png)

---

# Encoding Features that are Sets/Phrases 

![](res/TTXpic64.png)

---

# Vocabulary for Categorical Features

![](res/TTXpic65.png)

--- 

![](res/TTXgroupchat.png) 

**vocabulary** {.big}

Can you think of a potential issue with using a fixed vocabulary? 

Hint: Think about what would happen if you tried to encode the sentence "it costs a badrillion dollars."

---

# Vocabulary - Out of Vocab

![](res/TTXpic66.png)

---

![](res/TTXgroupchat.png) 

**OOV** {.big}

Can you think of a potential issue with using a single OOV indicator? 

Hint: Think about the representations for "it costs a badrillion dollars" and "it costs a coupla dollars.”

---

# Hashing to Define Vocabulary Mapping

![](res/TTXpic67.png)

---

![](res/TTXgreen.png)

# When to Treat Numerical Data as Categorical 

---

![](res/TTXgroupchat.png) 

**categorical vs. numerical** {.big}

How would you encode a feature such as zipcode? 

Does it make more sense as a categorical or numerical feature? 

Can you think of any domain-specific feature transformations which would make sense here?

---

# Categorical vs. Numerical Features

* How would you encode a feature such as zipcode?
* Though it could be used directly as a numerical feature, you don’t want to multiply it by a weight.
* Best to treat zipcode as categorical data.
* You could use domain knowledge to group zipcodes that are geographically nearby into a single bucket.
* **You need to think about raw features and how to best use them.**

---

# Feature Engineering: Missing Features

Often data sets are missing features. 

* If this is extremely rare we could just skip those examples, but otherwise what do we do?
* For non-numerical data?

---

![](res/TTXgreen.png)

# Handling Missing Data

---

# Feature Engineering: Missing Features

Often data sets are missing features. If this is extremely rare we could just skip those examples, but otherwise what do we do?

* For non-numerical data?
  * A common solution is to just introduce a feature value for “missing”
* How do we handle this for numerical data?

---

# Feature Engineering: Missing Features

Often data sets are missing features. If this is extremely rare we could just skip those examples, but otherwise what do we do?

* For non-numerical data?
  * A common solution is to just introduce a feature value for “missing”
* How do we handle this for numerical data?
  * Use the average value (or some common value)
  * Bin the data and introduce a “missing” bin

---

![](res/TTXgreen.png)

# Introducing Non-Linearities via Feature Crosses

---

# Add Non-Linearities To a Linear Model

* Linear models can represent a lot more problems when we add **non-linearities** to the features
* We’ve already seen one way to do this:
  * Bucketizing Numerical Features
* Other ways to introduce non-linearities:
  * Feature Crosses
  * Adding Artificial Variables
  
---

# Preview: Feature Crosses

* We will study feature crosses in more depth later.
* In a linear model the contribution captured for each feature is independent of the others and this is often not the case in data.
* **Feature Crosses** introduce non-linear behavior between a set of two or more features by capturing dependencies between the features.

---

# Feature Cross Example

![](res/TTXpic698.png)

---

![](res/TTXgroupchat.png) 

**feature cross cost** {.big}

If we have one feature which can take on M values and another feature which can take on N values, how many values will the cross of these two features take on?

---

![](res/TTXgroupchat.png) 

**numerical crosses** {.big}

How can we apply feature crossing to numerical data? Is there a feature transformation that makes sense here?

---

# Feature Crosses in TensorFlow

* Define new features called crossed column  in TF for the cross  [A x B] using either bucketized numerical features or categorical features A and B
* The resulting crosses are often extremely sparse
* Crosses can involve any number of features, such as: [A x B x C x D x E]

<!--
Mention that “cross products” is a synonym.  For folks wondering more about this, can remind them that these are cartesian products on sets.

This is where we hit the idea of sparsity.  Sparse feature vectors are feature vectors where most of the values are 0.  For example, in the latitude binning example from the previous section, we ended up with a just a single “1” bin-feature and the remaining 9 bin-features were 0’s.  This idea can be taken to the extreme for large scale data, as may be appropriate for presence / non-presence of words in a text snippet as one example.
-->

---

# Feature Crosses: Some Examples

![](res/TTXpic69.png)

<!--
A fine intuition here is to say that some words in a pet description are only “good” at certain times of day.  For example, jumping up excitedly is often a nice way for a pet to welcome its owner home, but may be very unwelcome at 3am.
-->

---

# Feature Crosses: Why Would We Do This?

* Linear learners scale well to massive data
* But without feature crosses, the expressivity of these models would be limited
* Using feature crosses + massive data is one efficient strategy for learning highly complex models
  * Foreshadowing: Neural nets provide another
* Are there downsides to adding more and more crosses?

<!--
If you feel like getting into it, you can mention that part of the extreme efficiency of these systems comes from exploiting sparsity in the data -- out of potentially billions of potential crosses, only a few hundred are likely present with non-zero values in a given example.
-->

---

# Feature Engineering: Be Creative!

* We’ve just seen some examples but the key is to think about your data, what a linear model can do and then how to best capture that.
* Remember, there’s not one right answer.  Sometimes you need to try a few things and see what gives you the best predictions.


---

![](res/TTXgroupchat.png) 

**last example** {.big}

If you wanted to predict the rental price for an apartment and you had a street address, how might you represent that? 

What kind of additional useful features could you collect based on the street address?

---

![](res/TTXgreen.png)

# Mathematics of Stochastic Gradient Descent (SGD)

---







