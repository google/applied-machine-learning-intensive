import numpy as np

count = 10000

time = np.linspace(0, count, count)
series = (
  np.sin((time - 0.1461656368573156) * (0.9260740013361775 * 10 + 10)) +
  np.sin((time - 0.3763908388321049) * (0.2301190934334209 * 20 + 20)) +
  np.sin((time - 0.9602823889173964) * (0.3960271197332794 * 30 + 30)) +
  0.1 * (np.random.rand(count) - 0.5)
)

for datapoint in series:
  print(datapoint)
