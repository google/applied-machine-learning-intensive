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
* Make sure the dataset looks like it is documented to look

<!--
First tip: enable GPU. This dataset tends to train significantly faster if you enable GPU in runtime.

Also, perform EDA on your dataset. The data has some duplication and some undocumented folders at one time. They might still be around.
-->

---

# Image Classification Project

## Your Turn!

<!--
And with that, it is your turn to work on the lab.
-->