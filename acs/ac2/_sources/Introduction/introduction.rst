
..  Copyright (C)  Google, Runestone Interactive LLC
    This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/4.0/.

What is Data Science?
=====================

Ninety percent of the data in the world today has been created in the last two years alone [`iflscience <http://www.iflscience.com/technology/how-much-data-does-the-world-generate-every-minute>`_].
This is the result of the continuing acceleration of the rate at which we store data. Some estimate that roughly 2.5 quintillion bytes of data are generated per day. That's 2,500,000,000,000,000,000 bytes! By comparison, all the data in the Library of Congress adds up to about 200 TB, merely 200,000,000,000,000 bytes. This means that we are capturing 12,500 libraries of congress per day!

The amount of data that Google alone stores in its servers is estimated to be 15 exabytes, that is 15 followed by 18 zeros!  For those of you that remember punch cards you can visualize 15 exabytes as a `pile of cards three miles high <https://what-if.xkcd.com/63/>`_ covering all of New England!  Everywhere you go, someone or something is collecting data about you:  what you buy, what you read, where you eat, where you stay, how you drive your car.

What does it all mean?
----------------------

Often this data is collected and stored with little idea about how to use it because technology makes it so easy to capture. Other times the data is collected quite intentionally.  The big question is “What does it all mean?”  That is where data science comes in.  Data Science is an emerging field that brings together ideas that have been around for years, or even centuries.  Most people define data science as "an interdisciplinary field about processes and systems to extract knowledge or insights from data in various forms".

Data science has spawned many new jobs in which people and computers extract valuable insights from this data. These range from the simple scaling of functions that existed previously to completely new jobs processing data that was never previously captured. For example, the owner of a general store 100 years ago kept a log, both on paper and in his head, of the items his customers purchased and how those items varied with the seasons. Based on this knowledge he would decide how many of each product to order to meet his customers' needs while keeping his stock to a minimum. With data science, this job can be done on the scale of thousands of supermarkets spread across the country and can factor in a myriad of signals that would have been too hard for our store owner to track such as unemployment, inflation or even weather forecasts.

At the other end of the spectrum, we are now able to track the pressure applied to various points on the sole of an athletic shoe with a precision that was impossible just a few years ago and to design more efficient and comfortable footwear by understanding this data [`tekscan <https://www.tekscan.com/product-group/medical/in-shoe>`_].


What does a data scientist do?
------------------------------

.. youtube:: 0tuEEnL61HM


Data Science in a Liberal Arts Context
--------------------------------------

As an interdisciplinary field of inquiry data science is perfect for a liberal arts college.  Combining statistics, computer science, writing, art, and ethics data science has application across the curriculum:  biology, economics, management, english, history, even music.  The best thing about data science is the job of a data scientist seems perfectly suited to many liberal arts students.

  The best data scientists have one thing in common: unbelievable curiosity. - D.J. Patil Chief Data Scientist of the United States.

The diagram below is widely used to answer the question "What is Data Science?" It also is a great illustration of the liberal arts nature of data science.  Some computer science, Some statistics, and something from one of the many majors available at a liberal arts college, any of which are looking for people with data skills!

.. figure:: https://static1.squarespace.com/static/5150aec6e4b0e340ec52710a/t/51525c33e4b0b3e0d10f77ab/1364352052403/Data_Science_VD.png?format=1500w

   Venn Diagram |CCBYANC| Drew Conway

According to Eric Haller, VP of Experian, a global information services company, recently interviewed by the Chicago Tribune.

  A data scientist is an explorer, scientist, and analyst all combined into one role.  They have the curiosity and passion of an explorer for jumping into new problems, new dta sets and new technologies.  They love going where no man has gone before in taking on a new approach to taking on age old challenges or coming up with an approach for a very new problem where nobody has tried to solve it in the past.

  They can write their own code and develop their own algorithms.  They can keep up with the scientific breakthrough of the day and regularly apply them to their own work.  And as an analyst they have a penchant for detail, continually diving deeper to find answers.  Finding treasure in the data, analysis and the details give them an adrenaline rush.

  Our data scientists tend to operate with a noble purpose of trying to do good things for people, businesses and society with data.

However, all of this exploration and analysis means nothing if you cannot communicate it to people. In a recent Harvard Business Review article by Jeff Bladt and Bob Filbin entitled: **A Data Scientist's Real Job: Storytelling**, they elaborate

  Using Big Data successfully requires human translation and context whether it's for your staff or the people your organization is trying to reach.  Without a human frame, like photos or words that make emotion salient, data will only confuse, and certainly won't lead to smart organizational behavior. - `Harvard Business Review <https://hbr.org/2013/03/a-data-scientists-real-job-sto/>`_

