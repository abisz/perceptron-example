import Plot from './Components/Plot';

// The target function as well as the point generator are only necessary for artificial scenarios
// In a real world example you would already have the data set
const targetValue = (Math.random() * 2) - 1;
function targetFunction(point) {
  if (point.x1 + point.x2 > targetValue) {
    return 1;
  }
  return -1;
}

function generateRandomPoint(min = -1, max = 1) {
  const x1 = (Math.random() * (Math.abs(min - max))) + min;
  const x2 = (Math.random() * (Math.abs(min - max))) + min;
  return {
    x1,
    x2,
    y: targetFunction({ x1, x2 }),
  };
}

const N = 100;
const data = [];

for (let i = 0; i < N; i += 1) {
  data.push(generateRandomPoint());
}

// Here is where the PLA starts
function hypothesis(point, weights) {
  if (weights[0] + (point.x1 * weights[1]) + (point.x2 * weights[2]) > 0) {
    return 1;
  }
  return -1;
}

const plot = new Plot('#plot');
const weights = [Math.random(), Math.random(), Math.random()];
const delay = 500;

function iterate() {
  const mismatches = data.filter(d => hypothesis(d, weights) !== d.y);

  if (mismatches.length !== 0) {
    const randomMismatch = mismatches[Math.floor(Math.random() * mismatches.length)];

    weights[0] += randomMismatch.y;
    weights[1] += (randomMismatch.x1 * randomMismatch.y);
    weights[2] += (randomMismatch.x2 * randomMismatch.y);
  }

  plot.addLine(weights);
  plot.update(data);

  if (data.filter(d => hypothesis(d, weights) !== d.y).length > 0) {
    setTimeout(iterate, delay);
  } else {
    plot.addLine(weights, true);
    plot.update(data);
  }
}

iterate();
