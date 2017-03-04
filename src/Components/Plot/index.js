import * as d3 from 'd3';

class Plot {
  constructor(container) {
    this.margin = {
      top: 20,
      bottom: 80,
      left: 60,
      right: 60,
    };
    this.width = 1000;
    this.height = 600;

    this.svg = d3.select(container)
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);

    this.g = this.svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  }

  update(data) {

    const points = this.g.selectAll('.point')
      .data(data);

    const pointsEntered = points.enter()
      .append('circle');

    const pointsUpdate = points.merge(pointsEntered)
      .attr('cx', d => d.x1 * 10)
      .attr('cy', d => d.x2 * 10)
      .attr('r', 5)
      .attr('fill', d => d.y > 0 ? 'red' : 'green');
  }
}

export default Plot;
