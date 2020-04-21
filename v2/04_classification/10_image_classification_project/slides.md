---

marp: true

---

<style>
img[alt~="center"] {
  display: block;
  margin: 0 auto;
}
</style>

# Image Classification Project
## Identifying Pneumonia

<!--
We are nearing the end of the classification track. We've learned quite a bit. Over the last few labs we've created binary and multiclass classifers. We've used scikit-learn and TensorFlow to create various models that we have evaluated and tuned.

In this final project you'll get to show off what you've learned in one large project.
-->

---

# Image Classification Project

![center](res/x-ray.jpg)

<!--
In the lab we'll download a dataset from Kaggle. The dataset contains images of x-rays of patient lungs. Some of the images are classified as having pneumonia while others are classified as normal.

Image Details:
* [x-ray.jpg](https://pixabay.com/photos/x-ray-image-x-ray-thorax-lung-x-ray-568241/): Pixabay License
-->

---

# Review

What is convolution? How is it performed and what is the goal? 

<!--
@Exercise(5 minutes) {
Have students discuss convlution. It is a process of passing a filter (kernel) over an image and computing new pixel values (by multiplying the values in the image by those in the filter and adding them up). You need to know the size of your filter and the stride. The goal is to detect features in the image. Remind students that we saw simple kernels that were line detectors. 
}
-->

---

# Review

Describe the general architecture of a convolutional neural network. What knobs can you tune (think about layers, hyperparamenters, etc.)?

<!--
@Exercise(5 minutes) {
Have students discuss CNNs. In general, there are convolutional layers and pooling layers, then the informaiton is fed into a typical fully connected neural network. Changing the number of layers, the order of layers, filter size, stride, pooling size, etc. can all result in different results. Futhermore, an importnat choice the user needs to make is the acitivation function. In particular. since this is a binary classification task, it is useful to use the sigmoid function on the final output layer. Relu works well on the other layers. 
}
-->

---

# Image Classification Project: Dataset

```text
chest_xray
     |--> test
             |--> NORMAL
             |--> PNEUMONIA
     |--> train
             |--> NORMAL
             |--> PNEUMONIA
     |--> val
             |--> NORMAL
             |--> PNEUMONIA

```

<!--
The images in the dataset are already divided into test, train, and validation sets. The training set is, of course, used for training your model. The testing dataset should be used to adjust model hyperparameters, shape, etc. Once you have found a model that tests well, check it against the validation dataset as one final test for the ability for your model to generalize.
-->

---

# Image Classification Project: Tips

* You probably want to enable GPU
* Make sure the dataset matches the documentation

<!--
First tip: enable GPU in Google Colab. This dataset tends to train significantly faster if you enable GPU in runtime.

Also, perform EDA on your dataset. The dataset may have duplication, undocumented folders, etc. 
-->

---

# Your Turn!

<!--
And with that, it is your turn to work on the lab.
-->