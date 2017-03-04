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

    this.xscale = d3.scaleLinear()
      .rangeRound([0, this.width]);

    this.yscale = d3.scaleLinear()
      .rangeRound([this.height, 0]);
  }

  update(data) {
    this.xscale.domain([
      data.map(d => d.x1).reduce((min, x) => Math.min(min, x)),
      data.map(d => d.x1).reduce((max, x) => Math.max(max, x)),
    ]);

    this.yscale.domain([
      data.map(d => d.x2).reduce((min, x) => Math.min(min, x)),
      data.map(d => d.x2).reduce((max, x) => Math.max(max, x)),
    ]);

    const points = this.g.selectAll('.point')
      .data(data);

    const pointsEntered = points.enter()
      .append('circle');

    points.merge(pointsEntered)
      .attr('cx', d => this.xscale(d.x1))
      .attr('cy', d => this.yscale(d.x2))
      .attr('r', 5)
      .attr('fill', (d) => {
        const color = d.y > 0 ? 'red' : 'green';
        return color;
      });

    // Axis
    this.g.append('g')
      // .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(this.xscale));

    this.g.append('g')
      // .attr('class', 'axis axis--y')
      .attr('transform', 'translate(0, 0)')
      .call(d3.axisLeft(this.yscale));
  }
}

export default Plot;
