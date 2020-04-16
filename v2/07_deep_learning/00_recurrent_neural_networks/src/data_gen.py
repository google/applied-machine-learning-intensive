"""
data_gen.py: Generate data for this unit
"""

import numpy as np
import random

# Let's first create an array containing the price at the end of the day for our fictional stock for
# 10 years. Let's assume every day is a trading day so that we don't have to contend with weekends.
# And let's assume that every year has 365 days, for simplicity.
#
# For now, we'll just set the price at each day at zero.

np.random.seed(1979)

days_per_year = 365
years = 10

ipos = [5.0, 10.0, 7.5, 12, 15]
eod_prices = np.zeros((days_per_year * years, len(ipos)))

# We can now set the price at the IPO (day 0).

for i, ipo in enumerate(ipos):
  eod_prices[0][i] = ipo

# Starting with the IPO, let's fill the remaining prices with random data added to the IPO price with
# a slight positive bias.

min_bias = 0.0001
max_bias = 0.0003

for i in range(1, len(eod_prices)):
  for j in range(len(ipos)):
    # Find yesterday's price.
    yesterdays_price = eod_prices[i-1][j]

    # Generate a random a percentage change on the normal curve.
    percentage_change = np.random.randn(1)[0]

    # The random number is a value on the standard normal distribution
    # with a mean 0 and variance 1. This will give us a nice range of
    # positive and negative values, but we need to divide by 100 to scale
    # them down to reasonable percentages for daily stock price changes.
    percentage_change /= 100

    # And finally we give the change just a little bit of positive bias
    # so that we get a nice growth curve.
    percentage_change += random.uniform(min_bias, max_bias)

    # Calculate the new price.
    todays_price = yesterdays_price + yesterdays_price * percentage_change

    if todays_price < 0.01:
      todays_price = random.uniform(0.01, 0.05)

    # Store the price.
    eod_prices[i][j] = todays_price

print(','.join(['AAA', 'BBB', 'CCC', 'DDD', 'EEE']))
for prices in eod_prices:
  print(','.join([f'{price:.2f}' for price in prices]))

