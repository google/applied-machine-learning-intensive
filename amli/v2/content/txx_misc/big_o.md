# Big-O

<!--
Exercises handout (gdoc): https://docs.google.com/document/d/1s5XGYWdHlRRM0mi5ZEb80FsncQW6sjlu-yJGoEqa-ps/edit
Exercises handout (pdf): https://drive.google.com/file/d/10hiIWcdrwy3Nk7rLnrSfvi3-xZgk2L6R/view 
Solutions: https://colab.research.google.com/drive/1r2xOKjinPi31A7iAjZVtLLKymKLopOOO
-->

---

# List Operations

Given the following list:

![](res/bigO01.png)

How many steps does it take to insert the integer 100 in the 9th position? 

How many steps does it take to check if 63 is in the list?

<!--
Clarify that this is a list with 12 unknown items. (not empty! We just don’t know what’s in each position)

1.
Lst[8] = 100   → 1 step
If we had a larger list, would the number of steps change?
No, so we call that constant time.

2. 
for item in lst:	       → worst case: item not found. Takes 12 steps, where 12 is the size of the list
	if item == 63:
		print(“Found!”)  

If we had a larger list, would the number of steps change?
Yes! The bigger the list, the more steps. We call it linear.

Does that change if the list is sorted?

Search in an unordered list is always at least linear. 

If the list is ordered, how can we do better?
Go over binary search example on the board, and calculate how long it takes to search in the worst case (item not found). 
-->

---

# Infinite loop vs. very slow algorithm

![](res/bigO02.png)

<!--
(Use whiteboard)

Consider the code:

i = 0
while i < len(lst):
	if item == 63:
		print(“Found!”)  

What’s the problem?
Infinite loop. It’ll never stop executing…

Sometimes when we’re training a model we seriously start wondering if that’s the case…
How do we know whether it is?
Print statements / debugging messages help us track what’s going on and if any progress is being made, and whether it’s fallen in an infinite loop.
That also allows us to estimate how much time there’s left… (give example)

This process of estimating how much time it’ll take for a piece of code to execute in the worst case is the basis of the concept of Big-O.
-->

---

# Why should I care?

Example: write a function to find all duplicates in a list

![](res/bigO03.jpg)

<!--
What happens when you ask your computer to try out every possible combination of features?
That’s something we’ll come across a lot when working with big data. 
Give examples from class (eg, using apply vs nested for loop with iloc for example)

When we write code, we need to be able to tell how much time that code is likely to take to execute based on the size of the input. Similarly, we need to know whether we have enough space in memory. Otherwise, how would you be able to tell whether you can run a given dataset through a model on a given computer? Just trying it out and risking running out of memory is not a good idea! And imagine if you leave your laptop running all day and then you need to close it to go home… will you just lose all of your progress?
In industry, you will work with problems like this at a much bigger scale. So it’s important to have the language and conceptual understanding of these limitations to be able to work efficiently.

Source: Photo by Stas Svechnikov on Unsplash
-->

---

# Big-O

![](res/bigO04.png)

<!--
Big O is a way to talk about this, to express runtime and space usage.
-->

---

# Example: increment all values within a column by 1 

![](res/bigO05.png)

<!--
loc: only work on index
iloc: work on position
ix: You can get data from dataframe without it being in the index
at: get scalar values. It's a very fast loc
iat: Get scalar values. It's a very fast iloc
-->

---

# Time vs. Space

Given a messy address book, write a function to find phone numbers when searching by name.

Note: the names are not sorted.

<!--
time complexity vs space complexity

Alternatives: https://repl.it/repls/SmartSelfreliantMysql
# Option 1: Linear search O(n)
def get_phone(name, address_book):
 for person in address_book:
   if person.name == name:
     return person.number
 return "Not found"

# Option 2: Sort and binary search O(n log n)
# def get_phone(name, address_book):
#   sorted_book = sorted(address_book)
#   return bin_search(sorted_book, name)

# def bin_search(lst, name):
#   if not lst or (len(lst) == 1 and lst[0] != name):
#     return "Not found"
#   middle = len(lst)//2
#   if name < lst[middle].name:
#     return bin_search(lst[:middle], name)
#   elif name > lst[middle].name:
#     return bin_search(lst[middle:], name)
#   return lst[middle].number


# Option 3: Hash Table O(n)
# optimal_book = {}
# def get_phone(name, address_book):
#   if not optimal_book:
#     for person in address_book:
#       optimal_book[person.name] = person.number
#   return optimal_book.get(name, "Not found")

# Tests
print(get_phone('Jordan Allen', my_address_book))
print(get_phone('Ju de Heer', my_address_book))


# Test code
class Person:
 def __init__(self, name, number):
   self.name = name
   self.number = number
  def __eq__(self, other):
   """Overrides the default implementation"""
   if isinstance(other, Person):
       return self.name == other.name
   return NotImplemented

 def __lt__(self, other):
   """Overrides the default implementation"""
   if isinstance(other, Person):
       return self.name < other.name
   return NotImplemented

 def __gt__(self, other):
   """Overrides the default implementation"""
   if isinstance(other, Person):
       return self.name > other.name
   return NotImplemented
  def __str__(self):
   return "{} {}".format(self.name, self.number)


my_address_book = [
 Person('Jordan Allen', '415-232-9004'),
 Person('Becky Ohio', '510-346-3473'),
 Person('Austin Power', '301-345-5839'),
 Person('Mary McMillan', '345-353-6324')]

Source: Photo by Essentialiving on Unsplash
-->








