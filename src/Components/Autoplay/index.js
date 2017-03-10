import * as d3 from 'd3';

class Autoplay {
  constructor(container, initState, callback) {
    this.cb = callback;

    this.container = d3.select(container);

    this.resetButton = this.container.append('button')
      .attr('class', 'button button-reset')
      .text('↺')
      .on('click', () => {
        this.state.reload = true;
        this.stateChange();
      });

    this.playButton = this.container.append('button')
      .attr('class', 'button button-play')
      .on('click', () => {
        this.state.playing = !this.state.playing;
        this.stateChange();
      });

    this.nextButton = this.container.append('button')
      .attr('class', 'button button-next')
      .text('>')
      .on('click', () => {
        this.state.next = true;
        this.stateChange();
      });

    // State
    this.state = initState;

    // Init
    this.update(this.state);
  }

  update(state) {
    this.playButton.text(state.playing ? '⏸' : '▶');
  }

  stateChange() {
    this.cb(this.state);
    this.update(this.state);

    this.state.next = false;
    this.state.reload = false;
  }
}

export default Autoplay;
