
..  Copyright (C)  Google, Runestone Interactive LLC
    This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/4.0/.

.. _PythonReview:

Python Review
=============

and a few new things

Python variables don’t have a type so they can seamlessly change from
being a numerical value, a string, other things:

.. code:: python3

    my_var = 3
    print(type(my_var))
    my_var = "foo"
    print(type(my_var))
    my_var = len  # Even a function!
    print(type(my_var))


.. parsed-literal::

    <class 'int'>
    <class 'str'>
    <class 'builtin_function_or_method'>


Strings can be represented with single or double quotes. Triple quotes
make it easy to define multi-line strings:

.. code:: python3

    my_var = 'foo\nbar'   # \n means newline
    print("1:", my_var)
    my_var = "foo\nbar"
    print("2:", my_var)
    my_var = """foo
    bar"""
    print("3:", my_var)


.. parsed-literal::

    1: foo
    bar
    2: foo
    bar
    3: foo
    bar


Python can convert variable from one type to another:

.. code:: python3

    my_string = str(123)
    my_int = int(my_string)
    almost_pi = float("3.14159")

Remember that you can import useful modules that add functionality to
Python. For example:

.. code:: python3

    import random
    random.randrange(20, 30)




.. parsed-literal::

    26



Re-run the above cell to see that it produces different outputs.

For-loops can be used to iterate numerical values like in other
programming languages with the range function:

.. code:: python3

    for i in range(0, 10):
        print(i)


.. parsed-literal::

    0
    1
    2
    3
    4
    5
    6
    7
    8
    9


But can also be used to visit every item in a list.

.. code:: python3

    for color in ["red", "green", "blue"]:
        print(color)


.. parsed-literal::

    red
    green
    blue


Remember that the contents of the for-loop have to be indented at the
same level to differentiate them from code outside the for-loop:

.. code:: python3

    for i in range(3):
        print("repeated")
        print("also repeated")
    print("not repeated")


.. parsed-literal::

    repeated
    also repeated
    repeated
    also repeated
    repeated
    also repeated
    not repeated


Getting back to lists, they are a basic type in Python and they can
contain a mix of different types:

.. code:: python3

    my_list = ["string", 1, [2.0, 4.5], 5.6]  # Don't do that
    my_list = []                              # An empty list
    my_list = [3, 4, 6, 2, 45, 23, 12, 34]    # That's better

Lists are mutable so you can overwrite arbitrary values:

.. code:: python3

    my_list[2] = 64
    my_list




.. parsed-literal::

    [3, 4, 64, 2, 45, 23, 12, 34]



Remember that indexes start at 0:

.. code:: python3

    my_list[0]




.. parsed-literal::

    3



And you use negative indexes to refer to values starting from the end of
the list.

.. code:: python3

    my_list[-2]




.. parsed-literal::

    12



You can also use slices to rapidly grab portion of the list. For example
to get the first 2 values:

.. code:: python3

    my_list[0:2]




.. parsed-literal::

    [3, 4]



You can also perform a variety of operations on lists:

.. code:: python3

    print(len(my_list))
    print(min(my_list))
    print(max(my_list))
    print(sum(my_list))
    print(my_list * 2)
    my_list.append(146)    # Changes my_list
    other_list = my_list + [1, 2, 3]   # Doesn't change my_list, need to store returned value
    print(other_list)


.. parsed-literal::

    10
    2
    146
    479
    [3, 4, 64, 2, 45, 23, 12, 34, 146, 146, 3, 4, 64, 2, 45, 23, 12, 34, 146, 146]
    [3, 4, 64, 2, 45, 23, 12, 34, 146, 146, 146, 1, 2, 3]


Some of these operations work on strings too:

.. code:: python3

    my_var = "Abc defg hij"
    print(len(my_var))
    print(max(my_var))        # Why would you do that?
    # sum(my_var)      # This doesn't work
    # my_var[1] = 'v'  # Nor this
    print(my_var[2:6])
    print(my_var * 2)


.. parsed-literal::

    12
    j
    c de
    Abc defg hijAbc defg hij


Strings also have special abilities:

.. code:: python3

    print(my_var.lower())
    print(my_var.upper())
    print(my_var.title())
    print(my_var.startswith("Abc"))
    print(my_var.endswith("xyz"))
    list_of_string = my_var.split(" ")
    new_string = "#$#".join(list_of_string)
    print(new_string)


.. parsed-literal::

    abc defg hij
    ABC DEFG HIJ
    Abc Defg Hij
    True
    False
    Abc#$#defg#$#hij


Use double-equals (==) to test for equality:

.. code:: python3

    if sum(my_list) == 333:
        print("It's 333 exactly!")
    else:
        print("It's some other value")


.. parsed-literal::

    It's some other value


But you can test for a lot of different relations:

.. code:: python3

    if my_list[0] > 20 and my_list[1] <= 14 or my_list[2] != 5 and 4 in my_list and 65 not in my_list:
        print("Weird condition")


.. parsed-literal::

    Weird condition


So to add up all the odd numbers in ``my_list``:

.. code:: python3

    total = 0
    for val in my_list:
        if val % 2 == 1:
            total += val
    total




.. parsed-literal::

    71



To read a file, we use the ``open`` function. Using ``with`` avoids
having to remember to close the file.

