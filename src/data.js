// The target function as well as the point generator are only necessary for artificial scenarios
// In a real world example you would already have the data set
const randomValue = (Math.random() * 2) - 1;
function targetFunction(point, seed = randomValue) {
  console.log(seed);
  if (point.x1 + point.x2 > seed) {
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

export default function generateDataset(N) {
  const data = [];

  for (let i = 0; i < N; i += 1) {
    data.push(generateRandomPoint());
  }

  return data;
}
