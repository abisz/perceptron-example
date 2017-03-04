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

const plot = new Plot('#plot');

const a = {
  x: -1,
  y: 0.2,
};

const b = {
  x: 1,
  y: 0.1,
};

plot.addLine(a, b);

plot.update(data);
