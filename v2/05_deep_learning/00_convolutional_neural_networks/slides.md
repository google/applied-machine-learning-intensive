---
marp: true
---

<style>
img[alt~="center"] {
  display: block;
  margin: 0 auto;
}
</style>

# Convolutional Neural Networks

---

![center](res/conNN02.jpg)

<!--

Like neural networks, convolutional neural networks were inspired by biology. 

In the 1960s, David Hubel and Torsten Wiesel showed that the visual cortex in cats and monkeys contain neurons that fire individually in response to small regions in the field of view. 

Image Details:
* [conNN02.jpg](https://pixabay.com/photos/eye-iris-pupil-vision-eyeball-3221498/): Pixabay License
-->

---

![center](res/conNN03.jpg)

<!--
For a given neuron, the visual space that affects whether or not that neuron will fire is known as its "receptive field." 

Neurons that are spatially close together often have similar and overlapping receptive fields. 

Our eyes and brains then take the information from each of these small receptive fields and meld them together into the images that we see. 

Image Details:
* [conNN03.jpg](https://pixabay.com/illustrations/grid-block-cube-square-design-684983/): Pixabay License
-->

---

![center](res/conNN01.png)

<!--

In the 1980s researchers were inspired by the visual cortex and used these ideas to create convolutional neural networks. 

A convolutional neural network is simply a neural network with additional (or different) types of layers. There are convolutional layers, downsampling layers, and pooling layers. 


Image Details:
* [conNN01.png](https://pixabay.com/illustrations/wallpapper-music-colors-80-s-778185/): Pixabay License
-->

---

![center](res/conNN05.jpg)

<!--
You can stack different numbers of these layers in various orders to achieve different results during training.

Image Details:
* [conNN05.jpg](https://pixabay.com/photos/pancake-crepes-eat-food-crepe-640869/): Pixabay License
-->

---

![center](res/conNN13.png)

<!--
Recall the simplest building block for a typical neural network: the perceptron. 

Image Details:
* [conNN13.png](https://towardsdatascience.com/introducing-deep-learning-and-neural-networks-deep-learning-for-rookies-1-bd68f9cf5883): Unlicensed 
-->

---

# Issues with Multi-Layer Perceptron (plain ANN)

![center](res/conNN15.png)

<!--
If we are dealing with image data, small and often insignificant changes to the training data can yield large and often incorrect changes to the learned parameters in the model. 

For example, consider a problem where you want to identify a cat in an image. If the cat is translated to a different part of the image, then the model will adjust different weights to recognize the cat. But the cat being on the left or right of an image isn't really a defining feature of a cat, right? We'd prefer to recognize things like ears, fur, etc. 

Image Details:
* [conNN15.png](??): Unlicensed 
-->

---

![center](res/conNN14.png)

<!--
In a convolutional neural network, we first feed our data into convolutional, downsampling, and pooling layers. The results are then fed into a fully connected neural network like we have seen before. 

Image Details:
* [conNN14.png](??): Unlicensed 
-->

---

# Convolution 

A way to analyze influence of nearby pixels using a filter

(Filters are also called kernels, masks, convolution matrices)

---

![center](res/conNN16.png)

<!--
Let's look at a simple example. Imagine we have the image on the left. It's just a rectangle with two halves shaded different colors. 

The intensity of each pixel is recorded on the right. This is how we typically work with image data. 

Image Details:
* [conNN16.png](http://www.google.com): Copyright Google
-->

---

![center](res/conNN17.png)

<!--
We'll apply this 3x3 filter to the image. 

It's a filter that adds a blurring effect. 

Image Details:
* [conNN17.png](http://www.google.com): Copyright Google
-->

---

![center](res/conNN18.png)

<!--
We'll apply this 3x3 filter to the image. 

It's a filter that adds a blurring effect. 

Image Details:
* [conNN18.png](http://www.google.com): Copyright Google
-->

---

![center](res/conNN19.png)

<!--
Let's use the 3x3 filter to calculate the new value for this pixel. 

Image Details:
* [conNN19.png](http://www.google.com): Copyright Google
-->

---

![center](res/conNN20.png)

<!--
First we think of centering the filter on the pixel. Then we multiply the values in the filter by the values in the image. And finally, we add up the result. 

As you can see, the new pixel value is slightly lower than 100, but it's higher than 50. So the intensity is getting muted a little. This is because our filter is averaging the intensity of all the pixels around the center point. That is why this filter results in a blurring effect. 

Image Details:
* [conNN20.png](http://www.google.com): Copyright Google
-->

---

![center](res/conNN21.png)

<!--
You may be wondering what happens if we're at the edge. There are different ways to handle this. But it's common to pad the original image with 0's around the edges. That way, those values drop out in the average.  

Image Details:
* [conNN21.png](http://www.google.com): Copyright Google
-->

---

![center](res/conNN22.png)

<!--
Here you can see that we only used the part of the filter that is relevant to the image. 

Image Details:
* [conNN22.png](http://www.google.com): Copyright Google
-->

---

# Line Detectors

![center](res/conNN23.png)

<!--
Here are two very common kernels that can be used to detect lines in an image. 

Overall the goal is to detect sharp changes in intensity. Let's see how this works by doing an example with G_{x}.

Image Details:
* [conNN23.png](http://www.google.com): Copyright Google
-->

---

![center](res/conNN24.png)

<!--
On the left we have an image that is similar to the previous example. There is a line down the center, where the shading changes color. Let's see if the kernel G_{x} can detect this line. 

Calculate the pixel on the right. 

Image Details:
* [conNN24.png](http://www.google.com): Copyright Google
-->

---

![center](res/conNN25.png)

<!--

We get 0. There are no changes in intensity in the 3x3 block that is highlighted in the original image. 

Image Details:
* [conNN25.png](http://www.google.com): Copyright Google
-->

---

![center](res/conNN26.png)

<!--

Now let's move one pixel to the right. 

Image Details:
* [conNN26.png](http://www.google.com): Copyright Google
-->

---

![center](res/conNN27.png)

<!--

We get 200/9. 

Image Details:
* [conNN27.png](http://www.google.com): Copyright Google
-->

---

![center](res/conNN28.png)

<!--

Again move one pixel to the right. 

Image Details:
* [conNN28.png](http://www.google.com): Copyright Google
-->

---

![center](res/conNN29.png)

<!--

We get 300/9.

Image Details:
* [conNN29.png](http://www.google.com): Copyright Google
-->

---

![center](res/conNN30.png)

<!--

Finally, let's move one more pixel to the right. 

Image Details:
* [conNN30.png](http://www.google.com): Copyright Google
-->

---

![center](res/conNN31.png)


<!--

And again we get 0. 

Thus, we see that a vertical line was detected when the intensity changed in the original image. 

Image Details:
* [conNN31.png](http://www.google.com): Copyright Google
-->

---

![center](res/conNN14.png)

<!--
This type of convolution happens in the convolutional layers of a neural network. The values in the kernels are parameters that will be learned during training. Thus, the specific features in the images that the kernels are testing for is something that the model "learns." In other words, you don't say "Hey model, test for vertical lines." Instead, the model identifies the features that are important to test for. 

Image Details:
* [conNN14.png](??): Unlicensed 
-->

---

# Pooling 

1. Pick a window size (usually 2x2 or 3x3)

1. Pick a stride (usually 2)

1. Move your window across each of the filtered images

1. Take maximum value in each window

<!--
Pooling is a type of downsampling that often occurs after convolution. The goal is, without losing much information, to reduce the size of the training data before it goes into the fully connected network.

-->

---

# Hyperparameters

Convolution 
* Number of features
* Size of features 

Pooling
* Window size
* Stride

Fully Connected Layers
* Number of nodes

AND How many of each layer and in what order.

<!--
While a convolutional neural network learns MANY parameters, there are also several hyperparameters that are chosen by the user. Here are the main ones. But as with our previous neural networks, the user can also choose the optimizer, activation function, etc. 

-->

--- 

# Your Turn

<!--
Now it's your turn to build a CNN in the lab. 
-->
