# How to Contribute

We'd love to accept your patches and contributions to this project. There are
just a few small guidelines you need to follow.

## Contributor License Agreement

Contributions to this project must be accompanied by a Contributor License
Agreement. You (or your employer) retain the copyright to your contribution;
this simply gives us permission to use and redistribute your contributions as
part of the project. Head over to <https://cla.developers.google.com/> to see
your current agreements on file or to sign a new one.

You generally only need to submit a CLA once, so if you've already submitted one
(even if it was for a different project), you probably don't need to do it
again.

## Code reviews

All submissions, including submissions by project members, require review. We
use GitHub pull requests for this purpose. Consult
[GitHub Help](https://help.github.com/articles/about-pull-requests/) for more
information on using pull requests.

## Community Guidelines

This project follows
[Google's Open Source Community Guidelines](https://opensource.google.com/conduct/).

## What to change?

The content is a mix of Jupyter notebooks, slide decks, and documents. If you do want
to make a contribution, it is important to know what you should change and in what
order.

**Notebooks**

The source of truth for notebooks are the zipped files named '*-key.zip'. These are
password protected files that are intended to be first viewed by instructors.

If you are an instructor and want to submit a change:

1. run `tools/unlock_labs.py`
1. make your change in the `*-key.ipynb` file
1. run `tools/lock_labs.py`
1. run `tools/make_student_versions.py`
1. commit your change
1. submit a pull request

If you are not an instructor and want to submit a change:

1. make a change in the `*.ipynb` file
1. commit your change
1. submit a pull request

If your change involves an answer key either work with your instructor to submit a
fix or file a ticket in the project.

**Slides**

The source of truth for slides are the marp-formatted markdown files. If you want to
make a contribution please:

1. edit the markdown file
1. run `find content -name '*md' -exec grep -l marp {} \; | sort -u | xargs marp --pptx --allow-local-files`
1. commit your change
1. submit a pull request


**Other Resources**

If you would like to submit a change for another resource (ex: odt, pdf, jpg), then please
submit a pull request.
