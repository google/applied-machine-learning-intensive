# AC1 Course Guide

- [Overview](#overview)
- [What is AC1?](#what-is-ac1)
- [Learning Objectives](#learning-objectives)
- [Catalog Description](#catalog-description)
- [Faculty Guidelines](#faculty-guidelines)
  * [Setting Community Guidelines](#setting-community-guidelines)
    + [In-Class Activity](#in-class-activity)
  * [Projects](#projects)
    + [Team Formation and Dynamics](#team-formation-and-dynamics)
    + [Project Coaching](#project-coaching)
  * [Class Discussion](#class-discussion)
- [Sample Syllabus](#sample-syllabus)
- [Using the Instructor’s Guide](#using-the-instructors-guide)
  * [Hook](#hook)
  * [Activities](#activities)
    + [Livecoding](#livecoding)
    + [Ethics](#ethics)
    + [Hypothesis Forming and Testing](#hypothesis-forming-and-testing)
  * [Datasets](#datasets)
  * [[P1] Checks for Understanding](#p1-checks-for-understanding)
  * [[P1] Solutions/Output Expectations](#p1-solutionsoutput-expectations)
- [Structuring Class Time](#structuring-class-time)

## Overview

Introduce instructors to the purpose and structure of AC1, including helpful
guidelines for course management.

## What is AC1?

The primary goal of AC1 is to teach students **data literacy**: the ability to
access, transform, use, and interpret data, ethically and effectively, to inform
decision-making. This is a practical, hands-on course that will teach students
to ask and answer questions about data through spreadsheets, SQL databases, and
data visualization tools. The skills and problem solving mindset they learn will
be highly applicable to any major or career.

This is an interdisciplinary course combining concepts from data science,
computer science, and statistics -- it is not a comprehensive introductory
course in any of those fields. AC1 prepares students for AC201, which is a
more comprehensive course on Python programming and data science in Python.
Students who do not take more courses on the subject will still have a useful
understanding of widely-used data science tools and techniques, which they can
continue to use and build upon.

## Learning Objectives

Daily learning objectives follow seven overarching themes in achieving data
literacy.

1.  **Data Transformation (DT)**: Understanding and proper usage of basic
    relational algebra operators (e.g. filter, aggregation, join).
1.  **Ethics and Fairness (E)**: Identifying ethical considerations in the
    collection, analysis, and presentation of data (e.g. privacy, fairness,
    disclosure).
1.  **Modeling (M)**: Intuitive understanding of statistical models and
    variance; practical ability to use core modeling techniques (e.g. linear and
    logistic regression).
1.  **Problem Solving (PS)**: Solving large problems by breaking them into
    smaller pieces, anticipating results, and troubleshooting when results are
    not expected.
1.  **Programming Readiness (PR)**: Ability to write and fix problems in formal
    language syntax; understanding of fundamental programming constructs (e.g.
    conditionals, functions).
1.  **Storytelling (S)**: Posing research questions, using the correct data
    analysis, interpreting the results, and presenting the conclusions.
1.  **Visualization (V)**: Choosing, creating, interpreting, and critiquing data
    visualizations.

The
[instructor guide](https://github.com/google/applied-machine-learning-intensive/blob/master/acs/external_documentation/ac1_instructor_guide.md)
details specific learning objectives for each day, and connects them where
possible to the themes above. Note that the learning objectives for a single day
may cover multiple themes, and each theme will be reflected and reinforced in
the learning objectives for multiple days.

Students will see these learning objectives in their textbook. To further help
them make and retain connections across different units, you should make an
effort to connect course concepts to these overarching themes whenever possible.

## Catalog Description

[However this course should be described in your school course catalog]

## Faculty Guidelines

This class uses a semi-flipped classroom approach using Runestone. Students will
use the textbook for assigned readings and exercises, while class time should be
used for hands-on practice, discussions, and group work.

### Setting Community Guidelines

A positive, supportive classroom environment can encourage students to reach to
one another for help, which in turn can encourage student learning and reduce
student reliance on the instructor's expertise. Establishing clear norms for
classroom participation helps students know what to expect and reduces
unnecessary conflict, and students feel more included and respected if they are
involved in creating these guidelines. Creating these as a group also functions
as an early ice-breaker and community builder.

For most productive discussion, each student should think of their own important
guidelines before discussing and achieving consensus as a class. You could have
them brainstorm these in small groups, or to save class time, assign a survey to
complete as prework. [Here is a survey](https://forms.gle/VAuoGjsGsQke12xY9)
with some sample questions.
[Here is a guide](https://www.umass.edu/tefd/sites/default/files/TEFD-Developing%20Class%20Norms%20and%20Participation%20Guidelines_0.pdf)
with suggestions for possible guidelines, and
[here](http://oncourseworkshop.com/table-contents/establishing-classroom-rules/)
is another sample activity for establishing classroom rules.

#### In-Class Activity

1.  Share the (anonymous) results of the surveys. You can also suggest and
    record some additional guidelines that may not have been mentioned.
    1.  If you didn’t assign this as prework, divide students into groups of 3-5
        and each to make a short list of answers to the survey questions.
    1.  Have each group share their lists and write down/record all responses.
1.  Achieve consensus: Combine similar items to create a set of guidelines that
    the whole class can agree on.
    1.  Clarify using concrete examples when necessary (e.g. What does “respect
        each other” look like?).
    1.  Be generous with praising suggestions, and make sure to address all
        suggestions so no student feels invalidated.
1.  Discuss: how should the class respond if someone breaks a guideline?

### Projects

This course emphasizes hands-on student learning. Students will complete a
project at the end of each Module, along with various smaller exercises and
group work throughout the class. The end-of-module projects are large and
designed to be completed in groups. Working in groups also better prepares
students for real-life working environments.

You may already have experience leading project-based learning -- either way, we
are including in this section some best practices for fostering successful
student projects in this course.
[Here is an article](https://uwaterloo.ca/centre-for-teaching-excellence/teaching-resources/teaching-tips/alternatives-lecturing/group-work/implementing-group-work-classroom)
with more suggestions on implementing group work.

#### Team Formation and Dynamics

[Research](https://sheilamargolis.com/2011/01/24/what-is-the-optimal-group-size-for-decision-making/)
typically recommends 4-5 members as the ideal group size. However, in our
experience leading data and computer science group projects, groups larger than
four sometimes run into issues where one member has much less work to do, or
gets stuck with the non-technical tasks. We thus recommend groups of **four**,
which allows for diversity of group ideas and for students to work in two pairs
when needed. Groups of three can work well also.

There are many ways to form students into groups. One important purpose of the
projects is so students can apply class content to practical life applications
that interest them. They will generally have a lot of flexibility to choose
research questions, datasets, and areas for analysis -- which can also lead to a
lot of conflict in making group decisions. Given that, the most successful team
formation method we’ve found is to let students form their own groups based on
those areas of interest for the project. Here’s a structured activity to do so:

1.  Give students the project description and tell them to come to class with a
    few ideas for the questions, topics, or datasets they would want to work
    with.
1.  Have each student present their ideas to the class.
1.  Option 1 (students decide): Students talk to the other students whose ideas
    interested them, forming groups amongst themselves. There might be instances
    where too many or too few students want to be in a group -- typically,
    students are able to resolve this themselves. If not, you may need to step
    in and mediate.
1.  Option 2 (you decide): Students submit their top 3 interests after seeing
    everyone’s ideas. You then form groups based on the interests, their majors,
    and/or any other group forming philosophy you have.

Once groups are formed, you should make sure group members know each other, are
comfortable with working together, and can coordinate time to meet/work outside
of class.

Finally, disagreements will be inevitable. Remind students of relevant classroom
guidelines that you decided on together at the start of class -- hopefully these
principles have been reinforced throughout the in-class exercise work as well.
If they have strong concerns about their group dynamic, they should talk to you.

#### Project Coaching

Each project handout includes a description of required steps for the project,
as well as a detailed rubric for how students will be graded. Groups should read
at least this description and the “Excellent” column in the rubric before
beginning work. Be prepared to answer clarifying questions whenever they may
come up. Before submitting their work, students should check back against the
rubric.

One of the most challenging tasks for any group, regardless of level of
experience with group work, is working together to break down and delegate
responsibilities. Especially near the beginning, check in with groups about
their progress and task breakdown: Does each person have a clear role? Are they
clear about all the project deliverables? Have they broken the project down into
reasonable, smaller tasks?

You may want to set explicit milestones for some projects. This forces groups to
actually do work incrementally, rather than saving it all for the night before,
and gives you another chance to give feedback. For example, for the Module C
project, you could specify a “midpoint checkin” in week 5 by which students must
have completed all the SQL analysis up to step 6. Create as many milestones as
you think will be useful -- even if you don’t require any, check-in with groups
to make sure they’re setting milestones for themselves.

Other good practices:

1.  Make yourself as available for questions/advice as you want, but encourage
    students to do their own exploration and experimentation. For example:
    1.  If they ask “Why am I getting this Sheets error?”, refer them to the
        textbook, resources on debugging, or other group members, but don’t
        directly debug the error for them.
    1.  If they ask “What variables should I look at in this dataset?”, advise
        them on how to think of interesting questions about a dataset, but don’t
        directly choose variables for them.
1.  Show a few examples of projects that fall under each column of the rubric.
    This can be helpful at the very beginning of a project, to give a sense of
    the final deliverables, or at the very end, to make sure students aren’t
    constrained by the examples.
1.  Give frequent feedback throughout the group work. Don’t dismiss or put-down
    ideas, but do give constructive advice when needed.
1.  Set aside class time for each group to present their project and answer
    questions.
1.  Ask students to reflect and give feedback on their group work process at the
    end.

### Class Discussion

Data scientists and computer scientists don’t work in isolation. Students should
discuss and work through class concepts with each other frequently, building a
sense of inquiry and collaboration.
[Here is a guide](https://github.com/google/applied-machine-learning-intensive/blob/master/acs/external_documentation/discussion_guide.md)
to creating good discussions in your classroom.

## Sample Syllabus

schedule, milestones, grading rubrics

## Using the Instructor’s Guide

To give students as many resources as possible, we have included almost all
classroom content in the textbook. The
[instructor guide](https://github.com/google/applied-machine-learning-intensive/blob/master/acs/external_documentation/ac1_instructor_guide.md)
will frequently refer to examples in the textbook, so you should familiarize
yourself with the textbook material for each day.

The instructor guide provides light guidance on how to structure each class. It
contains the following components:

### Hook

This section suggests potential ways to begin the day’s lesson in order to
excite, motivate, and prepare students to begin interacting with the material.
Hooks help with forming connections between past and upcoming material,
encouraging student curiosity, and emphasizing the relevance of data science
concepts to students’ lives and interests.

Hooks may be a motivating question, a thought-provoking real life example, a
group discussion, or a short quiz. Of course, you will know your students best,
so feel free to tailor these hooks for your specific classroom.

### Activities

This section will describe activities that you need to facilitate for the day,
as well as any prework or homework that students will need to complete. We’ll
also include a rough guideline for how long each activity will take, so that you
can plan accordingly. Nearly every day’s activities will include some livecoding
portion, some discussion of ethics, and some practice with hypothesis forming
and testing.

#### Livecoding

Sometimes it’s useful for students to see a live demonstration of a skill.
Livecoding can also be a good tool to facilitate group discussions. We will tell
you explicitly when and what content should be displayed by you for the class by
marking it with **[DEMO]**, but you should also feel free to do demos or
livecoding for the class whenever you see fit.

#### Ethics

We want students to think about the ethics of data science early and often
during the course. As ever-increasing amounts of data are collected and used for
decision-making, there are ever-increasing opportunities for abuse of data.
Developing data literacy involves understanding that data is not facts and
figures in a vacuum -- every time they interact with data, students should
consider potential concerns with its collection, analysis, and interpretation.

We’ll mark real-world applications and ethical questions related to the learning
material for the day with **[ETHICS]**. These will usually be most effectively
introduced as topics for discussion. As with the hook, feel free to tailor this
for your specific classroom.

#### Hypothesis Forming and Testing

The ability to form and test hypotheses is an essential and overarching data
science skill. It is also directly tied to metacognitive and inquiry-based
learning, which have been shown to improve student learning outcomes, especially
in a flipped classroom. We want students to engage and practice this skill early
and often; since it can be hard to didactically explain how to form good
hypotheses, it requires practice and constructive feedback.

We’ll highlight part of the day’s activities or suggest activities that practice
this skill with **[HYP]**. Additionally, you should model a spirit of curiosity
and inquiry by frequently making and testing predictions in front of the class,
letting yourself make mistakes (intentionally or unintentionally), and
recovering from them. Seeing you make mistakes can also make students feel more
comfortable in the classroom. Encourage your students to follow the same
process: form predictions, test those hypotheses through hands-on application,
then think critically about the results.

### Datasets

This section will describe new datasets that the students will be working with
that day. The purpose is to give you familiarity with the datasets and prepare
you for any questions that may arise. We’ll explain the dataset source, schema,
our motivation for choosing it, and any tricky areas to be aware of in working
with them.

### [P1] Checks for Understanding

With AIs if students aren’t understanding. TODO: guide on good checks for
understanding

### [P1] Solutions/Output Expectations

Harvey Mudd Clinic

## Structuring Class Time

We designed the instructor guide with a bi-weekly 80 minute class period in
mind, but it still works for a tri-weekly 50 minute class period. Each activity
or hook fits within 45 minutes, and includes a time estimate so you can plan
them across three days as you see fit.

Here is how we envision a typical day:

1.  Before class, use the student progress dashboard on Runestone to take a
    quick look at each section the students were assigned to read.
    1.  What questions did they struggle with? Pick out the ones they struggled
        with the most and be prepared to review that material.
1.  At the beginning of class, see if there are any questions about the prework
    or material from the previous class.
    1.  If not, highlight any questions that some or many seemed to have trouble
        answering and work through an example to try to clarify.
    1.  If you assigned them to finish some part of a larger exercise, make sure
        to walk through or discuss an answer.
1.  Do the suggested hook, or one of your choice.
1.  Go through the suggested activities, making them as interactive as students
    are comfortable with. Generally, the textbook walks through each example
    step-by-step and the instructor guide gives ways to make the example more
    interactive.
    1.  We recommend having students work in small groups, to give them more
        practice with collaboration and group work.
    1.  While they work, walk around and answer questions. If you notice that a
        number of groups are having the same issue, call a timeout and talk
        about that particular question with the whole class.
    1.  If many groups are struggling, you might want to work through the
        problem together as a live coding session.
    1.  Discuss the example as a class. You could have one group present their
        answer, then see if other groups agree or disagree. Make sure they
        describe their thought process!
1.  Remind them of any homework/prework for the next class (usually a textbook
    reading).
    1.  If you didn’t get through some examples, you may want to assign them as
        homework as well.
