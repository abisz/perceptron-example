import Plot from './Components/Plot';
import Slider from './Components/Slider';
import Autoplay from './Components/Autoplay';

import generateDataset from './data';

const N = 100;
const data = generateDataset(N);

// Here is where the PLA starts
function hypothesis(point, weights) {
  if (weights[0] + (point.x1 * weights[1]) + (point.x2 * weights[2]) > 0) {
    return 1;
  }
  return -1;
}

const weights = [Math.random(), Math.random(), Math.random()];
let delay = 500;
let playing = false;

const plot = new Plot('#plot');

function iterate() {
  const mismatches = data.filter(d => hypothesis(d, weights) !== d.y);

  if (mismatches.length !== 0) {
    const randomMismatch = mismatches[Math.floor(Math.random() * mismatches.length)];

    weights[0] += randomMismatch.y;
    weights[1] += (randomMismatch.x1 * randomMismatch.y);
    weights[2] += (randomMismatch.x2 * randomMismatch.y);
  }

  if (data.filter(d => hypothesis(d, weights) !== d.y).length === 0) {
    plot.addLine(weights, true);
    plot.update(data);
  } else if (playing) {
    plot.addLine(weights);
    plot.update(data);
    setTimeout(iterate, delay);
  }
}

// UI Components
/* eslint-disable no-unused-vars */
const sliderDelay = new Slider('#slider-delay', 0, 1000, delay, (newValue) => {
  delay = newValue;
});
const autoplay = new Autoplay('#autoplay', { playing }, (state) => {
  playing = state.playing;
  if (playing) iterate();
});
/* eslint-enable no-unused-vars */

// Start Learning Process
iterate();
plot.update(data);
