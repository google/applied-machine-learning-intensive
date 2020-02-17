# Introduction to Colab

![](https://colab.research.google.com/img/colab_favicon_256px.png)

<!--

We have talked about machine learning and data science in the abstract. Now it
is time to actually start applying our skills. To do this, we will need some
sort of development environment. There are a plethora of options in this space.

Source: Google Copyright

-->

---

# Traditional Development Environments

![](res/ide.png)

<!--

Many data scientists choose to use a traditional development environment for
their work. These editors range in complexity from a text editor like Notepad on
Windows through large integrated development environments such PyCharm.

With these environments it is often necessary to install extra software to
support your data science work.

You will likely find that data scientists with a background in traditional
programming are comfortable in these environments since they have likely already
had experience with them.

These development environments are also useful for developing code supported by
unit tests and code that will be packaged and deployed on server systems.

Source: Google Copyright

-->

---

# Notebooks

-![](res/notebook.png) #TODO
-
 <!--
 
Notebooks are another option that you will see regularly, and they are the
primary coding environment for this course.

When someone mentions a data science notebook, they are typically
referring to a Jupyter Notebook.

Jupyter Notebooks combine code, output, and supporting documentation in a single
structured document. The document can be executed, modified, and iterated on.

Though you'll see many Jupyter notebooks that contain Python code, they aren't
limited to Python. Jupyter supports many different 'kernels' which allow users a
wide variety of choice in what languages and libraries they use. In this course, 
we will use Python. 

Source: Google Copyright

-->

# Other Options

![](https://i.imgur.com/OvMZBs9.jpg) #TODO: find or create an image

<!--

The choice of development environments isn't a binary choice between notebooks
and traditional development environments. There is a wide spectrum of tools
available, some that blur the lines between traditional environments and
notebooks.

MATLAB is one of these tools. It can very much be used as a traditional
development environment where you write code and then deploy that code. However,
it also supports a notebook mode which has a much more Jupyter-like feel.

It is important to be aware that not all data scientists develop in the same
type of environment. Personal preference, costs, corporate standards, and more
go into the decision for someone to choose a specific environment.

The environment might even change over the course of a project. A data scientist
might explore and build a small model using a notebook. Later, once the model
is designed, they might then switch over to a more traditional environment to
create a deployable package.

Source Google Copyright

-->

---

# What is Colab?

* Colab is short for Google Colaboratory
* Free in-the-browser programming environment
* Requires no setup, runs entirely on the Cloud
* Like Jupyter notebook that is stored in Google Drive
* Available at https://colab.research.google.com

<!--

Colab will run your code on a virtual machine. 

More documentation on Colab can be found at https://research.google.com/colaboratory/faq.html 


-->

---

# Colab Notebook

* Consists of movable cells which are either code or text cell
* Code cell contains your code and is executable to produce an output
* Code cell executions are performed by connecting to a cloud-based runtime
* Text cell contain explanatory text and images
* Text cells are formatted using using a simple markup language called [markdown](https://colab.sandbox.google.com/notebooks/markdown_guide.ipynb)

<!--
The first time you execute a Colab’s code cell, Colab will connect to one of the available cloud-based runtimes.  Typically the runtime, support execution of Python code.  Other configuration of runtime allows the execution of TensorFlow projects, or access to GPU/TPU.
-->

---

# Markdown: Bold

\*\*bold\*\* = **bold**
\_\_bold\_\_ = __bold__

<!--

TODO: Notes?

-->

---

# Markdown: Italic

\*bold\* = *italic*
\_bold\_ = _italic_

<!--

TODO: Notes?

-->

---

# Markdown: Strikethrough

\~\~strikethrough\~\~ = ~~strikethrough~~

<!--

TODO: Notes?

-->

---

#Markdown: Ordered Lists

```
1. Item 1
1. Item 2
```

<!--

TODO: Notes?

-->

---

#Markdown: Unrdered Lists

```
* Item
* Item
```

<!--

TODO: Notes?

-->

---

#Markdown: Embedded Lists

```
* Item
  1. Item 1
  1. Item 2
*. Item
  1. Item 1
  1. Item 2
```

<!--

TODO: Notes?

-->

---

#Markdown: Links

```
[Text](http://...)
```

<!--

TODO: Notes?

-->

---

#Markdown: Tables

```
Language | Creator(s)
--- | ---
Python | Guido van Rossum
R | Ross Ihaka, Robert Gentleman
Java | James Gosling
```

<!--

TODO: Notes?

-->

---

#Markdown: LaTeX

```
$\sqrt{3x-1}+(1+x)^2$
```

<!--

TODO: Notes?

-->

---

# Code Cells
Contains code executed in an IPython environment

<!---

TODO: Notes?

--->

---

# Code Cells: Shell
Add a `!` to run shell commands

<!---

TODO: Notes?

--->

---

# Code Cells: Magics
Add a `%` to trigger magics which will change the way a code cell acts or interprets outputs

<!---

TODO: Notes?

--->


---

# Code Cells: Line Magics

```
import numpy as np

%timeit np.linalg.eigvals(np.random.rand(100,100))
```

<!---

TODO: Notes?

--->

---

# Code Cells: Cell Magics

```
%%html
<marquee style='width: 30%; color: blue;'><b>Whee!</b></marquee>
```

<!---

TODO: Notes?

--->

---

# Runtimes

<!--

Runtimes used in this lab are virtual machines running on Google Cloud that run notebook code cells
through IPython. You can use different runtimes though, including those that support other
languages like R. The default runtime for Colab has specific modules and features enabled. If you
need other modules you can install them in an active runtime. You can also use your own custom
runtime.

-->

---

# Notebook Sharing

* Sharing a Colab notebook is as easy as sharing a Google Doc
* Can export the notebook to Github or download the file
* Downloaded file is compatible for use with Jupyter Notebook or compatible environments
* Use [Seedbank](https://research.google.com/seedbank/) to find shared Colab notebook 
* Limited collaborative editing works (use with caution!)

<!--
Since a Colab notebook is stored in Google Drive, sharing a Colab notebook is as easy as sharing Google Doc.  Just like Google Doc sharing, you decide on the share permissions, eg: view-only or edit privilege.

If you prefer, you can export the notebook to Github repository or download the notebook as a file.  The downloaded file is written in standard Jupyter notebook format and can be use in Jupyter Notebook or other compatible framework

Seedbank is an example of search engine for Colab notebooks for material for exploration and learning of ML.

Seedbank FAQ
-->

---
