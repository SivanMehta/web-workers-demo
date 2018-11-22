/**
 * Generate an array of a given length using a filler function
 * @param  {Number} n      size of array
 * @param  {Function} filler function that generates data to fill the array
 * @return {Array} array of given spec
 */
function arrayOf(n, filler) {
  return Array(n).fill(0).map(filler);
}

// setup workers for each type of function
const memoized = arrayOf(8, () => new Worker('fibonacci-m.js'));
memoized.forEach(worker => setupWorkers(worker, 'm-fib'));

const naive = arrayOf(8, () => new Worker('fibonacci.js'));
naive.forEach(worker => setupWorkers(worker, 'fib'));

function setupWorkers(worker, target) {
  worker.onmessage = function (e) {
    const node = document.createElement('td');
    node.innerHTML = e.data + ' ms';
    document.getElementById(target).appendChild(node);

    worker.terminate();
  };
}

function fireOff() {
  // Array of 10,000 random numbers from 1 to 10,000
  const randomArray = arrayOf(10000, () => Math.ceil(Math.random() * 10000));
  memoized.forEach(worker => worker.postMessage(randomArray));
  naive.forEach(worker => worker.postMessage(randomArray));
}