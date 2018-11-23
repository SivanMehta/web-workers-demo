/**
 * Handle input from the main thread
 * @param  {Number[]} options.data list of random numbers
 * @return {Number[]} corresponding list of nth fibonacci number
 */
onmessage = function({ data }) {
  memory = {
    1: 1,
    2: 1
  };

  const start = new Date();
  data.map(fibonacci);
  postMessage(new Date() - start);
}

let memory = {
  1: 1,
  2: 1
};

let greatestYet = 2;

function fibonacci(n) {
  if(n < greatestYet) {
    return memory[n];
  }

  for(let i = greatestYet + 1; i <= n; i ++) {
    memory[i] = memory[i - 1] + memory[i - 2];
  }

  greatestYet = n;
  return memory[n];
}

