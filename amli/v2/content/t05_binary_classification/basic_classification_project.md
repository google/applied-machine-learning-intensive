# Titanic Survivorship Classification Project

<!--
Description
This project will give students an opportunity to apply what they learned about binary classification and tensorflow to implement a Kaggle project without much guidance. The challenge is to achieve a high accuracy score when trying to predict which passengers survived the Titanic crash. After implementing the project using Colab, they are expected to upload their predictions to Kaggle and submit the score received.
Learning Objectives
Students will be able to:
* Define, build, train and evaluate a Linear Classifier model in TensorFlow.
* Submit predictions to a Kaggle challenge.

Teaching Materials

Prerequisite(s): 
* Binary classification with TensorFlow (completion of the “Basic Classification with TensorFlow” colab)
* T05-08_Titanic Survivorship (binary classification) - Project 04 [Lecture] Activity 
* T05-08_Titanic Survivorship (binary classification) - Project 04 [Colab]

Expected duration: 240 mins

Artifacts produced:
* Student copy of colab activity

Graded or not?
* Yes. 5% of final grade. Solutions included in colab.

Facilitator notes and background materials

Facilitator Notes:
* This project is based on the Basic Classification with TensorFlow colab. Make sure students completed that before tackling this project.
* When introducing the project, make sure all of the students are familiar with Kaggle. If they are not, spending a couple of minutes showing the website and giving a brief description of how it works.
* The project was divided into parts:
* The first part is almost exactly what they did in previous colabs: upload the data, split into features and target, create classifier, train, make predictions, evaluate.
* Once they have the first part working, they will need to then assign the whole dataset to training, and download the test.csv file from Kaggle. Make sure they prep the data before using it, i.e., handle null values, drop columns, etc, so that the sets looks exactly like the one used to train. One suggestion is to wrap the data prep into a function that can be called whenever creating a new training/testing set.
* The only score they will receive from Kaggle is accuracy. If time permits, have a discussion with the class about whether accuracy is a good evaluation metric in this case, and when changing the precision/recall threshold would be appropriate. For example, if we’re just trying to create a model to see how many times it can predict correctly (as is the case for the challenge), accuracy is enough. However, if they were using something like this to aid rescue efforts and try to figure out who might be alive, they would probably want a high recall (it’s best to find people who are, unfortunately, deceased, than to leave the living waiting for a rescue that never came because they just assumed the person was dead).
* For the written part of the assignment, we want students to report their score along with a description of their work and strategies. What was difficult? What would they do differently next time? Why did they make certain choices? For example, during data prep, did they normalize and/or scaled any values? Which columns did they drop and why? Etc.  

If you have enough time at the end or after the project, go over one of the optional exercises. 
* The first one is a Kaggle kernel shared by the user Manav Sehgal (@startupsci). He presents a detailed walk through that is very accessible for beginners and can be a good example of how to approach and break down a problem
* The second one is a Udacity project. The project is an early assignment for their Machine Learning nanodegree, and it shows how to build a decision tree manually, by exploring the dataset, creating visual representations of the data (for example, compare survival rates for men vs women, 1st vs 3rd class, etc), and then creating simple functions that determine whether or not a passenger was likely to survive (ex, females from 1st and 2nd class were marked with a 1, meaning they survived, while males over the age of 10 who did not belong to the first class were marked with a 0, as they were  unlikely to survive). I highly recommend going through this project with the students if there’s time, as it’s a good opportunity to demystify what the algorithm is actually doing. The function below, which is very basic, achieves an accuracy of 81.14%.
def predictions(data):
    """ Model with multiple features. Makes a prediction with an accuracy of at least 80%. """
    
    predictions = []
    for _, passenger in data.iterrows():
        
        if passenger['Age'] < 10:
            predictions.append(1)
        elif passenger['Sex'] == 'female' and passenger['Pclass'] < 3:
            predictions.append(1)
        elif passenger['Sex'] == 'female' and passenger['Parch'] == 0:
            predictions.append(1)
        elif passenger['Sex'] == 'male' and passenger['Pclass'] == 1 and passenger['Age'] < 40 and passenger['Age'] >= 20:
            predictions.append(1)
        else:
            predictions.append(0)
    

    return pd.Series(predictions)


Background materials
Basic Classification with TensorFlow [Colab]
-->

---

# Your Turn

[T05-08 Titanic survivorship binary classification project 04 colab](https://colab.sandbox.google.com/drive/1xwStsdPtS_sA8fE-sDF1RL77xphrMdt0)
