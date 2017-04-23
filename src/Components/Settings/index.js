import * as d3 from 'd3';

class Settings {
  constructor(container, init, onchange) {
    this.container = d3.select(container)
      .attr('class', 'settings-container');

    this.container.append('h3')
      .text('Settings');

    // nInput
    this.nInput = this.container.append('div')
      .attr('class', 'input');

    // nInput Label
    this.nInput.append('label')
      .attr('for', 'input-n')
      .text('Number of data points:');

    // nInput
    this.nInput.append('input')
      .attr('id', 'input-n')
      .attr('type', 'number')
      .attr('value', init)
      .on('change', () => onchange(d3.event.target.valueAsNumber));
  }
}

export default Settings;
