# Problem Framing

<!--
Background content for the slides:
https://developers.google.com/machine-learning/amli-content/what-is-ml/is-ml-right-for-you
https://developers.google.com/machine-learning/amli-content/problem-framing/good
-->

---

# Is ML right for you?

<!--
Topics: Quick mention of bias and fairness
-->

--- 

## ML is a tool

PICTURE WRENCH/NAIL/SCREW

<!--
When you have a hammer, everything looks like a nail.
-->

---

## What kind of tool?

PICTURE PATENT

<!--
What does ML do? What are its benefits? What are its drawbacks?
List on whiteboard
Key points:
Makes predictions
Based on previous data (labeled or not)
Good: robust to changes and unforeseen details
Good: handles highly complex tasks very well
Good: “one size fits all” algorithm
Bad: hard to debug, no insight into how model works (can be biased)
Bad: takes a lot of energy (think coffee pots, or how fast tensorflow drains your laptop battery)
Bad: takes a lot of time
Bad: energy and time cost money
-->

---

## What other tools do we have?

PICTURE TOOLBOX

<!--
Look at definition, brainstorm other ways to accomplish goals
-->

---

Traditional Sofware Engineering

  * Requirements --> Workable Design


Machine Learning

  * Experiments --> Workable Model

PICTURE COMIC

<!--
From https://developers.google.com/machine-learning/amli-content/problem-framing/intro: 
In traditional software engineering, you can reason from requirements to a workable design, but with machine learning, it is necessary to experiment to find a workable model.
Many machine learning systems produce models that encode knowledge and intelligence by interpreting signals differently than humans do. A neural network might interpret a word via an embedding, so "tree" is understood as something like, "[0.37, 0.24, 0.2]," a list of coordinates, like latitude and longitude, and "car" as "[0.1, 0.78, 0.9]."
The neural network might use these representations to do accurate translations or sentiment analysis, but a human looking at the embeddings would find them very hard to interpret. This can make machine learning systems difficult, but not impossible, for humans to understand and evaluate.
-->

---

## Shifting your mindset

"Machine Learning changes the way you think about a problem. The focus shifts from a mathematical science to a natural science, running experiments and using statistics, not logic, to analyze its results.”
-Peter Norvig

<!--
Peter Norvig - Google Research Director
Quote source: https://developers.google.com/machine-learning/amli-content/problem-framing/intro
-->

---

# Comfort with uncertainty

<!--
https://developers.google.com/machine-learning/amli-content/problem-framing/ml-mindset
-->

---

## Scientific method

1.  Set a research goal
1.  Make a hypothesis
1.  Collect data
1.  Test hypothesis
1.  Analyze results
1.  Reach a conclusion
1.  Refine and repeat

<!--
https://developers.google.com/machine-learning/amli-content/problem-framing/ml-mindset
-->

---

## Traits of good ML problems

* Clear problem statement, before we look at data!
* Lots and lots of data
* Predictions, rather than decisions
* Tolerance for inaccurate output

<!--
https://developers.google.com/machine-learning/amli-content/problem-framing/good
-->

---

## Framing a problem

* Start clearly and simply
* What is your ideal outcome?
* Success and failure metrics
* Other failure scenarios

<!--
https://developers.google.com/machine-learning/amli-content/problem-framing/framing

Patents: "We want to know how many patents exist across important domains such as self-driving cars and mobile advertising."
Hiring: "We want to catch competitive engineers' resumes that resume screeners mistakenly missed or rejected."
Tech support: "We need to reduce the load on Technical Support by increasing the usage of self-help articles."
-->

---

# Keep it simple!

(like, in ML, and in engineering, and in general)

<!--
Use examples: 
You can use this if Kevin O’Malley gives guest lecture. His research team made advanced signal processing to identify song, other university team blew them away with simple string searches
-->

---

## Good questions

* What is the goal?
* Do you have enough data?
* How will you measure success?
* What is the cost vs. reward?

---

## Properties of good output

* Connected to your ideal outcome
* Can you obtain outputs to train with?
* Batch or real-time output usage?
* Highlights flaws in original problem statement
* Predicts the correct result more often than equivalent heuristics
