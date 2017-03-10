/* Inspired by https://bl.ocks.org/mbostock/6452972 */

import * as d3 from 'd3';

class Slider {
  constructor(container, opts, onchange) {
    this.width = opts.width || 1000;
    this.height = opts.height || 100;
    this.margin = opts.margin || {
      left: 60,
      right: 60,
    };

    const min = opts.min || 0;
    const max = opts.max || 1000;

    const init = opts.init;
    this.unit = opts.unit || '';

    this.slider = d3.select(container).append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.height / 2})`);

    this.scale = d3.scaleLinear()
      .domain([min, max])
      .range([0, this.width])
      .clamp(true);

    // Slider Track + Drag Event
    this.slider.append('line')
      .attr('class', 'track')
      .attr('x1', this.scale.range()[0])
      .attr('x2', this.scale.range()[1])
    .select(function () { return this.parentNode.appendChild(this.cloneNode(true)); })
      .attr('class', 'track-overlay')
      .call(d3.drag()
        .on('start drag', () => {
          this.handle.attr('cx', this.scale(this.scale.invert(d3.event.x)));
          onchange(this.scale.invert(d3.event.x));
        }),
      );

    // Ticks
    this.slider.insert('g', '.track-overlay')
        .attr('transform', 'translate(0, 20)')
      .selectAll('text')
      .data(this.scale.ticks(10))
      .enter()
      .append('text')
        .attr('class', 'tick')
        .attr('x', this.scale)
        .attr('text-anchor', 'middle')
        .text(d => `${d}${this.unit}`);

    // Handle
    this.handle = this.slider.insert('circle', '.track-overlay')
      .attr('class', 'handle')
      .attr('cx', this.scale(init))
      .attr('r', 9);
  }
}

export default Slider;