Stories are great, but in data science you better make sure they are true, especially when you are dealing with stories about numbers.  In a recent article entitled `The Ethical Data Scientist <http://www.slate.com/articles/technology/future_tense/2016/02/how_to_bring_better_ethics_to_data_science.html>`_, the sub-title really tells the story:  *People have too much trust in numbers to be intrinsically objective*.
The better known phrase is that “Statistics don’t lie, but statisticians sometimes do.”   The challenge for the data scientist is to avoid the trap of choosing the statistics that only tell the story they want to tell.

  The ethical data scientist would strive to improve the world, not repeat it. That would mean deploying tools to explicitly construct fair processes. As long as our world is not perfect, and as long as data is being collected on that world, we will not be building models that are improvements on our past unless we specifically set out to do so.



The Data Science Pipeline
-------------------------

.. image:: Figures/DSPipeline.svg
   :align: left

One of the primary goals of this course is to familiarize you with the data science pipeline.  That is the series of steps you will go through as you seek to analyze and communicate with data.  There are many steps in the pipeline and as you can see the pipeline is anything but a linear process.  Doing data science is a very iterative process whereby you will often repeat previous steps because of something you learn in later steps.  This is part of the exploratory nature of data science.  There is not a single formula for success, or a single process that works for every data set.  Lets look at each of the steps:

* **Get Data** -- acquiring data can come in many forms.  Data is sometimes found in a simple file, or in relational database, from a web based interface, or in some unstructured form that you will scrape from a web page.  Many times a project will require data from more than one of these sources.

* **Exploratory Data Analysis and Visualization (EDA)** -- Its virtually impossible to glance at a data set and comprehend what it is trying to tell you.  So you will have to spend some time exploring and getting to know the data.  There are lots of questions you can ask about any data set that will help you in this task.  What is the largest of X or the smallest of X, what is the average of Y what is the distribution of Z.  In each module of this book we will spend a good amount of time on the EDA task introducing you to these questions.

* **Data Cleaning** -- As you explore the data you will discover missing pieces, outliers, data that was entered incorrectly or is even of the wrong type.  You will learn techniques for dealing with all of these problems.

* **Rescaling** -- Sometimes we want to look at data in its raw and unchanged form, but other times having data that includes pricing data, along with age data, along with distance measurements can cause big problems.  In these cases we will learn ways to rescale the data so that it works with the algorithms we want to use.

* **Training / Test split**  -- In a machine learning project we divide up our data into a training set, that we will work with for model building, and a test set that we hold back and only use for test purposes.  This is much more realistic because we frequently want to use our machine learning system to make predictions in new situations that we have never encountered.  If we only predict the things we already know that is not very interesting.

* **Model Building** -- Building models is an exciting part of data science.  In this class we will rely on libraries that are well tested rather than writing algorithms from scratch.  In particular we will use the amazing Scikit Learn library of models.

* **Model Testing** -- Once the model is built we need to test it to see how well it performs using our test data.  Sometimes things work well, and sometimes we need to go back to the drawing board to build a completely different model using a completely different algorithm.

* **Polishing and Presenting** -- Finally, when all is tested and validated you will need to present your results.  This may take the form of an infographic, an animated visualization, a video, a series of graphs that you narrate with text or in a presentation.  This is often the most important part of the process!  It doesn't do anyone any good for you to spend weeks understanding what the data is telling you if you can't turn that into a form of communication that connects with your audience.  Whether its your peers, your boss, your parents, or your customers!

Data Science in this Course
---------------------------

In this course, we will use the Python that you learned previously and apply those skills to the exploration of data about the world around us. The if-statements, for-loops and functions are still with us but, to them, we will add some specialized tools to allow us to process large datasets both easily and quickly. These are the tools that researchers and professional data scientists use to perform their work.

As we dive into data science, you will notice that the format of this course will be very different from what you experienced in your Introduction to Programming course. The questions that we will ask of each other and of the data will be more open-ended: it is no longer a matter of only computing the mean or median of some metric but of exploring all the data available to us, sometimes across multiple datasets, excluding outliers, and finding interesting groupings or associations within them. This also means that, frequently, the answers to these questions will not be a clear yes or no but something much more subjective and open to analysis. That can be frustrating at times yet that is reality of the messy world we live in (and the messy data we extract from it).

