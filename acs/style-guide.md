# Content Style Guide

In general, all new content should adhere, wherever possible, to the
[Google Developer Documentation Style Guide](https://developers.google.com/style/).
The key points of the developer style guide are listed
[here](https://developers.google.com/style/highlights). A few deviations,
amendments, and clarifications are listed below.

Both this style guide and the developer style guide should be cited in code
reviews to ensure that all new content is consistent.

- [Tone](#tone)

  - [Audience](#audience)
  
  - [Person](#person)
  
- [Code Blocks](#code-blocks)

- [Heading Capitalization](#heading-capitalization)

- [Lists](#lists)

  - [Ordered Lists](#ordered-lists)
  
  - [Indentation](#indentation)
  
  - [Sublists](#sublists)

- [Filenames](#filenames)

- [Hyperlinks](#hyperlinks)

- [Line Length](#line-length)

- [Directives](#directives)

## Tone

### Audience

The developer style guide is written for content aimed at developers, while
Applied Computing Series content is aimed at students. For the most part,
[the tone guidelines in the developer style guide](https://developers.google.com/style/tone)
are valid, but it is important to account for the different audience, where
applicable.

### Person

As recommended in the in developer style guide,
[use second person](https://developers.google.com/style/person). That is, use
"you" instead of "we". This also precludes usage of "let's".

The following is not consistent with the style guide.

```
Let's get started.
```

Both of the following are consistent with the style guide.

```
Get started.
```

```
You can get started.
```

## Code Blocks

Code blocks should follow the guidelines in
[the code samples guidelines in the developer style guide](https://developers.google.com/style/code-samples).
More specifically, all python code should adhere to the
[Google Python Style Guide](http://google.github.io/styleguide/pyguide.html).

## Heading Capitalization

The developer style guide
[recommends using sentence capitalization for headings](https://developers.google.com/style/capitalization#capitalization-in-titles-and-headings),
namely capitalizing only the first word and proper nouns, but not ending with a
period. This is not consistent with the existing content, and also not
consistent with the heading capitalization in most academic textbooks.

To avoid inconsistency, you should always use the
[title capitalization format used by the *Modern Language Association*](https://capitalizemytitle.com),
as follows:

1.  Capitalize the first word of the title or heading and of any subtitle or
    subheading.
1.  Capitalize all "major" words (nouns, verbs, adjectives, adverbs, and
    pronouns) in the title or heading, including the second part of hyphenated
    major words (for example, Self-Report not Self-report).
1.  Capitalize all words of four letters or more.

## Lists

### Ordered Lists

For an
[ordered list in Markdown](https://www.markdownguide.org/basic-syntax/#ordered-lists),
you can use `1.` for all items, and the numbering takes care of iteself. In
restructured text, you need to specify the numbering you want. Use two spaces
after the period when the number has 1 digit, and maintain this identation. (So,
if the numbering goes to 2 digits, use 1 space after the period.)

```
1.  This is the first item.
2.  This is the second item.
3.  This is the third item.
```

### Indentation

All unordered lists should use the `-` character to indicate a bullet, followed
by 3 spaces. If the item goes over the line limit, you should continue the item
at the same indent.

```
-   This is an example of an item.
-   This is an example of a very long item that exceeds the eighty character line
    limit.
```

### Sublists

When using sublists (ordered or unordered), you need to have blank lines around
the sublist, to avoid indentation errors. Again, when items exceed the line
limit, you should continue the item at the same indentation.

```
1.  This is the first item in the ordered list.

    -   This is an example of a very long item that exceeds the eighty character
        line limit.

2.  This is the second item in the ordered list.
```

## Filenames

The developer style guide
[recommends using all lower case with hyphen separators for filenames](https://developers.google.com/style/filenames#naming-guidelines),
however this is not consistent with existing Applied Computing Series content.
Most existing filenames use `snake_case.ext` (while some use `CamelCase.ext`).
While folder names for existing content are generally in `CamelCase`, to
maintain consistency with filenames and with existing code in the
[ACS directory](https://github.com/google/applied-machine-learning-intensive/tree/master/acs/),
new folder names will be in `snake_case`.

*   All new files should use `snake_case` e.g. `your_file_name.ext`.
*   All new folders should use `snake_case` e.g. `your_folder_name`.

## Hyperlinks

Hyperlinks are rendered in restructured text using the following syntax. All
link references should be at the very end of the file. If there are multiple
links, do not include any blank lines between them.

```
The word `hyperlink`_ links to the website https://this-is-the-link.com. A
`second link`_ links to the website https://another-link.com.

.. _hyperlink: https://this-is-the-link.com
.. _second link: https://another-link.com
```

There exists syntax to use hyperlinks inline, but for the sake of consistency
and readability, prefer using this style where possible, where all links are
referenced at the end of the file.

If the hyperlink reference exceeds
[the line limit of 80 characters](#Line-Length), keep the entire reference on
one line.

The following is not consistent with the style guide.

```
.. _hyperlink:
   https://some-extremely-long-link-that-makes-this-line-more-than-80-characters
```

The following is consistent with the style guide.

```
.. _hyperlink: https://some-extremely-long-link-that-makes-this-line-more-than-80-characters
```

## Line Length

All text should adhere to a line length of 80 characters. Lines should be as
long as possible without exceeding 80 characters. A line can be over 80
characters if and only if the line is inseparable and is over 80 characters.
Examples of inseparable lines are filepaths and [hyperlinks](#Hyperlinks).

## Directives

Put two blank lines on either side of any `rst` or Runestone directives.
Runestone directives often have blank lines contained within, so the double
spacing helps to clarify the start and end of the directive.

The following is not consistent with the style guide.

```
This is some text.

.. runestone_directive::

This is more text.
```

The following is consistent with the style guide.

```
This is some text.


.. runestone_directive::


This is more text.
```
