import * as d3 from 'd3';

class Settings {
  constructor(container) {
    this.container = d3.select(container);

    this.nInput = this.container.append('input');
  }
}

export default Settings;
