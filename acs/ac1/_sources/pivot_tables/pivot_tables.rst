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
