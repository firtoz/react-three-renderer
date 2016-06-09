import { configure } from '@kadira/storybook';

configure(function () {
  require('./stories/Examples-webgl');
  require('./stories/Examples-advanced');
  require('./stories/Examples-benchmarks');
}, module);
