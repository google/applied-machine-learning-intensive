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

-![](res/notebook.png) 

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

Source: Google Copyright

-->

---

# What is Colab?

* Colab is short for Google Colaboratory
* Free in-the-browser programming environment
* Requires no setup, runs entirely on the Cloud
* Like a Jupyter notebook that is stored in Google Drive
* Available at https://colab.research.google.com

<!--

Notebooks run by connecting to virtual machines that have maximum lifetimes that can be as much as 12 hours. Notebooks will also disconnect from VMs when left idle for too long. Maximum VM lifetime and idle timeout behavior may vary over time, or based on your usage. 

Colab focuses on supporting Python and its ecosystem of third-party tools. There is currently not support for other Jupyter kernels like R or Scala.

More documentation on Colab can be found at https://research.google.com/colaboratory/faq.html 

A good introductory notebook can be found here https://colab.sandbox.google.com/notebooks/intro.ipynb#scrollTo=GJBs_flRovLc

-->

---

# Cells in a Colab Notebook 

A notebook of movable cells which are either code or text cell

![](res/notebook_cells.png) 

<!--

Hovering above or below a current cell will bring up the option to add a new code or text cell. 

You can run code cells and typeset text cells using Shift+Enter.

Source: Google Copyright

-->

---

# Code Cells: Python
Write all code in Python 3. 

<!--

As of January 1, 2020, the Python team is no longer supporting Python 2, and as of that date, Colab has stopped supporting Python 2 runtimes. 

-->

---

# Code Cells: Python Print

![](res/python_print.png) 

<!--

Source: Google Copyright

-->

---

# Code Cells: Order of Cells vs. Order of Running Cells

* Variables that you define in one cell can later be used in other cells
* It DOES NOT matter what order the cells appear in
* It DOES matter the order in which cells are run

<!--

It doesn't matter what order the cells appear in. What matters is the order in which they are run. The run-order is captured by the numebrs to the left of each cell. 

-->

---

# Text Cells

* Text cell contain explanatory text and images
* Text cells are formatted using using a simple markup language called [markdown](https://colab.sandbox.google.com/notebooks/markdown_guide.ipynb)

-![](res/text_cells.png) #TODO

<!--

-->

---

# Markdown: Bold & Italic & Strikethrough

\*\*bold\*\* = **bold**
\_\_bold\_\_ = __bold__

\*italic\* = *italic*
\_italic\_ = _italic_

\~\~strikethrough\~\~ = ~~strikethrough~~

<!--

You can easily format text with specific markdown syntax.

-->

---

#Markdown: Lists

Ordered List
```
1. Item 1
1. Item 2
```

Unordered List
```
* Item
* Item
```

<!--

You can create numbered and bulleted lists. 

-->

---

#Markdown: Embedded Lists

```
* Item
  1. Item 1
  1. Item 2
* Item
  1. Item 1
  1. Item 2
```

<!--

You can also create sublists. 

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
