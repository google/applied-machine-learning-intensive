---

marp: true

---

# Classification with TensorFlow

<!--
We have performed binary and multiclass classification with scikit-learn. We'll now use the TensorFlow toolkit to create a deep neural network that can perform classification.
-->

---

# Dataset: UCI Heart Disease

*Predicting the presence of heart disease*

<!--
The dataset that we'll be using is the UCI Heart Disease dataset. The dataset contains health information about patients, as well as, a "presence of heart disease" indicator. This indicator is a 1 for "has heart disease" and 0 for "does not have heart disease".

As you can probably guess, the model that we will be building with be a binary classification model.
-->

---

# Dataset: Features

> Feature | Description
> --------|--------------
> age     | age in years
> sex     | sex<br>0 = female<br>1 = male
> cp      | chest pain type<br>1 = typical angina<br>2 = atypical angina<br>3 = non-anginal pain<br>4 = asymptomatic

<!--
The dataset contains thirteen features.

The first is 'age'. Age is a continuous integer value representing the patient age in years.

Next comes 'sex'. This column is a catagorical column with zero representing femail and one representing male.

'cp' stands for chest pain. It is a catagorical column with the four values shown.
-->

---

# Dataset: Features (continued)

> Feature   | Description
> --------  |--------------
> trestbps  | resting blood pressure in Hg
> cholserum | cholesterol in mg/dl
> fbs       | is fasting blood sugar > 120 mg/dl<br>0 = false<br>1 = true
> restecg   | results of a resting electrocardiograph<br>0 = normal<br>1 = ST-T wave abnormality<br>2 = left ventricular hypertrophy


<!--
Next up is 'trestbps'. This is another continuous varible. It is the resting blood pressure of the patient upon admission to the hospital.

'cholserum' is a continuous variable representing cholesterol.

'fbs' is a measure of fasting blood surgar, but it is represented as a catagorical column that measures if blood sugar is over a threshold.

'restecg' is a catagroical column with the three values shown.
-->

---

# Dataset: Features (continued)

> Feature   | Description
> --------  |--------------
> thalach   | max heart rate
> exang     | exercise induced angina<br>0 = no<br>1 = yes
> oldpeak   | measurement of an abnormal ST depression
> slope     | slope of peak of exercise ST segment<br>1 = upslope<br>2 = flat<br>3 = downslope

<!--
The next two columns have to do with an exercise stress test that the patients did. 'thalach' is maximum heart rate that the patient achieved during the exercise session. This is a continuous variable. 'exang' is a catagorical variable that let's us know if the exercise cause angina.

'oldpeak' is a continuous variable that measures ST depression. ST depression is a curve on an electrocardiogram graph where the ST segment line is very low when compared to a baseline.

'slope' is a strange one. Intuitively you'd expect it to be the slope of a line, but instead it is a catagorical variable that lets you know which direction the line was going at the peak exercise ST segment.
-->

---

# Dataset: Features (continued)

> Feature   | Description
> --------  |--------------
> ca        | count of major blood vessels colored by flourosopy<br>0, 1, 2, 3, or 4
> thal      | presence heart condition<br>0 = unknown<br>1 = normal<br>2 = fixed defect<br>3 = reversable defect

<!--
'ca' is a count of major blood vessels colored by flourscopy. The values are 0, 1, 2, or 3 and are limited by biology. So this is a continuous variable with a very limited range.

'thal' relates to a heart defect. The column answers the questions: Does it exist? Is it repariable?

You might notice that the values on the slides for some of these columns differ from the documentation. For instance, the documentation for 'ca' states that the values range from 0-3, but there are 4s in the data. And the documentation for 'thal' says that the values are 3, 6, and 7, but the actual values in the data are 0, 1, 2, and 3.

The takeaway from this is that you should always read the documentation, but you should also always look at the data and verify that the documentation is accurate. When there are questions you should do research. If you are in contact with the source of the data, ask for clarification. Though documentation is great and can really help in data science, the data is the actual ground truth.
-->

---

# The Model: Output Layer

```python
    tf.keras.layers.Dense(1, activation=tf.nn.sigmoid)
```

<!--
The model in this lab won't look too different than the TensorFlow Keras models that we built for regressions. The primary difference is the final layer in the model.

We want to create a binary prediction that will let us know if a patient has heart disease or not. If we stick to relu activation functions for the output then there is no bound for the maximum output value, so it would be impossible to understand what the prediction confidence is.

Instead we'll use an activation function that limits the output value. In this particular lab we use a sigmoid function so that the output is limited to the range of 0.0 to 1.0. The output is then a measure of confidence that a patient has heart disease (since has heart disease is the 1.0 value). We can then decide how much confidence it takes to classifiy the patient as having heart disease. The choice of threshold is very important for model performance.
-->

---
# The Model: Loss

```python
    model.compile(
        loss='binary_crossentropy',
        optimizer='Adam',
        metrics=['accuracy']
    )
```

<!--
How we measure loss is also very important. For binary classification problems we need to use binary crossentropy.
-->

---

# The Model: Early Stopping

```python
    tf.keras.callbacks.EarlyStopping(
        monitor='loss',
        min_delta=1e-3,
        patience=5,
    )
```

<!--
We'll also visit early stopping in this lab. Early stopping is a model fitting strategy where you monitor some metric, say loss, and stop training when that metric doesn't change enough across a number if epochs.

In this example we monitor loss and stop early if the loss hasn't changed at least 0.001 between any of the last 5 epochs.
-->

---

# Your Turn

<!--
And with that, it is your turn to perform binary classification using TensorFlow Keras and deep neural networks.
-->