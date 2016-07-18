import React from 'react';
import React3 from '../../../';
import THREE from 'three';
import { storiesOf } from '@kadira/storybook';
import { nomargin, Viewer } from './_utils';

import BenchmarkRotatingCubes from './Benchmark/RotatingCubes';
import RotatingCubesDirectUpdates from './Benchmark/RotatingCubesDirectUpdates';

const stories = storiesOf('Examples - benchmark', module)
  .addDecorator(nomargin);

// ---

stories.add('RotatingCubes - Through React', function () {
  const child = (w, h) => <BenchmarkRotatingCubes width={w} height={h} />;
  return <Viewer child={child} />;
});

stories.add('RotatingCubes - Direct Updates', function () {
  const child = (w, h) => <RotatingCubesDirectUpdates width={w} height={h} />;
  return <Viewer child={child} />;
});
