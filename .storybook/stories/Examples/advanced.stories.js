import React from 'react';
import React3 from '../../../';
import THREE from 'three';
import { storiesOf } from '@kadira/storybook';
import { nomargin, Viewer } from './_utils';
import ManualRenderingExample from './ManualRendering/index';

const stories = storiesOf('Examples - advanced', module)
  .addDecorator(nomargin);

// ---

stories.add('Manual rendering', function () {
  const child = (w, h) => <ManualRenderingExample width={w} height={h} />;
  return <Viewer child={child} />;
});
