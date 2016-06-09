import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { nomargin } from './_utils';

const stories = storiesOf('Examples - advanced', module)
  .addDecorator(nomargin);

// ---

stories.add('Without react-dom', function () {
  return <div>todo</div>;
});

stories.add('Manual rendering', function () {
  return <div>todo</div>;
});
