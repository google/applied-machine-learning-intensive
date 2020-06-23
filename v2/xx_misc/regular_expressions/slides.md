---

marp: true

---

# Regular Expressions (Regex)

<!--
In this unit, we will learn about a powerful data processing tool: regular expressions.
-->

---

# What are regular expressions?

- Expressive patterns used for string matching
- Can also be used to replace or modify text
- Regex packages exist across almost all languages, including Python
- Import it in Python using `import re`

<!--
What is a regular expression? Regular expressions refer to an expressive language that can be used to match patterns in character content. Many of these patterns are simple and easy to interpret. However, the language is expressive enough that you can quickly create a very dense and difficult-to-interpret expression.

Beyond matching, these expressions can also be used to modify text. You can perform simple "find-and-replace" operations. But you can also find strings, modify them, and then replace the original string with the modified version.

As mentioned earlier, regular expressions are a language of their own. There is regular expression support in Python, but Python is not the only language to have regular expressions.

Though it wasn't the first language to support regular expressions, the Perl programming language is closely tied to regular expressions. Because of this, there is a standard called the "Perl Compatible Regular Expression" (PCRE) standard. Python supports many PCRE expressions. Since these expressions aren't part of the Python design, you might find some of them to be less Pythonic than most of the features that we work with in this course.

Most languages have some level of PCRE support, making the expressions themselves somewhat cross-language. 

This lesson will work a little differently compared to others. Instead of spending the entire lesson going over new concepts, we will cover just a few key rules in regex, then we will use the rest of the time to go over some examples.

-->

---

# How to use regex

- There are so many regex rules
- If you need help, look online; the internet is your friend!

<!--
In the workplace, you will find that most of the time you end up using Stack Overflow or a similar place a LOT. Regex is a great
example of that. If you ever have a complex regex pattern to match, chances are this (or a similar) question has been answered
before somewhere on the internet. Don't be afraid to use these resources. It will help your understanding.
-->

---

# Basic Regular Expression Syntax

<!--
In the next few slides, we will highlight some basic regular expression rules. These rules are pretty easy to get your mind around and yet are very powerful.
-->

---

# Repetition: Zero or More

##  `*` means any number of occurrences

Expression: `"Go*al!"`

String | Status
-------|-------
`Goal!` | Matches
`Goooooooooal!` | Matches
`Gal!` | Matches

<!--
Here is an example of matching "zero or more" characters. The asterisk character is the regular expression that signals that zero or more characters should be matched. But which characters? With regular expressions, it is the immediately preceding character. In our example the asterisk in the expression is bound to the 'o' character, so we match all three strings.

Looking at this particular example, that is probably not what we want. Let's look at another expression that only matches variations of the world 'Goal'.
-->

---

# Repetition: One or More

##  `+` means one or more occurrences

Expression: `"Go+al!"`

String | Status
-------|-------
`Goal!` | Matches
`Goooooooooal!` | Matches
`Gal!` | Does Not Match

<!--
In this example, the plus sign is the expression for "one or more." This ensures that we have at least one 'o' in our match.

