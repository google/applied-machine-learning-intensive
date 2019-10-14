.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.

.. _nonlinear_regression:

Non-Linear Regression {#non-linear-regression}
==============================================

Up to this point you’ve only fit straight lines to data, but Sheets can
fit other trendlines to data as well, including exponential, polynomial,
logarithmic and others. You can access these other options from the
chart editor. In “Customize Menu” > “Series”, after checking the
trendline option, you can select “Type”. The dropdown menu gives a
variety of other types of trendlines.

For example, the number of users of a certain popular website grew
dramatically between 2004 and 2010. In this case, the linear trendline
doesn’t fit the exponential growth seen in number of users. An
exponential curve fits this example much better.

.. raw:: html

   <p id="gdcalert45" ><span style="color: red; font-weight: bold">>>>>>
gd2md-html alert: inline image link here (to images/Module-B39.png). Store image
on your image server and adjust path/filename if necessary. </span><br>(<a
href="#">Back to top</a>)(<a href="#gdcalert46">Next alert</a>)<br><span
style="color: red; font-weight: bold">>>>>> </span></p>

|alt_text|

.. raw:: html

   <p id="gdcalert46" ><span style="color: red; font-weight: bold">>>>>>
gd2md-html alert: inline image link here (to images/Module-B40.png). Store image
on your image server and adjust path/filename if necessary. </span><br>(<a
href="#">Back to top</a>)(<a href="#gdcalert47">Next alert</a>)<br><span
style="color: red; font-weight: bold">>>>>> </span></p>

|alt_text|

You should be careful when choosing trendline type. For example, a
polynomial curve can be fit to the latitude and January temperature
data.

.. raw:: html

   <p id="gdcalert47" ><span style="color: red; font-weight: bold">>>>>>
gd2md-html alert: inline image link here (to images/Module-B41.png). Store image
on your image server and adjust path/filename if necessary. </span><br>(<a
href="#">Back to top</a>)(<a href="#gdcalert48">Next alert</a>)<br><span
style="color: red; font-weight: bold">>>>>> </span></p>

|alt_text|

But, in this case, switching to a polynomial curve doesn’t help explain
the relationship between latitude and January temperature because you
already know that the temperature should get *colder* as the latitude of
the city increases, not warmer as the curve indicates. This curve, like
the line of best fit, is sensitive to the outlier of Juneau, which is
much further north than the other cities. Unless the data demonstrates a
clear curve, it’s often better to stick to linear regression.

\**Overfitting \**is when your predictive line or curve fits too closely
to a particular set of data, and may not make reliable predictions for
other data. For example, consider a set of temperature and latitude data
with only five cities. When looking at only these five data points, the
trend seems curved, and this fourth degree polynomial curve fits nicely!

.. raw:: html

   <p id="gdcalert48" ><span style="color: red; font-weight: bold">>>>>>
gd2md-html alert: inline image link here (to images/Module-B42.png). Store image
on your image server and adjust path/filename if necessary. </span><br>(<a
href="#">Back to top</a>)(<a href="#gdcalert49">Next alert</a>)<br><span
style="color: red; font-weight: bold">>>>>> </span></p>

|alt_text|

But as more cities are added in, it becomes apparent that this trendline
doesn’t fit new cities at all. The polynomial curve was overfit to the
data, and a linear regression line would have predicted the other cities
better.

.. raw:: html

   <p id="gdcalert49" ><span style="color: red; font-weight: bold">>>>>>
gd2md-html alert: inline image link here (to images/Module-B43.png). Store image
on your image server and adjust path/filename if necessary. </span><br>(<a
href="#">Back to top</a>)(<a href="#gdcalert50">Next alert</a>)<br><span
style="color: red; font-weight: bold">>>>>> </span></p>

|alt_text|

.. raw:: html

   <p id="gdcalert50" ><span style="color: red; font-weight: bold">>>>>>
gd2md-html alert: inline image link here (to images/Module-B44.png). Store image
on your image server and adjust path/filename if necessary. </span><br>(<a
href="#">Back to top</a>)(<a href="#gdcalert51">Next alert</a>)<br><span
style="color: red; font-weight: bold">>>>>> </span></p>

|alt_text|

The complete set of July temperatures, in red, has a strong, linear
trend. The dataset with only five cities appeared to have a curve
because the number of cities was so small. When you only have a few data
points in your sample, you can always find a polynomial curve that
passes through that small number of points. But these curves often don't
describe the larger collection of numbers any better than a straight
line. Unless you have a good reason to think the data should be curved
(for example, if you have some domain knowledge which predicts a
polynomial relationship), a straight line is the best choice.

In this section you learned:

-  Sheets can be used to find and display the **line of best fit**
   describing the linear relationship between two variables.
-  The line of best fit can be used to make predictions by plugging in
   given values to the equation.
-  Predictions aren’t accurate if you **extrapolate**.
-  The **slope** of the line of best fit quantifies how the variables
   change in relationship to each other.
-  The line of best fit is very sensitive to **outliers** and extreme
   values.
-  The line of best fit doesn’t have to be a straight line. It can be
   exponential, polynomial, or many others. But be careful not to
   **overfit** the trendline, especially with small datasets.
