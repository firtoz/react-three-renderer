import 'source-map-support/browser-source-map-support';
import chai from 'chai';
import dirtyChai from 'dirty-chai';

if (process.env.KARMA_TDD) {
  sourceMapSupport.install({ // eslint-disable-line no-undef
    handleUncaughtExceptions: true,
    environment: 'node',
    hookRequire: true,
  });
}

chai.use(dirtyChai);

module.exports = (type) => {
  describe(`${type}`, () => {
    describe('React3', () => {
      require('./core/React3/React3Mounts')(type);

      describe('ManualRendering', () => {
        require('./core/React3/ManualRendering')(type);
      });

      describe('Updates', () => {
        require('./core/React3/Updates')(type);
      });

      describe('CompositeComponents', () => {
        require('./core/React3/CompositeComponents')(type);
      });

      describe('Context', () => {
        require('./core/React3/Context')(type);
      });
    });

    describe('Warnings', () => {
      require('./core/Warnings/PropTypes')(type);
    });

    describe('Descriptors', () => {
      require('./descriptors/index')(type);
    });
  });
};
