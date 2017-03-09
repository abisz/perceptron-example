const test = require('tape');
const jsdom = require('jsdom');

import Plot from '../src/Components/Plot/index.js';

test('plot does the expected initialization steps', (assert) => {
  assert.plan(13);

  jsdom.env('<div id="plot" />', (err, window) => {
    global.document = window.document;

    const plot = new Plot('#plot');

    assert.deepEqual(plot.margin, {
      top: 20,
      bottom: 80,
      left: 60,
      right: 60,
    });

    assert.equal(plot.width, 1000);
    assert.equal(plot.height, 600);

    assert.deepEqual(plot.svg, {
      _groups: [[document.getElementById('plot').children[0]]],
      _parents: [document.documentElement],
    });
    assert.equal(plot.svg.attr('width'), '1120');
    assert.equal(plot.svg.attr('height'), '700');

    assert.deepEqual(plot.g, {
      _groups: [[document.getElementById('plot').children[0].children[0]]],
      _parents: [document.documentElement],
    });
    assert.equal(plot.g.attr('transform'), 'translate(60, 20)');

    assert.ok(plot.xscale);
    assert.ok(plot.yscale);

    assert.deepEqual(plot.lines, []);

    assert.deepEqual(plot.xAxis, {
      _groups: [[document.getElementsByClassName('axis--x')[0]]],
      _parents: [document.documentElement],
    });
    assert.deepEqual(plot.yAxis, {
      _groups: [[document.getElementsByClassName('axis--y')[0]]],
      _parents: [document.documentElement],
    });
  });
});
