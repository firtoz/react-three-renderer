import 'source-map-support/browser-source-map-support';
import chai from 'chai';
import dirtyChai from 'dirty-chai';

if (process.env.KARMA_TDD) {
  sourceMapSupport.install({ // eslint-disable-line no-undef
    handleUncaughtExceptions: false,
  });
}

chai.use(dirtyChai);

module.exports = (type) => {
  describe(`${type}/React3`, () => {
    require('./core/React3/React3Mounts')(type);
  });

  describe(`${type}/React3/ManualRendering`, () => {
    require('./core/Warnings/ManualRendering')(type);
  });

  describe(`${type}/React3/Updates`, () => {
    require('./core/React3/Updates')(type);
  });

  describe(`${type}/React3/CompositeComponents`, () => {
    require('./core/React3/CompositeComponents')(type);
  });

  describe(`${type}/React3/Context`, () => {
    require('./core/React3/Context')(type);
  });

  describe(`${type}/Warnings`, () => {
    require('./core/Warnings/PropTypes')(type);
  });

  describe(`${type}/Descriptors`, () => {
    require('./descriptors/index')(type);
  });
};
