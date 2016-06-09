import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { nomargin } from './_utils';

const stories = storiesOf('Examples - benchmarks', module)
  .addDecorator(nomargin);

// ---

stories.add('RotatingCubes - Through React', function () {
  return <div>todo</div>;
});

stories.add('RotatingCubes - Direct Updates', function () {
  return <div>todo</div>;
});