But what if we want to limit the number of 'o' characters? For instance, we might not want to match [this 'Gooooooo....oooal'](https://www.youtube.com/watch?v=UioCvLN-370).
-->

---

# Repetition: M to N

##  `{m,n}` means a range of occurrences

Expression: `"Go{2,4}al!"`

String | Status
-------|-------
`Goal!` | Does Not Match
`Gooal!` | Matches
`Gooooal!` | Matches
`Goooooooooal!` | Does Not Match


<!--
Here we have limited our 'Goal!' to have between 2 and 4 'o' characters. You can see that we match both two 'o' characters and four, so the range is inclusive. This is slightly different than how Python treats ranges and is something to be aware of.
-->

---

# Repetition: Zero or One

## `?` means zero or one occurrence

Expression: `"Goals?"`

String | Status
-------|-------
`Goal` | Matches
`Goals` | Matches
`Goalss` | Does Not Match

<!--
There are sometimes cases where you want to match for zero or one character. A common example is depicted in this slide where we are looking for the singular or plural version of a word. Of course, this doesn't work for all English words, but works for specific cases that you might encounter.
-->

---

# Wildcard

## The lowly, yet powerful `.` is paired with some repetition like `.*`

<!--
The period/dot is the wildcard character for regular expressions. It translates to "match anything." A wildcard is often followed by a repetition character, which will match some number of any characters. The `.*` will match all of every character. This can be useful for skipping large amounts of text that you don't care about finding specific patterns in, but that are flanked or suffixed by patterns that you do care about.
-->

---

# Character Classes

- `[a-z]` means any lower-case letter, `[A-Z]` means any upper-case letter
- `[0-9]` and `\d` mean any digit
- `\w` means any word
- `\s` means a space so `\s*` means any length of whitespace
- Upper-case often means the opposite, so `\D` means not a digit, `\S` means not a space, `\W` means not a word

<!--
You might think of character classes as limited wildcards. They can be created to match sets of specific characters. There are even some pre-packaged wildcards like '\s' and '\w'. These can be capitalized to match the opposite of their pattern.
-->

---

# Groups

- `()` means "group"
- `|` means "or"


Example 1:
`
"(cat)"
`
Example 2:
`
"(cat|dog|python)"
`


<!--
Parentheses are used as grouping elements in regular expressions. By default, anything inside parentheses will be "captured" when you perform a match. This captured match can then be accessed directly in the matched expression. In the first example, we search for the literal "cat" as a capture group.

One neat thing about groups is that they can have multiple expressions separated by vertical bar characters. In the second case on the slide we are searching for any one of the literals "cat", "dog", or "python".
-->

---

# Anchors

- `^` anchors a string to the start of a sentence, e.g. `'^a'` only matches if `'a'` occurs at the start of a string
- `$` anchors a string to the end of a sentence, e.g. `'a$'` only matches if `'a'` occurs at the end of a string

<!--
Anchors can be used to tie your match to the start or the end of the text you are processing.
-->

---

# Escapes

- Use `\` to precede any special character, such as `-`


`
"\n"
`
`
"\-"
`
`
"\("
`
`
"\."
`
`
"\["
`
`
"\\"
`

<!--
Sometimes you need to type in a character that means something special to the regular expression engine or that is difficult to express in a string. For these cases, you can use the regular expression escape (backslash character).

In our examples you can see:

  * A new line character
  * A dash, which is needed when you want a literal dash in a character class in some cases
  * A parenthesis; otherwise it is considered the start of a group
  * A square bracket; otherwise it is considered the start of a character class
  * And finally the backslash itself

These are just a few of the many escape sequences in regular expressions.

-->

---

# What do the following regex patterns match?

<!--
And we have just scratched the surface of regular expressions. Regular expressions are a language of their own that just happens to have support in Python. Entire large books have been written about regular expressions. You'll definitely want to dig more into the features available to you.

But first, let's look at some sample expressions.
-->

---

# What do the following regex patterns match?

## `'.*machine\slearning.*'`

<!--
Matches any string that contains the phrase "machine learning". Note that spaces must be encoded using `\s`, not with a regular space.

-->

---

# What do the following regex patterns match?

## `'^\d{3}\-\d{3}\-\d{4}$'`

<!--
Matches anything of the form of a US-telephone number. The `^` and `$` anchor this pattern to the start and end of the string.
`\d{n}` matches n instances of a digit.

-->

---

# What do the following regex patterns match?

## `'[a-zA-Z0-9]*'`

<!--
Matches any string that contains only letters and numbers. You could imagine this kind of pattern could be used to test 
whether a password matches a criteria. For example, a password may need to be a certain length and contain a certain number of
letters, numbers, and special characters.

-->

---

# What do the following regex patterns match?

## `'[aeiou]{2}[a-z]*'`

<!--
Matches any word that starts with 2 vowels, e.g. aardvark, aim, either.

-->

---

# Your Turn 

<!--
Now let's get some additional practice in the lab. 
-->
