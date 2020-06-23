---

marp: true

---

<style>
img[alt~="center"] {
  display: block;
  margin: 0 auto;
}
</style>

# Images and Videos

<!--
In this unit we will move away from machine learning for a bit and instead talk about images
and videos.

Why images and videos?

Image and video processing is actually very common in machine learning applications. Can you think
of any examples of images or video processing in machine learning?

Some ideas include:

* Facial recognition
* Classification
* Converting video to a textual description (story)
* Analyzing video for suspicious movements
* Disease detection in medical images
* Crop yield estimates based on ariel photos of fields

The list goes on and on. There are many applications of image and video processing in machine learnings.

-->

---

# What is an image?

<!--
Let's think for a second. What is an image actually?

You likely know that an image is a grid of pixels. And each pixel represents a single color point
in the image.
-->

---

# Image Encodings

<!--
Not all pixels are encoded in the same way though. There are actually quite a few different
encodings for images.
-->

---

# Grayscale vs. Color Images

![center](res/color-vs-gray.png)

<!--
One of the first distinctions to be made is if the image is made up pictures on a "gray scale" or if
the image is made from a larger spectrum of colors. In this example you can see that the image on
the right has many colors, including some reds while the image on the right is limited to black,
white, and the grays in between.

What does this mean for the encoding?

Image Details:
* [cars-vs-gray.png](https://pixabay.com/photos/running-shoe-shoe-brooks-371624/): Pixabay License
-->

---

# Grayscale

<!--
We'll start with the simplest format, grayscale. Grayscale images have a single numeric value
representing each pixel in the image.
-->

---

# Resizing an Image

![center](res/imagemaninpy1.png)

<!--
It is common to have input data that consists of images. Just like with tabular data, we still need to perform data cleaning and exploration, and this often involves manipulating the images to ensure they are in a good form for your ML model. For example, we may want to resize the images to a uniform dimension or colorspace.

Our goal in this lecture is to learn how to take a rectangular image that is 960 by 640 pixels and produce a thumbnail that is 200 by 200 pixels. 

Image Details:
* [imagemaninpy1.png](https://pixabay.com/photos/running-shoe-shoe-brooks-371624/): Pixabay License

-->

---

# Python Modules

![center](res/imagemaninpy2.png)

<!--

We’ll use the matplotlib Python library you have already used for creating charts. But in this exercise, we’ll use it to plot an image instead of a chart.

PIL (Python Imaging Library) is a free library for the Python programming language. It adds support for opening, manipulating, and saving many different image file formats. A newer fork of PIL is called Pillow, so don't be confused if you see it called either name.

Image Details:
* [imagemaninpy2.png](http://www.google.com): Copyright Google  
-->

---

# Open and Plot an Image and Its Dimensions

![center](res/imagemaninpy3.png)
<!--

In the first block of code, we open the image using PIL. In this case the image is in the same directory as our Python project, and the name is running-shoe-371624_960_720.jpg. We then plot the image using Matplotlib. 

In the second block of code, we inspect the dimensions of the image. 

Image Details:
* [imagemaninpy3.png](http://www.google.com): Copyright Google  
-->

---

![center](res/imagemaninpy4.png)

<!--
Remember the goal is to end up with a thumbnail image that is square and with dimensions of 200 by 200 pixels.

Questions for students:
* How do we get there?
* If the image is resized from rectangular (960x640) to square (200x200), what happens to the image?

There are a variety of ways to avoid skewing the image when changing the dimensions. One common technique is called padding. Here we will pad the original image in the vertical direction so that it's square in shape. We will then size it down to 200 by 200 pixels. 

Let’s see how to do that in code.

Image Details:
* [imagemaninpy4.png](http://www.google.com): Copyright Google  
-->

---

# Compute Delta Width and Height
![center](res/imagemaninpy5.png)

<!--
How do we figure out how much to pad the image to make it a square?

First, determine the largest dimension (width or height) of the original image.

Then figure out how much padding is needed in the height and width of the image. In this case we need to pad the image’s height to match the image’s width, since the width is larger than the height.

Image Details:
* [imagemaninpy5.png](http://www.google.com): Copyright Google  
-->

---

# Compute Amount of Paddings

![center](res/imagemaninpy6.png)

<!--
But wait! In order to keep the shoes centered on the image, we need to pad the height both at the top as well as at the bottom, thus HALF the required padding will be added to the bottom and the other half to the top of the image.

Image Details:
* [imagemaninpy6.png](http://www.google.com): Copyright Google  
-->

---

# Pad the Image

![center](res/imagemaninpy7.png)

<!--
Now we are ready to do the padding. We use the PIL module again to do the padding by passing in the original image, padding figures in pixels (left, top, right, bottom), and the background color of the padding pixels.

Image Details:
* [imagemaninpy7.png](http://www.google.com): Copyright Google  
-->

---

# Resize the Image

![center](res/imagemaninpy8.png)

<!--
Now we need just to reduce the dimension into a thumbnail size of 200x200 pixels.

Image Details:
* [imagemaninpy8.png](http://www.google.com): Copyright Google  
-->

---

# Resize the Image

![center](res/imagemaninpy9.png)

<!--
Again, we use the PIL module to do so by passing in the desired_size.

Image Details:
* [imagemaninpy9.png](http://www.google.com): Copyright Google  
-->

---

# The Final Image

![center](res/imagemaninpy10.png)

<!--
Here’s the final image.

Image Details:
* [imagemaninpy10.png](http://www.google.com): Copyright Google  
-->

---

# Your Turn

<!--
Let's practice in the lab. 
-->
