---

marp: true

---

<style>
img[alt~="center"] {
  display: block;
  margin: 0 auto;
}
</style>

# Regression Project
Predicting Insurance Charges

<!--
We have learned so much about regression over the past few labs. We have learned about linear regression and polynomial regression. We have learned how to calculate regression quality. We have built regression models using both scikit-learn and TensorFlow, where we have created traditional regression models and neural networks.

However, most of the work we have done with regression has been very guided. In this project you'll be given a dataset, and you will explore it on your own. You will then train and evaluate your own model. The model will be based on a dataset found on Kaggle that contains information about insurance charges. 
-->

---

# Review

What regression models have we learned about?

<!--
Before diving in, let's review a bit. What models have we learned so far? 

@Exercise(5 minutes) {
Have students list the models they have learned so far. Get them to explain each of the models they mention. If they need prompting, remind them about linear regression, polynomial regression, and neural networks.
}
-->

---

# Review

What tools have we learned about?

<!--
We have learned many different tools for performing regression. What are some of those tools?

@Exercise(5 minutes) {
Have students talk about the tools they have learned about. Get them to explain a bit about each of the tools. If they need prompting, remind them about scikit-learn's `LinearRegression` and `PolynomialFeatures`. Remind them about TensorFlow and the Keras API.
}
-->

---

# Review

What data analysis and preparation techniques have we learned about?

<!--
We have also done quite a bit of data analysis and manipulation. What are some techniques and tools we have learned?

@Exercise(5 minutes) {
Have students talk about the tools and techniques they have learned about. If they need prompting, remind them about standardization and normalization. Remind them about detecting missing data and how to fix the data points that are missing. Remind them about basic sanity checking. Remind them about finding bias in the data.
}
-->

---

# Review

How do we measure the quality of a model?

<!--
Once we build a model, how do we know if it is any good? What are some ways for us to test model quality?

@Exercise(5 minutes) {
Have students talk about testing and model quality. If they need prompting, remind the students about having a final validation holdout. Remind them we can measure attributes such as root mean squared error and mean absolute error. Remind them we also validate internally in the model as we perform optimization. Be sure that 'generalization' is brought up. We don't want a model that just scores well while being trained. We want a model that generalizes well to data it has never seen. Remind them we test this by utilizing training, testing, and validation sets. 
}
-->

---

# Regression Project: The Data

Column   | Type   | Description
---------|--------|------------
age      | number | age of primary beneficiary
sex      | string | gender of the primary beneficiary
bmi      | number | body mass index of the primary beneficiary
children | number | number of children covered by the plan
smoker   | string | is the primary beneficiary a smoker
region   | string | geographic region of the beneficiaries
charges  | number | costs to the insurance company (*target*)

<!--
Here are the columns of data you'll be working with. As you can see, we have both numbers and strings. The target column is 'charges', and it is a continuously varying number. 
-->

---

# Regression Project: Your Turn

* Problem Framing
* Exploratory Data Analysis
* Model Building

<!--
It is now your turn to perform a regression from end-to-end.

The lab you are about to be given is divided into three primary parts, shown on this slide.

In the "Problem Framing" section, you'll be given the context for your insurance charges model and asked questions about how machine learning might or might not be the best tool for the job, how the data might be biased, and how the model fits in the overall solution. This section exists to remind you we are creating these models to help drive decisions, and those decisions have impact. There aren't necessarily right or wrong answers here. We are interested in you thinking through the issues and coming up with your own opinion.

In the next section, you'll acquire and explore the data. In this section, we expect you to write code and prose about the data. Does the data have obvious problems? Do any model-independent changes need to be made to the data? EDA is the place to reason about and perform these tasks.

The final section is the modeling section. In this section, we expect you to build and train a model to perform regression. Then measure the quality of that model using, at minimum, a final root mean squared error. It doesn't matter if you perform a linear regression or build a neural network. We just want to see a model built and trained. It would be good if your final RMSE was near or better than the benchmark mentioned in the lab, but that isn't a strict requirement.

Feel free to use any of the tools that we have covered in this course so far.

Take your time. Experiment. Don't be afraid to throw away some work along the way.

-->
