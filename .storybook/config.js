import { configure } from '@kadira/storybook';

configure(function () {
  require('./stories/Examples/webgl.stories.js');
  require('./stories/Examples/advanced.stories.js');
  require('./stories/Examples/benchmark.stories.js');
}, module);
