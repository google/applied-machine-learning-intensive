.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.

.. _pivot_tables:

Pivot Tables [READY FOR REVIEW] {#pivot-tables-[ready-for-review]}
==================================================================

Tables that show the average or total for different groups are often
very helpful. Suppose some coworkers at a local company aren’t sure if
`the hours for which they are each scheduled have been assigned
fairly
<https://drive.google.com/open?id=1XnI8Z8UZJxzHeUAly7Qj2I5i1ZCxIs13YR72LcXYQjc>`__.
A table showing each employee, the hours they had been assigned and how
often they opened or closed the business could be used to see if there
were big differences in assignments, and decide if those assignments
were fair.

.. raw:: html

   <p id="gdcalert55" ><span style="color: red; font-weight: bold">>>>>>
gd2md-html alert: inline image link here (to images/Module-B49.png). Store image
on your image server and adjust path/filename if necessary. </span><br>(<a
href="#">Back to top</a>)(<a href="#gdcalert56">Next alert</a>)<br><span
style="color: red; font-weight: bold">>>>>> </span></p>

|alt_text|

You could use AVERAGEIF, SUMIF and COUNTIF to make the table, but sheets
has a built in tool called a pivot table that automates this process
without having to type out all the formulas. Start by selecting the data
you’d like to use. Then navigate to the “Data” menu, and select “Pivot
table”. You can place the new pivot table in a new sheet or an existing
sheet.

Video of constructing a pivot table.

The pivot table editor, which opens on the right, has sections for
adding rows, columns, values, and filters.

-  Adding variables to **rows** or **columns** creates groupings based
   on that variable, displayed either as rows or columns of the pivot
   table. For example, when you select “Name” as a variable under rows,
   the pivot table will have one row for each of the employees at the
   company.
-  Adding a variable to **values** populates the cells of the table.

   -  If you want the total number of hours each employee at the company
      was assigned, select the value “Hours” and summarize by sum. This
      will add the total number of hours each employee was assigned to
      the table.
   -  If you want the total number of opening shifts each employee at
      the company was assigned, select the value “Opening Shift” and
      summarize by count. This will add the number of opening shifts
      each employee was assigned to the table as an additional column.
      Repeating this process with “Closing Shift” will add a column
      showing the number of closing shifts for each employee.

-  Adding a variable to **filters** subsets the data before the pivot
   table is constructed. For example, a filter can be added on the
   “Date” variable for only the days July 4 - July 6. The resulting
   pivot table would have the total hours, opening and closing shift for
   only those three days.

.. raw:: html

   <p id="gdcalert56" ><span style="color: red; font-weight: bold">>>>>>
gd2md-html alert: inline image link here (to images/Module-B50.png). Store image
on your image server and adjust path/filename if necessary. </span><br>(<a
href="#">Back to top</a>)(<a href="#gdcalert57">Next alert</a>)<br><span
style="color: red; font-weight: bold">>>>>> </span></p>

|alt_text|

Question: Who was assigned the most opening shifts?

::

   A: Jan Myers

Question: Who was assigned the smallest number of hours?

::

   A: Harlan Guthrie

Question: What evidence from the table would support the employees’
claim that the assignments have not been assigned fairly?

A: Free response

Within a pivot table, double clicking on any value in the table will
create a new sheet with the subset of data from that entry in the table.
For example, double clicking on the value 4 in cell C4 in the table
above creates the following sheet. You can use this subset to look at
Jan’s assignments, and ask or answer questions about Jan specifically.
This is also a great way to investigate interesting values or patterns
in a pivot table.

Video - getting subset from pivot table

.. raw:: html

   <p id="gdcalert57" ><span style="color: red; font-weight: bold">>>>>>
gd2md-html alert: inline image link here (to images/Module-B51.png). Store image
on your image server and adjust path/filename if necessary. </span><br>(<a
href="#">Back to top</a>)(<a href="#gdcalert58">Next alert</a>)<br><span
style="color: red; font-weight: bold">>>>>> </span></p>

|alt_text|

Example: National Center for Health Statistics
----------------------------------------------

For this example, consider a non-profit organization that works to
improve the life expectancy of Americans. You have access to data from
The National Center for Health Statistics (NCHS) is a branch of the
Center for Disease Control, which provides statistical information about
the health of American people. `The dataset below presents the number of
deaths for the ten leading causes of death in the USA for each state
beginning in
1999.
<https://drive.google.com/open?id=1-_73K_54Q7Sil-ErcRGRz2Y7GJ8Aimrcd26xqY44s4Q>`__

.. raw:: html

   <p id="gdcalert58" ><span style="color: red; font-weight: bold">>>>>>
gd2md-html alert: inline image link here (to images/Module-B52.png). Store image
on your image server and adjust path/filename if necessary. </span><br>(<a
href="#">Back to top</a>)(<a href="#gdcalert59">Next alert</a>)<br><span
style="color: red; font-weight: bold">>>>>> </span></p>

|alt_text|

Question: How many people died from cancer in Nevada in 2007?

::

   Answer: 4331

You are working on a project for your nonprofit to try to find the
leading causes of death in the USA, in order to target possible areas of
improvement for healthcare and death prevention. This can be done given
the NCHS dataset above.

First, construct a pivot table with rows from the variable “Cause Name”.
Then add “Deaths” as a value to the pivot table, and summarize by *SUM*.
(There are many options under summarize. Sum is the most useful for this
context, but average, median, and count are also commonly used
statistics in pivot tables.) Make sure to have “Grand totals” enabled,
so you can see the total number of deaths.

Video of constructing this pivot table and adding percentages.

.. raw:: html

   <p id="gdcalert59" ><span style="color: red; font-weight: bold">>>>>>
gd2md-html alert: inline image link here (to images/Module-B53.png). Store image
on your image server and adjust path/filename if necessary. </span><br>(<a
href="#">Back to top</a>)(<a href="#gdcalert60">Next alert</a>)<br><span
style="color: red; font-weight: bold">>>>>> </span></p>

|alt_text|

The cause of death responsible for the most deaths in the USA is heart
disease. But what percentage of deaths is this? To calculate the
percentage, you can add a column next to the pivot table that divides
the deaths for each cause by the grand total. (This is an opportunity to
use absolute references to make your life simpler.) *Link to absolute
reference section here.* This shows that 33.8% (or over one third!) of
deaths in the USA are due to heart disease. This is astonishingly high,
and shows that efforts towards reducing heart disease or ameliorating
symptoms due to heart disease is the highest priority for the nonprofit.

Question: Which cause, out of these top ten, has the smallest share of
deaths?

::

   Answer: Suicide

Question: What percent of the deaths represented in this table are due
to stroke?

::

   Answer: 7.5%

Question: What percentage of the deaths in this dataset do the top two
causes of deaths account for?

::

   Answer: 63 - 64%

In order to present this information to your teammates, it might be
easier to display this information as a chart, rather than a table. A
bar chart, constructed from this pivot table, should make the
information significantly easier to interpret, compared to the raw pivot
table.

Video of bar chart from pivot table.

.. raw:: html

   <p id="gdcalert60" ><span style="color: red; font-weight: bold">>>>>>
gd2md-html alert: inline image link here (to images/Module-B54.png). Store image
on your image server and adjust path/filename if necessary. </span><br>(<a
href="#">Back to top</a>)(<a href="#gdcalert61">Next alert</a>)<br><span
style="color: red; font-weight: bold">>>>>> </span></p>

|alt_text|

This chart makes it visually clear that heart disease and cancer are by
a substantial amount the highest causes of death.

When you present this graph to your teammates, one of them asks how
these percentages have changed over time. To look into this, add the
variable “Year” as a column. (You’ll have to move or delete the
percentage column, or construct a new pivot table.)

Video of two dim pivot table.

.. raw:: html

   <p id="gdcalert61" ><span style="color: red; font-weight: bold">>>>>>
gd2md-html alert: inline image link here (to images/Module-B55.png). Store image
on your image server and adjust path/filename if necessary. </span><br>(<a
href="#">Back to top</a>)(<a href="#gdcalert62">Next alert</a>)<br><span
style="color: red; font-weight: bold">>>>>> </span></p>

|alt_text|

This table is too large to be interpretable. Visualizing this data in a
chart is much more helpful. Select the range A2:S12 (the pivot table
excluding the first and last rows) and then, under the “Insert” menu,
select “Chart”. Sheets automatically selects a line chart for this data,
with “Year” along the horizontal axis and a line for each cause of
death, showing how each has varied over time. \**Line charts display how
one or more quantitative variables change over time. \**To construct a
line chart your dataset must have a time variable. (In this dataset, it
is the “Year” column.)

.. raw:: html

   <p id="gdcalert62" ><span style="color: red; font-weight: bold">>>>>>
gd2md-html alert: inline image link here (to images/Module-B56.png). Store image
on your image server and adjust path/filename if necessary. </span><br>(<a
href="#">Back to top</a>)(<a href="#gdcalert63">Next alert</a>)<br><span
style="color: red; font-weight: bold">>>>>> </span></p>

|alt_text|

This graph is certainly more interpretable than the table, but it’s
still difficult to distinguish the lines towards the bottom. Another
issue is that there are several colors, many of which are hard to
differentiate. Also, if a viewer were colorblind (*link to accessibility
in Module A*), this graph would be essentially unreadable. Before
presenting this to your teammates, you need to address these issues.
Consider reducing the number of causes displayed (perhaps to just the
most “interesting” causes), and changing the colors used.

Question: What causes of death have had increasing percentages from 1999
to 2016?

Question: What causes of death have had decreasing percentages from 1999
to 2016?

It’s difficult to see in the graph above, but deaths due to Alzheimer’s
disease have been steadily increasing. This change is much easier to see
if Alzheimer’s is the only cause of death displayed. Pivot tables allow
for filtering, so you can restrict the table to Alzheimer’s related
deaths only. In the pivot table editor, the last option is “Filter”. Add
a filter to “Cause Name”, and then under the “Filter by values” option,
select only “Alzheimer’s disease”. The pivot table and graph will
automatically update and show only Alzheimer’s deaths.

Question: What is the ratio of Alzheimer’s disease deaths in 2016
compared to 1999?

While the raw number of deaths is significantly greater for heart
disease and cancer, the growth of Alzheimer’s disease deaths is also
very worrying to your nonprofit. Your manager asks you to investigate
why the deaths are on the rise so dramatically, so you investigate that
more in the next section. (LINK)

Filtering also works on other values. For example, you can add an
additional filter to only use data from California. Below are two graphs
for Alzheimer’s deaths: on the left just for California, on the right
for the entire country.

Video of adding Alzheimer’s and CA filter to a pivot table.

.. raw:: html

   <p id="gdcalert63" ><span style="color: red; font-weight: bold">>>>>>
gd2md-html alert: inline image link here (to images/Module-B57.png). Store image
on your image server and adjust path/filename if necessary. </span><br>(<a
href="#">Back to top</a>)(<a href="#gdcalert64">Next alert</a>)<br><span
style="color: red; font-weight: bold">>>>>> </span></p>

|alt_text|

.. raw:: html

   <p id="gdcalert64" ><span style="color: red; font-weight: bold">>>>>>
gd2md-html alert: inline image link here (to images/Module-B58.png). Store image
on your image server and adjust path/filename if necessary. </span><br>(<a
href="#">Back to top</a>)(<a href="#gdcalert65">Next alert</a>)<br><span
style="color: red; font-weight: bold">>>>>> </span></p>

|alt_text|
