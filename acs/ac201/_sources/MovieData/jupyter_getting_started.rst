
..  Copyright (C)  Google, Runestone Interactive LLC
    This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/4.0/.


Jupyter notebooks
=================

The files you will be working with are called a Jupyter notebooks, this comes from the idea of a lab notebook, where you combine figures, data that you have gathered, and explanations about how the data fits the theory. In our case a notebook can be used to write and run programs and to edit accompanying text. This makes it convenient as a way to deliver some of this course content but you can also use it to create a report that contains coding (and its output including graphs).

Text cells
----------

In a notebook, each rectangle containing text or code is called a
*cell*.

Text cells (like the one shown in Figure 1) can be edited by double-clicking on them.
They’re written in a format called
`Markdown <http://daringfireball.net/projects/markdown/syntax>`__ to add
formatting and section headings. You don’t need to learn Markdown, but
you might pick up some aspects of the language from looking at the
content that we provide.

After you edit a text cell, click the “run cell” button at the top that
looks like ▶ or hold down ``shift`` + ``return`` to confirm any changes.

Practice editing a text cell by making any part of the text this cell
that you choose bold. Bold is created in Markdown by surrounding the
word or phrase you want bolded with double underscores.

You can also double click on any text cell that is given to you to see
how the authors of the notebook created various bits of styling like
*italics* or inline images like this one that explains the various parts
of Jupyter:

.. figure:: Figures/anatomy_of_jupyter_notebook.png
   :alt: anatomy of JupyterLab

   Figure 1:  Anatomy of JupyterLab Notebook

Code cells
----------

Alternatively, cells can contain Python 3 code. Clicking “run cell” for
code cell will execute the content of the cell and print out the output
of the code snippet right below the code cell. Try running this cell:

.. code:: python3

    3+5*4%43

This doesn’t work just for arithmetic operations but any Python code
that you might write:

.. code:: python3

    import math

    circle_areas = []
    for i in range(1, 5):
        circle_areas.append(math.pi * i * i)
    circle_areas

Notice that if a cell ends with a value by itself on a line, the
resulting value gets printed in the output. This doesn’t work if the
cell ends with an assignment of a value to a variable:

.. code:: python3

    a = 5

Note that no output is produced when you run the previous cell. However,
the value of a is saved and is available in other cells:

.. code:: python3

    a * a

.. parsed-literal::

    25

This is useful because it means that we can put ``import`` statements
and the time-consuming reading of large data sources in one cell
(usually) at the start of the notebook and experiment with manipulations
of that data in later cells without having the wait to reload the data.

The caveat to this is that each cell is executed when you run it so you
could accidentally or willfully run cells out of order. For example:

.. code:: python3

    # Run this cell once
    my_list = ["red", "green", "blue"]

.. code:: python3

    # Run this cell twice
    my_list.append("purple")

.. code:: python3

    # Run this cell once
    print(my_list)

Notice that ``my_list`` contains ‘purple’ twice even the code above only
adds it once. In general, you should write your code assuming that each
cell is run once from top to bottom. There’s even a menu to help you do
that. The “Run” menu has “Run All Above Selected Cell” and “Run all
cells” functions that allow you to get your notebook in a predictable
state if you ever get confused by having run cells multiple times or out
of order.

