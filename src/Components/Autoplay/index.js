import * as d3 from 'd3';

class Autoplay {
  constructor(container, initState, callback) {
    this.cb = callback;

    this.container = d3.select(container);

    this.playButton = this.container.append('button')
      .attr('class', 'button button-play')
      .on('click', () => {
        this.state.playing = !this.state.playing;
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
  }
}

export default Autoplay;
