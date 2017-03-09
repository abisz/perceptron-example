import * as d3 from 'd3';

class Plot {
  constructor(container, opts = {}) {
    this.margin = {
      top: 20,
      bottom: 80,
      left: 60,
      right: 60,
    };
    this.width = opts.width || 1000;
    this.height = opts.height || 600;

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

    this.lines = [];

    this.initAxis();
  }

  update(data) {
    // Scale Setup
    // as long as the target function is bound to -1, 1
    // it doesn't make sense to make the scaling dynamic
    this.xscale.domain([
      // data.map(d => d.x1).reduce((min, x) => Math.min(min, x)),
      -1,
      // data.map(d => d.x1).reduce((max, x) => Math.max(max, x)),
      1,
    ]);

    this.yscale.domain([
      // data.map(d => d.x2).reduce((min, x) => Math.min(min, x)),
      -1,
      // data.map(d => d.x2).reduce((max, x) => Math.max(max, x)),
      1,
    ]);

    // Data Points
    const points = this.g.selectAll('.point')
      .data(data);

    const pointsEntered = points.enter()
      .append('circle');

    points.merge(pointsEntered)
      .attr('class', 'point')
      .attr('cx', d => this.xscale(d.x1))
      .attr('cy', d => this.yscale(d.x2))
      .attr('r', 5)
      .attr('fill', (d) => {
        const color = d.y > 0 ? 'red' : 'blue';
        return color;
      });

    points.exit().remove();

    // Lines
    let lines;
    if (this.finalLine) {
      lines = this.g.selectAll('.line')
        .data([this.finalLine]);

      const linesEntered = lines.enter()
        .append('line');

      lines.merge(linesEntered)
        .attr('class', 'line')
        .attr('x1', d => this.xscale(d.a.x))
        .attr('y1', d => this.yscale(d.a.y))
        .attr('x2', d => this.xscale(d.b.x))
        .attr('y2', d => this.yscale(d.b.y))
        .attr('stroke-width', 1)
        .attr('stroke', 'green');
    } else {
      lines = this.g.selectAll('.line')
        .data(this.lines);

      const linesEntered = lines.enter()
        .append('line');

      lines.merge(linesEntered)
        .attr('class', 'line')
        .attr('x1', d => this.xscale(d.a.x))
        .attr('y1', d => this.yscale(d.a.y))
        .attr('x2', d => this.xscale(d.b.x))
        .attr('y2', d => this.yscale(d.b.y))
        .attr('stroke-width', 1)
        .attr('stroke', 'black');
    }

    lines.exit().remove();

    // Axis
    const xAxis = d3.axisBottom(this.xscale);
    const yAxis = d3.axisLeft(this.yscale);

    this.xAxis.selectAll('.axis--x')
      .call(xAxis);

    this.yAxis.selectAll('.axis--y')
      .call(yAxis);
  }

  initAxis() {
    this.xAxis = this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(this.xscale));

    this.yAxis = this.g.append('g')
      .attr('class', 'axis axis--y')
      .attr('transform', 'translate(0, 0)')
      .call(d3.axisLeft(this.yscale));
  }

  addLine(weights, final = false) {
    const k = -(weights[1] / weights[2]);
    const d = -(weights[0] / weights[2]);
    const a = { x: -1, y: d - k };
    const b = { x: 1, y: d + k };
    if (final) this.finalLine = { a, b };
    else this.lines.push({ a, b });
  }
}

export default Plot;
