import Plot from './Components/Plot';

function targetFunction(point) {
  if (point.x1 + point.x2 > 0) {
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

function hypothesis(point, weights) {
  if (weights[0] + (point.x1 * weights[1]) + (point.x2 * weights[2]) > 0) {
    return 1;
  }
  return -1;
}

const plot = new Plot('#plot');
const weights = [Math.random(), Math.random(), Math.random()];

while (data.filter(d => hypothesis(d, weights) !== d.y).length > 0) {
  const mismatches = data.filter(d => hypothesis(d, weights) !== d.y);

  if (mismatches.length !== 0) {
    const randomMismatch = mismatches[Math.floor(Math.random() * mismatches.length)];

    weights[0] += randomMismatch.y;
    weights[1] += (randomMismatch.x1 * randomMismatch.y);
    weights[2] += (randomMismatch.x2 * randomMismatch.y);
  }

  plot.addLine(weights);
  plot.update(data);
}

