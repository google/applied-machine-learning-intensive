---
marp: true
---

<style>
img[alt~="center"] {
  display: block;
  margin: 0 auto;
}
</style>

# Teaching & Learning Neural Networks

<!--
So far we have used classic machine learning models. These models are powerful and have proven useful for a wide range of applications.

It is likely that you have heard about neural networks and deep learning. These concepts are in vogue right now. Depending on your perspective, deep learning and neural networks are either going to be a giant leap forward for humanity, are going to destory us all, or are over-hyped tools with limited application.

There is likely a litte truth to each of these opinions.
-->

---

# Neural Networks: Good?

![center](res/car.jpg)

<!--
Deep learning is a giant leap forward for humanity. We can now program machines to excel at tasks that we once thought only humans could master. Computers can drive cars, interpret medical imaging, create art, and play complex games at a human-expert level or better.

Image Details:
* [car.jpg](https://pixabay.com/photos/vehicle-autonomous-4759347/): Pixabay License
-->

---

# Neural Networks: Bad?

![center](res/terminator.jpg)

<!--
There is also the fear that deep learning will have huge negative impacts on society. The images of a terminator are likely overblown, but there is real concern that advanced deep learning algorithms will have negative effects on some people.

Distruptive technologies like self-driving cars will displace millions of workers.

Societal bias (concious or not) can become encoded in deep learning algorithms, multiplying and normalizing the negative effects that have existed for decades. 

Great care must be taken when using deep learning to remove bias and to understand the implcations of mass application of the algorithms.

Image Details:
* [terminator.jpg](https://pixabay.com/illustrations/bot-cyborg-robot-helper-arm-chair-4875211/: Pixabay License
-->

---

# Neural Networks: Hype?

![center](res/hype.jpg)

<!--
And finally, there are those that think that deep learning and neural networks are just hype. For every person that thinks a technological reveloution is around the corner, there is another pointing out how specialized and controlled the environment has to be for machine learning algorithms to perform well.

Deep learning doesn't progress at an even pace. We are currently in a deep learning boom, but this has happened before. There have been two "AI Winters" where researchers thought that we were on the cusp of a reveloution only to have research in neural networks go dormant for a while.

We'd like to think that this time might be different. Computation is finally fast enough and has enought scale that algorithms designed decades ago can finally be impelmented and trained in an effective manner.

Only time will tell if deep learning can live up to expectations. What we can do now is learn about it, be thoughful about how we train and use it, and continue to innovate cautiously.

Image Details:
* [hype.jpg](https://unsplash.com/photos/NrtC3y108Ys): Unsplash License
-->

---

# High Level

![center](res/teacher.png)

<!--

Image Details:
[teacher.png](http://www.google.com): Unlicensed
-->

---

# Math Nonsense

![center](res/math_nonsense.png)

<!--

Image Details:
[math_nonsense.png](http://www.google.com): Unlicensed
--->

---

# We'll try for some middle ground...

<!--

-->


---

# We'll try for some middle ground...

## (but I make no promises)

---

# History & Motivation

<!--

-->

---

# Neural Networks: Inspired by Nature

![center](res/nature.png)

<!--
We've talked about what people think neural networks can and cannot do, but we really haven't talked about what neural networks are. And why are they even called neural networks?

Nature can be a source of inspiration. Birds inspired man to fly. The burdock plant was the inspiration for velcro. Even in the computer science realm we hear references to trees, forests, and other things that occur in nature.

Image Details:
* [nature.png](https://pixabay.com/photos/burdock-thistle-prickly-stick-barb-745306/): Pixabay License
* [nature.png](https://pixabay.com/photos/nike-baby-shoes-shoe-baby-velcro-1201595/): Pixabay License
* [nature.png](https://pixabay.com/photos/bird-seagull-flying-wings-gull-3158784/): Pixabay License
* [nature.png](https://pixabay.com/photos/plane-aircraft-take-off-sky-50893/): Pixabay License
-->

---

# Neural Networks: Inspired by Nature

![center](res/neurons.jpg)

<!--
Similar to the examples in the last slide, neural networks are inspired by nature. The brain contains a massive network of neurons that send electrical signals that activate other neurons. Through this network we are able to think.

Neural networks were inspired by the brain, hence the name.

Image Details
* [neurons.jpg](https://pixabay.com/illustrations/neurons-brain-cells-brain-structure-1773922/)
-->

---

# Neural Networks: Inspired by Nature

![center](res/neuron.png)

<!--
This is the building block of the brain: a neuron.

A neuron is just a cell with a nucleus and cell body like any other cell. One of the distinguishing features of the neuron is the 'axon', which is the long tail of the neuron. The tip of the axon has synaptic terminals that attach to other neuron bodies. A neuron body receives signals from the synapse of neurons before it. When those signals reach a critical point within a fixed period of time, the receiving neuron fires, sending a signal to later neurons.

Image Details:
* [neuron.png](https://pixabay.com/vectors/neuron-nerve-cell-axon-dendrite-296581/): Pixabay License
-->

---

# Neural Networks: Inspired by Nature
![center](res/neurons.jpg)

<!--
This builds a web of neurons called a "neural network"

This simplification of the brain signaling pathway lead to research into "artificial neural networks" with different types of neurons.

Beyond this network effect, the concept of neural networks tends to break away from biology. Similarly, birds inspired flight, but modern airplanes don't flap their wings.

We find inspiration in nature. We don't have to copy it.

Image Details
* [neurons.jpg](https://pixabay.com/illustrations/neurons-brain-cells-brain-structure-1773922/)
-->

---

# Neural Networks: Cutting Edge

![center](res/einstein.jpg)

<!--
When did neural networks originate? The 1940s.

1940s! I thought neural networks were cutting edge?

Many of the fundamental algorithms that we use today are rooted in thought experiments from the 1940s, but it has been a long journey from then until where we are today.

Computing power and data storage that we have today is nearly unimaginable compared to what was available, even in the recent past. Also, many of the early ideas were foundational, but have been improved upon over time.

The idea of deep learning is not new. There were even a few "AI winters" over the last 80 years that stalled development and research in deep learning. It feels like we might finally be at a point where the theoretical ideas of the past can be fulfilled with the technologies of today.

Image Details:
* [einstein.png](https://pixabay.com/photos/albert-einstein-scientists-physicist-62931/)
-->

---

# Artificial Neural Networks (ANN)

<!--
Today we will talk about artificial neural networks. These are computational networks inspired by biological systems.

ANN is a big umbrella. There are "feed-forward" networks. There is a concept of "backpropagation". And there are specific types of networks such as convolutional neural networks (CNN) and recurrent neural networks (RNN) that we will look at in more detail.
-->

---

# Artificial Neural Networks (ANN)

![center](res/ann.png)

<!--

Image Details:
* [ann.png](http://www.google.com): Unlicensed

-->

---

# Neurons
![center](res/neurnet06.png)

<!--
Let's first take a look at a naive neuron. This type of neuron receives signals and makes a decision. There are pass-through/identity neurons, "And" neurons. "Or" neurons. And "Not" neurons.

These neurons are the building blocks from the 40s. They can build a computational system of signals that can be used to make decisions.

Image Details:
* [neurnet06.png](http://www.oreilly.com): Unliscensed
-->

---

# Perceptrons

![center](res/neurnet07.png)

<!--
The simple on/off model can be effective, but in practice there is a better type of neuron for many applications: the perceptron

The perceptron (circa 1957) is a different type of neuron layer. It is composed of TLUs. Each TLU is a neuron which inputs weighted values and has a step function that only fires if the weights are over some threshold.

These are built on TLUs (Threshold Logic Units).

Image Details:
* [neurnet07.png](http://www.oreilly.com): Unliscensed
-->

---

# Perceptrons

![center](res/neurnet08.png)

<!--
This perceptron has two inputs (plus a bias) and three TLUs.

The perceptron is trained by reinforcing connections that fire together and produce a correct output.

Image Details:
* [neurnet08.png](http://www.oreilly.com): Unliscensed
-->

---

# Multilayer Perceptron

![center](res/neurnet09.png)

<!--
Multilayer perceptron. This is used to get more advanced calculations, such as XOR, but also obfuscates the decision making rationale of the algorithm. 

Image Details:
* [neurnet09.png](http://www.oreilly.com): Unliscensed
-->

---

# Perceptron

![center](res/perceptron.png)

<!--
1958 - Frank Rosenblatt - An American psychologist attempted to build a machine called a perceptron. 

Image Details:
* [perceptron.png](https://towardsdatascience.com/introducing-deep-learning-and-neural-networks-deep-learning-for-rookies-1-bd68f9cf5883): Unlicensed
-->

---

# Perceptron

![center](res/perceptron2.png)

<!--
1958 - Frank Rosenblatt - An American psychologist attempted to build a machine called a perceptron. 

Image Details:
* [perceptron2.png](https://towardsdatascience.com/introducing-deep-learning-and-neural-networks-deep-learning-for-rookies-1-bd68f9cf5883): Unlicensed
-->

---

# Perceptron Example

![center](res/perceptron_example.png)

<!--

Image Details:
* [perceptron_example.png](http://www.google.com): Copyright Google
-->

---

# Machine Learning Process

1. Infer/Predict/Forecast
1. Calculate Error/Loss/Cost
1. Train/Learn
1. Iterate (until some stopping condition)

<!--

-->

---

# Perceptron Example

![center](res/perceptron_example_01.png)

<!--
Image Details:
* [perceptron_example_01.png](http://www.google.com): Copyright Google
-->

---

# Perceptron Example

![center](res/perceptron_example_02.png)

<!--
Image Details:
* [perceptron_example_02.png](http://www.google.com): Copyright Google
-->

---

# Perceptron Example

![center](res/perceptron_example_03.png)

<!--
Image Details:
* [perceptron_example_03.png](http://www.google.com): Copyright Google
-->

---

# Perceptron Example

![center](res/perceptron_example_04.png)

<!--
Image Details:
* [perceptron_example_04.png](http://www.google.com): Copyright Google
-->

---

# Perceptron Example

![center](res/perceptron_example_05.png)

<!--
Image Details:
* [perceptron_example_05.png](http://www.google.com): Copyright Google
-->

---

# Perceptron Example

![center](res/perceptron_example_06.png)

<!--
Image Details:
* [perceptron_example_06.png](http://www.google.com): Copyright Google
-->

---

# Perceptron Example

![center](res/perceptron_example_07.png)

<!--
Image Details:
* [perceptron_example_07.png](http://www.google.com): Copyright Google
-->

---

# Perceptron Example

![center](res/perceptron_example_08.png)

<!--
Image Details:
* [perceptron_example_08.png](http://www.google.com): Copyright Google
-->

---

# Perceptron Example

![center](res/perceptron_example_09.png)

<!--
Image Details:
* [perceptron_example_09.png](http://www.google.com): Copyright Google
-->

---

# Perceptron Example

![center](res/perceptron_example_10.png)

<!--
Image Details:
* [perceptron_example_10.png](http://www.google.com): Copyright Google
-->

---

# Perceptrons

![center](res/perceptrons.png)

<!--
1958 - Frank Rosenblatt - An American psychologist attempted to build a machine called a perceptron. 

Image Details:
* [perceptrons.png](https://towardsdatascience.com/introducing-deep-learning-and-neural-networks-deep-learning-for-rookies-1-bd68f9cf5883): Unlicensed

-->

---

# Networks With Hidden Layers

![center](res/hidden_layers.png)

<!--
Image Details:
* [hidden_layers.png](http://www.google.com): Unlicensed
-->

---

# Networks With Hidden Layers

![center](res/hidden_layers_h11.png)

<!--
Image Details:
* [hidden_layers.png](http://www.google.com): Unlicensed
-->

---

# Networks With Hidden Layers

![center](res/hidden_layers_h12.png)

<!--
Image Details:
* [hidden_layers.png](http://www.google.com): Unlicensed
-->

---

# Let’s go through some of this on the board...

<!--

-->

---

# Summary

1. Infer/Predict/Forecast
    * Compute f(X, W, B) - compositions of f and lots of matrix mult
1. Calculate Error/Loss/Cost
    * MSE, MAE, etc.
1. Train/Learn
    * Change W and B in direction to minimize cost
    * Gradient descent -> derivative -> chain rule -> backpropagation
1. Iterate (until some stopping condidtion)

<!--

-->

---

# Issues with this plan? 

```
f(x) =  1 if x ≥ 0
        0 if x < 0
````

The step function, f, is not the greatest activation function.
* `f` is not differentiable at 0
* `f’(x) = 0` for all x other than 0
* `f` only returns 0 or 1 (as opposed to a confidence) 

<!--

-->

---

# Sigmoid

![center](res/sigmoid.png)

<!--
Image Details:
* [sigmoid.png](http://www.gogole.com): Unlicensed
-->

---

# Backpropogation

<!--
Let’s make this even shorter: for each training instance the backpropagation algorithm first makes a prediction (forward pass), measures the error, then goes through each layer in reverse to measure the error contribution from each connection (reverse pass), and finally slightly tweaks the connection weights to reduce the error (Gradient Descent step).
-->

---

# Activation Functions
![center](res/neurnet10.png)

<!--
The choice of activation function is important. RELU makes differentiation difficult, but actually works in practice. The other functions are also very useful.

Image Details:
* [neurnet10.png](http://www.oreilly.com): Unliscensed
-->

---

# Activation Functions: Softmax

![center](res/neurnet11.png)

<!--
Softmax is often used at the end of a neural network in classification functions. It can pick the most probable output neuron.

Image Details:
* [neurnet11.png](http://www.oreilly.com): Unliscensed
-->