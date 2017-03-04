import * as d3 from 'd3';
import Plot from './Components/Plot';

const data = [
  {
    x1: 1,
    x2: 2,
    y: 1
  },
  {
    x1: 0.5,
    x2: 0.5,
    y: -1
  }
];

const plot = new Plot('#plot');

plot.update(data);