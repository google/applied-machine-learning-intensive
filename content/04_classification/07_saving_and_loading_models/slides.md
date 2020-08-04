---

marp: true

---

<style>
img[alt~="center"] {
  display: block;
  margin: 0 auto;
}
</style>

# Saving and Loading Models

<!--
So far in this course, we have built models and used them immediately. In practice, you'll find that you need to save your models and load them for use later. You'll also find models published online that you can load and start using immediately or use as a warm start for training your own model.
-->

---

# Pickling scikit-learn Models

```python
import pickle

model_file = 'my_model.pkl'

with open(model_file, 'wb') as output:
    pickle.dump(model, output, pickle.HIGHEST_PROTOCOL)
```

```python
with open(model_file, 'rb') as input:
    model_restored = pickle.load(input)

model_restored.predict([[45, 34, 2]])
```

<!--
For models created using scikit-learn, we can use standard Python pickling to persist and reload the model.
-->

---

# Saving and Loading Keras Models

```python
import tensorflow as tf

tf.keras.models.save_model(
    model, 'my_model.tf'
)
```

```python
loaded_model = tf.keras.models.load_model(
    'my_model.tf'
)
```
 
<!--
Keras-based models can be saved and loaded using the `save_model` and `load_model` functions. By default the models are in a TensorFlow-specific format. However, the models can be saved as H5, which is another popular file format for storing models.
-->

---

# Loading Frozen Graphs: Loading

```python
import tensorflow as tf

frozen_graph = os.path.join(dir_name, 'frozen_inference_graph.pb')

with tf.io.gfile.GFile(frozen_graph, "rb") as f:
    graph_def = tf.compat.v1.GraphDef()
    loaded = graph_def.ParseFromString(f.read())
```

<!--
There is also the concept of freezing graphs. Some models, such as the one we're going to use in this lab and in our next project, are distributed in this manner.

In order to "unfreeze" a graph, you must first load the graph into a `GraphDef` object. Notice that this is a TensorFlow version 1 compatibility layer object. This process is useful for loading models built in TensorFlow version 1.
-->

---

# Loading Frozen Graphs: Wrapping

```python
def wrap_graph(graph_def, inputs, outputs, print_graph=False):
    wrapped = tf.compat.v1.wrap_function(
        lambda: tf.compat.v1.import_graph_def(graph_def, name=""), [])

    return wrapped.prune(
        tf.nest.map_structure(wrapped.graph.as_graph_element, inputs),
        tf.nest.map_structure(wrapped.graph.as_graph_element, outputs))
    
model = wrap_graph(graph_def=graph_def,
                   inputs=["image_tensor:0"],
                   outputs=outputs)
```

<!--
The programming models of TensorFlow 1 and 2 are quite a bit different. TensorFlow 1 used lazy execution while TensorFlow 2 uses eager execution.

In order to bridge the gap in these execution models, we need to wrap our TensorFlow version 1 graph.
-->

---

# Loading Frozen Graphs: Using

```python
predictions = model(tensor)
```

<!--
And now we can use the model as a function. We pass it in tensor objects and get predictions back.
-->

---

# Your Turn

<!--
Now it's your turn to practice saving and loading models.
-->
