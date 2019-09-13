
..  Copyright (C)  Google, Runestone Interactive LLC
    This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/4.0/.

Good Data Sources
=================

Reading List
------------

* `Ten Simple Rules for Responsible Big Data Research <https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005399>`_

* `The Tennis Racket <https://www.buzzfeednews.com/article/heidiblake/the-tennis-racket#.aswkbqBxw8>`_  With the followup that unmasks the suspects `Finding the Tennis Suspects <https://medium.com/@rkaplan/finding-the-tennis-suspects-c2d9f198c33d>`_

* `A Lone Data Whiz is Fighting AirBnB -- and Winning <https://www.wired.com/2017/02/a-lone-data-whiz-is-fighting-airbnb-and-winning/>`_


Data Source List
----------------

There are many places on the web where you can find datasets for exploration and analysis.  Here is a list of some sites that have organized data sets into categories or made them searchable in order to help you find datasets that match up with your own interests.

* `Kaggle <https://kaggle.com>`_

* `Google Public Data Explorer <https://www.google.com/publicdata/directory>`_

* `Awesome Public Datasets on github <https://github.com/awesomedata/awesome-public-datasets>`_  This is a public list of public datasets maintained by volunteers on github.  Most of the data is freely available, but some is not so you should check the terms.

* `Data.gov <http://data.gov>`_

* `Registry of Open Data on AWS <https://registry.opendata.aws/>`_

* `Data Commons <https://www.datacommons.org>`_

* `NYC Open Data <https://opendata.cityofnewyork.us/data/>`_

Most data sets are distributed under some kind of license.  The license spells out the terms and conditions under which you are allowed to use the data.  There are lots of different licenses out there.  `This article <https://en.wikipedia.org/wiki/Comparison_of_free_and_open-source_software_licenses>`_ is a nice summary and comparison of many of the commonly used licenses.
Please make sure you check the license for any data set you are going to use.  Nearly all of them are going to be fine for you to use in an educational setting, but its good to get in the habit of understanding the limitations of what you can and cannot do with the data.

One restriction that is important to pay attention to is whether or not you can redistribute the data.  Most data set owners do not want you to redistribute their data.  You should respect that and document a link to the original data, not your own copy of the data. You should always acknowledge the source of your data as part of your documentation.  Many dataset owners even provide you with their preferred way for you to cite a dataset.  This is because much of the data that is available to you for free is the result of some academic research work.   It is important to the career(s) of the researchers that they are given appropriate credit for the work they have done and have published.  It is also just good practice as a member of the scientific community.  Most researchers are keenly interested in what others learn from their data and if you cite it properly it makes it easy for them to learn about your own work.

Even if you clean it up, you should never republish or redistribute the data under a different license than the data was provided to you.


Screen Scraping Considerations
------------------------------

In section :ref:`screenscrape` we take you through the mechanics of screen scraping.  In this section we will look at some of the ethical considerations.

The first thing you should do before you get data from a web site by screen scraping is check their terms and conditions.  If screen scraping is prohibited by their terms then you should definitely move on and look for a different source.  If screen scraping is explicitly allowed then you are good to go, but you are not quite finished with your responsible scraping research.

The next thing to check is the site's `robots.txt` file.  Many sites have these files to tell automated screen scraping programs, like Google's web crawler, about any pages on their site the owners do not want scraped.  Most sites have robots.txt in the top level of their domain.  For example the site `robotstxt.org <http://www.robotstxt.org/robotstxt.html>`_ which is a good resource for learning about the format of the robots.txt file has the following information at the url ``http://www.robotstxt.org/robots.txt``

::

    User-agent: *
    Disallow:

    # too many repeated hits, too quick
    User-agent: litefinder
    Disallow: /

    # Yahoo. too many repeated hits, too quick
    User-agent: Slurp
    Disallow: /

    # too many repeated hits, too quick
    User-agent: Baidu
    Disallow: /

The first line says that in general robots are allowed to read the pages of the website.  However litefindr, Slurp, and Baidu are all asked to move along without reading any of the pages on the site.  You can specify individual pages by disallowing them explicitly.  See the site for details.

**If the site does not explicitly allow or disallow scraping, the best policy is to contact them and ask permission.**  Its way easier to get permission or learn to stay away up front than it is to get a cease and desist letter from corporate lawyers after the fact.

For most academic projects, like class assignments etc.  Sites are happy to help you learn and are happy to share their data.  If your class project turns into an entrepreneurial adventure and you start making money then you better revisit the license and permissions!
