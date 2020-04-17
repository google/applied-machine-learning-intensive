# Regular Expressions (Regex)

---

# What is a regular expression?

- A way of using patterns to match strings
- Think of it as a very advanced and complex "find-and-replace"
- Regex packages exist across almost all languages, including Python
- Import it in Python using `import re`

<!--
This lesson will work a little differently compared to others. Instead of spending the entire lesson going over new concepts,
we will cover just a few key rules in regex, then we will use the rest of the time to go over some examples.

-->

---

# How to use regex

- There are so many regex rules
- If you need help, look online; the internet is your friend!

<!--
In the workplace, you'll find that most of the time you end up using Stack Overflow or a similar place a LOT. Regex is a great
example of that. If you ever have a complex regex pattern to match, chances are this (or a similar) question has been answered
before somewhere on the internet. Don't be afraid to use these resources. It will help your understanding.

-->

---

# Some basic regex rules

---

# Repetition

- `*` means any number of occurences, e.g. `'a*'` matches 0+ occurences of `'a'`
- `+` means one or more occurences, e.g. `'a+'` matches 1+ occurences of `'a'`
- `{m,n}` matches `m` to `n` occurences, e.g. `'a{2,4}'` matches 2-4 occurences of `'a'`

---

# Special Characters

- `.` means any character
- `|` means "or"
- Use `\` to precede any special character, such as `-`
- `^` anchors a string to the start of a sentence, e.g. `'^a'` only matches if `'a'` occurs at the start of a string
- `$` anchors a string to the end of a sentence, e.g. `'a$'` only matches if `'a'` occurs at the end of a string
- There are LOTS more...

---

# Character Classes

- `[a-z]` means any lower-case letter, `[A-Z]` means any upper-case letter
- `[0-9]` and `\d` mean any digit
- `\w` means any word
- `\s` means a space so `\s*` means any length of whitespace
- Upper-case often means the opposite, so `\D` means not a digit, `\S` means not a space, `\W` means not a word

---

# What do the following regex patterns match?

---

# What do the following regex patterns match?

## `'.*regular\sexpression.*'`

<!--
Matches any string that contains the phrase "regular expression". Note that spaces must be encoded using `\s`, not with a
regular space.

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
Matches any word that starts with 2 vowels, e.g. aadvark, aim, either.

-->
