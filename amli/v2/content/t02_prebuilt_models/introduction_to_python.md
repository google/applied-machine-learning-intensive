# Introduction to Python

---

# "Python is an interpreted, high-level, general-purpose programming language." {.big}

<!--
Source: Wikipedia
-->

---

INSERT PYTHONIMAGE1

<!--
Interpreted means portability, ease of use (no compiling) and that the code can be run interactively (as illustrated above). 

High-level means closer to human languages and further from machine languages

General-purpose because it can be used for anything from creating web apps (YouTube), to small scripts (automatically renaming photos based on data from the camera) and many, many things in between including a lot of data science

One of the powers of Python is that it has many built-in libraries and many more third-party libraries to give it specialized abilities. We'll explore many of these specialized libraries over the course of this program. 
-->

---

# Python 2 vs. Python 3

Python2:
* deprecated
* support will stop in 2020
* still a lot of code out there

Most visible diff: print vs. print()

INSERT PYTHONIMAGE2

<!--
There are multiple versions of Python in the world. 1.x is long gone. 2.x is deprecated and support will soon stop but there's still a lot of code and code samples out there that use it. 

We'll be focusing on Python3 since that's the modern version and how all new code should be written. 

Here are some ways to tell the difference.

When looking at Python reference docs, look for the version number in the URL.
-->

---

INSERT PYTHONIMAGE3

<!--
When using StackOverflow (or other online resources), look for python-3.x tag and parenthesis around values to be printed.

Besides print, the other differences between python2 and python3 are unlikely to come up in the context of this course. 
-->

---

INSERT PYTHONIMAGE4

<!--
There are multiple ways to run python.
You can open the interactive interpreter and type arbitrary code
You can run a python file and all the code inside will get executed
You can run cell fulls of Python code in a notebook environment like CoLab
If you're in a notebook, you can run all the cells in order (recommended) but you can also choose to run individual cells which might lead to unexpected results. 
-->

---

# White spaces matter

* 2- or 4-space indents are used to delineate blocks instead of {}
* Tabs can be used too but should not be mixed with spaces indent (Recommendation: just use spaces)
* Indents can be nested to arbitrary depths

INSERT PYTHONIMAGE5

<!--
In practice, the indents makes it hard to have long functions with many levels of nesting. That's actually a good thing, use decomposition (breaking code into smaller functions) instead. 
-->

---

# Variables are dynamically typed

* This applies to function parameters too
* Interpreter will not help you catch mistyped variables
* It's only when you try to do an operation for another type that the error will manifest itself
* Avoid changing the type of a variable
* This almost means that lists can contain objects of different types. Avoid doing that.

INSERT PYTHONIMAGE6

---

# String delimiters are ', ", ''', and """

* Makes it easy to make strings that contains quotes
* Avoid triple-single quotes
* There is no char type
* When you want to deal with characters, just use single-character strings
* Strings are immutable

INSERT PYTHONIMAGE7

---

# Retire the semicolon

Commands end at the line break unless in the middle of a parenthesis, a triple-quoted string or an object definition.

INSERT PYTHONIMAGE8

---

# For-loops always loop over iterables (lists, etc.)

* Great for linearly processing lists
* Looping over numbers requires creating a list of numbers. The function range makes that pretty easy.
* You can create elaborate numbering schemes with range. 

INSERT PYTHONIMAGE8

---

# Python fast facts

* There is no NULL, it's None
* else if must be shortened to elif
* Don't forget the colon at the end of your for-loops, while-loops, if-statements and function definitions
* help(some_object) to get the man page
* dir(some_object) to see its content (including methods)
* len to get the length of many objects (strings, lists, dictionaries, …) but it's a function, not a method

INSERT PYTHONIMAGE9

---

INSERT PYTHONKEYBOARDIMAGE

<!--
Enough talking, let's get to doing!
-->

---

# Device library: Laptop

[Full device library](https://standards.google/downloads/)