This means that the learning zones that we talked about `previously <https://runestone.academy/runestone/static/fopp/FrontBackMatter/preface.html#get-in-the-learning-zone>`_ are still very much going to be with us. Computers are still very reliable, and very quick, but not creative. As you apply more powerful tools to problem solving, you will find that some things that might have been hard with basic Python are now easy, allowing you to perform certain tasks in your comfort zone. However, new tools also mean new ways for them to fail or produce unexpected results. This will hopefully push you into your learning zone where you will discover your ability to perform complex analyses to solve real-world problem.

There is a second definition of the learning zone that is related to what we have been talking aobut.  In this amazing `TED talk: How to get better at the things you care about <https://www.ted.com/talks/eduardo_briceno_how_to_get_better_at_the_things_you_care_about>`_ Eduardo Briceño talks about the "performance zone" versus the "learning zone."

.. youtube:: YKACzIrog24

The big takeaway for you is that as a student in the classroom for this class, you are in the learning zone as Briceño defines it.  You are not being judged or graded for how quickly you arrive at an answer or not!  The classroom for this course is a time for you to practice old skills, try new skills, and to fail without repercussions.  That is how we learn!  You will spend a huge amount of the rest of your life in the performance zone, so take advantage of this opportunity and enjoy the chance to be in the learning zone.

If you find yourself in the panic zone, please seek help from your instructor and/or classmates: none of the activities in this book are intended to stump you. As you understand how to solve some simpler problems, you will develop the ability to join these solutions together to solve increasingly challenging problems with real-world applications.

Datasets in this Book
---------------------

Every chapter in this book uses data.  The data that we use is real world data representing real world problems.  This is far more interesting, and complex, than the toy data sets you might find elsewhere.  It also reminds you that the real world is often messier than the carefully crafted examples you might encounter in other courses or books.

When using real world data it is important to make sure that the data is licensed in a way that is appropriate for your intended use.  For example the CIA World Factbook data is licensed in the "public domain" which allows you to use the data any way you want.  You could even package the CIA data in an application for a phone and sell that application on the app store.  If you search you will see there is more than one!  Another data set called the Twitter US Airline Sentiment data set is used in several different data science textbooks and is licensed using the Creative Commons `CC-BY-NC-SA <https://creativecommons.org/licenses/by-nc-sa/4.0/>`_ license.  This license allows you to use the data, share the data and adapt the data for your own purposes as long as you give credit to the original source, share any modifications you make to the data under the same license, and it restricts you from using the data for commercial purposes (make money).  So you could not use the airline tweet data in an app that you charge money for that recommended airlines, or ranked airlines in some way.

Since this textbook is open source and we are not charging you to use the book, and the book is intended for educational purposes, we believe that we are not using the data for commercial purposes.  So although we try to find data sets that are in the public domain, or are `CC-BY <https://creativecommons.org/licenses/by/4.0/>`_ only, many interesting data sets do have the non-commercial restriction.  We will still use those data sets, and we will point out their restrictions in each chapter as we explore the data.  In some cases we've even gone the extra mile to seek out the publisher of the data set and get explicit permission to use the data.

This book itself is licensed `CC-BY-SA <https://creativecommons.org/licenses/by-sa/4.0/>`_ That means other instructors or authors are free to take this book as a starting point, add new material, change the examples we use if they want, remove material that isn't relevant, as long as they give us credit as the original source, and license their version of the textbook using the CC-BY-SA license.  It also means that this book is freely available for you and anyone else who wants to read it without paying for it.

Copyright laws are complicated, and I am not a lawyer, so please don't take anything I've just written as legal advice!  You can learn more about copyright law and the creative commons work to help simplify the law on the `creative commons website <https://creativecommons.org/>`_

How to use this Book
--------------------

This book is designed to be used in conjunction with external tools like Google Sheets and Jupyter Notebooks.  You will need to move back and forth between browser tabs as you work with the tools and follow the instructions in the book.  You will be asked to answer the questions in the book as you read.  This is to encourage you to type in the code we have provided and experiment with it.  Learning computer science or data science is not a spectator sport.  Many students make the mistake of thinking that they can just read about it and understand it.  You really have to do it in order to understand it.  So don't fool yourself, and don't guess at the answers to the questions in the book.

Everything you learn in this class builds on and reinforces the things you have learned previously. If you do fall behind, make sure you talk to your instructor so you can develop a strategy for catching up.



.. |CCBYANC| image:: https://static1.squarespace.com/static/5150aec6e4b0e340ec52710a/t/524d6fb7e4b0b5e2e08118c4/1380806583508/88x31.png?format=300w

