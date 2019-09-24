# Serving Content On Runestone

This document demonstrates how to serve a local copy of a textbook on
[Runestone](https://runestone.academy/runestone/default/user/login?_next=/runestone/default/index).

- [Purpose](#purpose)
- [Installing Runestone](#installing-runestone)
- [Serving Content From GitHub](#serving-content-from-github)
- [Deactivating The Virtual Environment](#deactivating-the-virtual-environment)
- [This process isn't working for me!](#this-process-isn-t-working-for-me)

## Purpose

All content for the AC1 course will be hosted on Runestone. Content is created
via [restructured text](https://en.wikipedia.org/wiki/ReStructuredText) (`.rst`)
files, and this is converted to HTML via JavaScript. The purpose of this
document is to show, step by step, how to test that a changelist with newly
edited content is presented correctly and as intended on Runestone. This is done
by creating a local copy of the textbook that contains the proposed changes.

## Installing Runestone

**IMPORTANT:** This installation should only be done once. Once you have
installed the `runestone` package on your machine, you will not need to repeat
these steps, unless you use a new machine.

1.  Type `cd` to navigate to your home directory.

```shell
cd
```

1.  Install `python3-venv`, a package to create virtual Python environments.
    {value=2}

```shell
sudo apt-get install python3-venv
```

At this command, you will be prompted to enter your password.

1.  Create a virtual environment for use with Runestone. {value=3}

```shell
python3 -m venv .virtualenvs/Runestone
```

1.  Activate the virtual environment for Runestone. {value=4}

```shell
. ~/.virtualenvs/Runestone/bin/activate
```

The `(Runestone)` prefix is present in your terminal address whenever you are in
the Runestone virtual environment.

1.  Install Runestone using `pip`. {value=5}

```shell
pip install runestone
```

If the output includes errors that look like <span style="color:red">*"Failed
building wheel for..."*</span>, you can probably ignore them. These errors
relate to specific Runestone packages that should not affect building content.

## Serving Content From GitHub

This section details how to preview changes in Runestone from a repository in
GitHub.

1.  Activate the virtual environment for Runestone, if it is not already
    activated from the preceding section.

```shell
. ~/.virtualenvs/Runestone/bin/activate
```

The `(Runestone)` prefix is present in your terminal address whenever you are in
the Runestone virtual environment.

1.  Find your machine's `hostname`. {value=2}

```shell
hostname
```

This hostname will be where the textbook is served, so you will need to remember
this name.

1.  Clone the GitHub repository that you want to serve in Runestone. {value=3}

```shell
git clone https://github.com/${YOUR-USERNAME}/${YOUR-REPOSITORY}
```

1.  Navigate to the
    [AC1 textbook folder](https://github.com/google/applied-machine-learning-intensive/tree/master/acs/ac1)
    using `cd`. {value=4}

1.  Build the Runestone server. {value=5}

```shell
runestone build --all
```

Comments marked as <span style="color:red">**WARNING**</span> can generally be
ignored. Be sure, however, to read the context and advice concerning the
warning. Fatal issues will be marked as
<span style="color:red">**ERROR**</span>.

This command generates several auxiliary files in your workspace that are
necessary for serving the website. Do not check these files into google3.

1.  Serve your content on Runestone. {value=6}

```shell
runestone serve
```

This will start a local Runestone server. The output should tell you what port
the server is being hosted on (usually it will be `8000`). You can then view the
HTML output of your local content by going to `hostname:8000` in the browser.

All textbook content is created under the
[`_sources`](https://github.com/google/applied-machine-learning-intensive/tree/master/acs/ac1/_sources)
directory. Navigating to `hostname:8000` takes you to the book's table of
contents. In order to navigate to a specific file or chapter of the book, you
can append the filename to the URL, but with the `.html` suffix in place of
`.rst`. For example, if you edited
[this file at `_sources/sheets_basics/introduction.rst`](https://github.com/google/applied-machine-learning-intensive/blob/master/acs/ac1/_sources/sheets_basics/introduction.rst)
and want to see the changes to that file specifically, you can navigate to
`hostname:8000/sheets_basics/introduction.html`.

## Deactivating The Virtual Environment

You can deactivate the virtual environment at any stage with `deactivate`.

```shell
deactivate
```

This removes the `(Runestone)` prefix from your terminal address.

## This process isn't working for me!

If any of the above steps do not work, please contact kraskutti@google.com.