.. code:: python3

    with open('mydata.txt', 'r') as md:
        for line in md:
            pass # Do something with each line

Dictionaries are another very handy, built-in data type in Python
(they’re hash tables if you’ve use another language that uses that
name). Dictionaries can be created in a variety of ways:

.. code:: python3

    my_dict = {}   # Empty dict
    my_dict = {'foo': 'bar', 'baz': 'bak'}
    # This one is handy if you have a list of pairs to turn into a dictionary:
    my_dict = dict([['foo', 'bar'], ['baz', 'bak']])

``'foo'`` and ``'baz'`` are called keys, ``'bar'`` and ``'bak'`` are
called values. You can access values in the dictionary with its key:

.. code:: python3

    my_dict['foo']




.. parsed-literal::

    'bar'



And you can add new values (or overwrite old ones) by key as well:

.. code:: python3

    my_dict['hello'] = 'world'
    my_dict['hello'] = 'goodbye'

You can iterate over a dictionary using a for-loop:

.. code:: python3

    for key in my_dict:
        print("The key", key, "maps to the value", my_dict[key])


.. parsed-literal::

    The key foo maps to the value bar
    The key baz maps to the value bak
    The key hello maps to the value goodbye


You can define your own functions using the ``def`` keyword and
``return`` to specify the value that is returned by the function.
Remember that the

.. code:: python3

    def double_plus_y(x, y=4):
        return 2 * x + y

    double_plus_y(6)




.. parsed-literal::

    16



But functions don’t have to take parameters (``x`` and ``y`` in the
example above) or return anything:

.. code:: python3

    def say_hi():
        print("Just saying 'hello'.")

    say_hi()


.. parsed-literal::

    Just saying 'hello'.


The map function allows us to call a function on each item in a list:

.. code:: python3

    for value in map(double_plus_y, my_list):
        print(value)


.. parsed-literal::

    10
    12
    132
    8
    94
    50
    28
    72
    296
    296
    296


For simple, one-time-use function, we don’t have to define a function,
we can use lambda to define the operation in-line:

.. code:: python3

    for value in map(lambda x: 2 * x, my_list):  # Don't need a separate function
        print(value)


.. parsed-literal::

    6
    8
    128
    4
    90
    46
    24
    68
    292
    292
    292


Note that lambda functions don’t use the ``return`` keyword, you just
specify the names of the parameters of the function (``x`` in the
example above), a colon, and the operation to perform on the
parameter(s).

You can also use `list
comprehension <https://www.pythonforbeginners.com/basics/list-comprehensions-in-python>`__
to perform an operation on every item in the list. It looks a little bit
like a for-loop inside of a list:

.. code:: python3

    [x*2 for x in my_list]




.. parsed-literal::

    [6, 8, 128, 4, 90, 46, 24, 68, 292, 292, 292]



You can also use it to filter out values from a list. For example to
extract every odd values from the list:

.. code:: python3

    [x for x in my_list if x % 2 == 1]




.. parsed-literal::

    [3, 45, 23]



You can even combine filtering and other operations:

.. code:: python3

    [x**2 for x in my_list if x<10]   # Square every value less than 10




.. parsed-literal::

    [9, 16, 4]



List Comprehension Exercises
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Let’s practice list comprehensions. To do so, we’re going to be using a
list of city and state names. Fun fact: these are all `real
cities <https://en.wikipedia.org/wiki/List_of_the_most_common_U.S._place_names>`__
in the US but with a more famous namesake in a different state.

Use list comprehension to produce a list of only the cities whose name
(including the state name) are less than 12 characters long.

.. code:: python3

    cities = ['washington,ct', 'springfield,or', 'riverside,tx', 'franklin,vt', 'lebanon,co', 'dayton,tx', 'las vegas,nm', 'madison,ca', 'georgetown,ct', 'los angeles,tx']
    short_cities = []
    short_cities




.. parsed-literal::

    ['franklin,vt', 'lebanon,co', 'dayton,tx', 'madison,ca']



Next, create a list of abbreviations that are just the first 3 letters
of each city name:

.. code:: python3

    abbreviations = []
    abbreviations




.. parsed-literal::

    ['was', 'spr', 'riv', 'fra', 'leb', 'day', 'las', 'mad', 'geo', 'los']



Use list comprehension, to create a dictionary that maps city names to
the states that they are located in.

.. code:: python3

    city_dict = []
    city_dict




.. parsed-literal::

    {'washington': 'ct',
     'springfield': 'or',
     'riverside': 'tx',
     'franklin': 'vt',
     'lebanon': 'co',
     'dayton': 'tx',
     'las vegas': 'nm',
     'madison': 'ca',
     'georgetown': 'ct',
     'los angeles': 'tx'}



For a more challenging list comprehension, write a single list
comprehension that produces the
`title-cased <https://en.wikipedia.org/wiki/Letter_case#Title_Case>`__
version of just the city names of the cities in Texas (that means that
the states should not be the resulting list).

.. code:: python3

    texas = []
    texas




.. parsed-literal::

    ['Riverside', 'Dayton', 'Los Angeles']

**Lesson Feedback**

.. poll:: LearningZone_4_1
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_4_1
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_4_1
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_4_1
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...
