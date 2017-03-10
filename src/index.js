import Plot from './Components/Plot';
import Slider from './Components/Slider';
import Autoplay from './Components/Autoplay';

import { generateDataset, resetRandomValue } from './data';

const N = 100;
let data = generateDataset(N);

// Here is where the PLA starts
function hypothesis(point, weights) {
  if (weights[0] + (point.x1 * weights[1]) + (point.x2 * weights[2]) > 0) {
    return 1;
  }
  return -1;
}

function adjustWeights(weights, mismatch) {
  return [
    weights[0] + mismatch.y,
    weights[1] + (mismatch.x1 * mismatch.y),
    weights[2] + (mismatch.x2 * mismatch.y),
  ];
}

let weights = [Math.random(), Math.random(), Math.random()];
let delay = 500;
let playing = false;

const plot = new Plot('#plot', {
  width: 800,
  height: 480,
  margin: {
    top: 40,
    bottom: 20,
    left: 40,
    right: 20,
  },
});

function iterate() {
  const mismatches = data.filter(d => hypothesis(d, weights) !== d.y);

  if (mismatches.length !== 0) {
    const randomMismatch = mismatches[Math.floor(Math.random() * mismatches.length)];
    weights = adjustWeights(weights, randomMismatch);
  }

  plot.clearHighlight();

  if (data.filter(d => hypothesis(d, weights) !== d.y).length === 0) {
    plot.addLine(weights, true);
    plot.update(data);
  } else if (playing) {
    plot.addLine(weights);
    plot.update(data);
    setTimeout(iterate, delay);
  } else {
    plot.addLine(weights);
    plot.update(data);
  }
}

function manualIterate(mismatch) {
  const mismatches = data.filter(d => hypothesis(d, weights) !== d.y);
  if (!mismatch) {
    const randomMismatch = mismatches[Math.floor(Math.random() * mismatches.length)];
    plot.highlightPoint(randomMismatch);
    plot.update(data);
    return randomMismatch;
  }
  weights = adjustWeights(weights, mismatch);
  plot.addLine(weights);
  plot.update(data);
  return null;
}

function reload() {
  resetRandomValue();
  data = generateDataset(N);
  plot.reset();
  plot.update(data);
  iterate();
}

// UI Components
/* eslint-disable no-unused-vars */
const sliderDelay = new Slider('#slider-delay', {
  min: 0,
  max: 1000,
  init: delay,
  width: 600,
  height: 60,
  unit: 'ms',
}, (newValue) => {
  delay = newValue;
});

let mismatch;
const autoplay = new Autoplay('#autoplay', { playing }, (state) => {
  playing = state.playing;
  if (state.next) mismatch = manualIterate(mismatch);
  if (state.reload) reload();
  if (playing) iterate();
});
/* eslint-enable no-unused-vars */

// Start Learning Process
iterate();
