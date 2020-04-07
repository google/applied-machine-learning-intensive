---
marp: true
---

<style>
img[alt~="center"] {
  display: block;
  margin: 0 auto;
}
</style>

# Classification Project
Predicting Titanic Survivors 

<!--
In this project, you will apply what you have learned about classification and TensorFlow to complete a project from Kaggle.  
-->

---

![center](res/ship.jpg)

<!--
 The challenge is to achieve a high accuracy score when trying to predict which passengers survived the Titanic shipwreck. 

Image Details:
* [ship.jpg](https://pixabay.com/photos/ship-wreck-old-rust-stranded-3401500/): Pixabay License
-->

---

# Review

What types of classification have we learned about?

<!--
Before diving in, let's review a bit.

@Exercise(5 minutes) {
Have students name and discuss the types of classification that they have learned so far. If they need prompting, remind them about binary and multiclass classification. Have them give examples of binary classification vs. multiclass classification. 

Ask students to discuss what type of classification would be most appropriate for predicting which passengers survived the titanic shipwreck.
}
-->

---

# Review

What tools have we learned about?

<!--
We have learned many different models and tools for performing classification. What are some of those models and tools?

@Exercise(5 minutes) {
Have students discuss the models and tools they have learned so far. Get them to explain a bit about each of the tools. If they need prompting, remind them about logistic regression and scikit-learn's LogisticRegression. For multiclass classification, we talked about OvO and OvA along with scikit-learn's SGDClassifier. We also practiced classification using Keras and Tensorflow. 
}
-->

---

# Review

What metrics have we learned for evaluation classification models? 

<!--
What are some of the evaluation metrics we've discussed? 

@Exercise(5 minutes) {
Have students talk about the evaluation metrics for classification models. If they need prompting, remind them about the confusion matrix, accuracy, precision, recall, F1, and RoC. Have students discuss what each metric measure is and how we interpret them. 
}
-->

---

# Review

What other useful techniques have we learned and what are they used for? 

<!--
We've covered a few other techniques that can be useful for model training and testing. Can you name a few and describe their purpose? 

@Exercise(5 minutes) {
Have students talk about any other useful miscellaneous techniques that come to mind. If they need prompting, remind them about stratification and cross-validation. 
}
-->

---

# Classification Project: The Data

Column        |  Type  | Description
--------------|--------|------------
Survived      | number | 1 or 0 (*target*)
Name          | string | Passenger name
Pclass        | number | Ticket class
Sex           | string | male or female
Age           | number | Passenger age
SibSp         | number | # of siblings/spouses on board
embarked      | string | Port of Embarkation


<!--
The dataset we're using comes from Kaggle. Here are just of a few of the columns of data you'll be working with. As you can see, we have both numbers and strings. The target column is 'Survived', and it is a number that is either 0 or 1. 
-->

---

# Classification Project: Kaggle Competition
Titanic: Machine Learning from Disaster


<!--
Kaggle hosts several competitions that are open to users. It's an exciting way to engage with the broader machine learning community and learn new things! At the end of this lab, you will upload your results to the Kaggle competition and see how your model compares to the over 17,000 other models people have created! 
-->

---

# Classification Project: Your Turn

* Exploratory Data Analysis (including pros and cons of using ML)
* The Model 
* Make Predictions and Upload To Kaggle
* Iterate on Your Model

<!--
It is now your turn to perform a classification from end-to-end.

The lab you are about to be given is divided into four primary parts, shown on this slide.

In the first section, you'll acquire and explore the data. In this section, we expect you to write code and prose about the data. Does the data have obvious problems? Do any model-independent changes need to be made to the data? EDA is the place to reason about and perform these tasks. This is also a good time to think about the pros and cons of using machine learning to solve this problem. 

In the next section, you will build and evaluate your model. You may choose to use scikit-learn or Tensorflow. You may even try multiple approaches and compare your results. In this section, you should also evaluate your model, and discuss your particular evaluation metrics (including why you chose them and what they say).

Finally, you will make predictions on the features found in the test.csv file and upload them to Kaggle using the Kaggle API. Your lab should discuss your predictions as well as your Kaggle results. 

Last but not least, iterate on your model. Tweak hyperparameters, and see if you can improve your model. Discuss your method for changing specific hyperparameters (be thoughtful and methodical, don't just do it at random!). Since this is a popular Kaggle dataset and competition, research other users' solutions. Try looking at solutions that both do and don't use ML, and discuss their relative merits. 

Take your time. Experiment. Don't be afraid to throw away some work along the way.

-->
