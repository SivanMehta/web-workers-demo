/**
 * Handle input from the main thread
 * @param  {Number[]} options.data list of random numbers
 * @return {Number[]} corresponding list of nth fibonacci number
 */
onmessage = function({ data }) {
  const start = new Date();
  const result = data.map(fibonacci);
  postMessage(new Date() - start);
}

function fibonacci(n) {
  const memory = {
    1: 1,
    2: 1
  }

  for(let i = 2; i <= n; i ++) {
    memory[i] = memory[i - 1] + memory[i - 2];
  }

  greatestYet = n;
  return memory[n];
}

