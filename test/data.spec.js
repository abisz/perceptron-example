const test = require('tape');

import { generateDataset } from '../src/data.js';

test('data.js - generateDataset', (assert) => {
  const N = 10;
  const d = generateDataset(N);

  assert.equal(d.length, 10, 'dataset length equal parameter');

  d.forEach((point) => {
    if (point.x1 < -1 || point.x1 > 1 || point.x2 < -1 || point.x2 > 2) {
      assert.true(false, 'point not in range');
    }
  });

  assert.end();
});
