import ReactDOM from 'react-dom';
import chai from 'chai';
import React from 'react';
import MockConsole from './MockConsole';

const { expect } = chai;

let warmedUp = false;

module.exports = (type) => {
  const testDiv = document.createElement('div');

  /* eslint-disable import/no-dynamic-require */
  function requireHelper(path) {
    switch (type) {
      case 'src':
        return require(`../../../src/lib/${path}`);
      case 'lib':
        return require(`../../../lib/${path}`);
      default:
        expect(false, 'Invalid test type');
        break;
    }

    return undefined;
  }

  /* eslint-enable import/no-dynamic-require */

  const React3 = requireHelper('React3');

  if (!warmedUp) {
    console.log('warming up'); // eslint-disable-line no-console

    warmedUp = true;

    const div = document.createElement('div');

    document.body.appendChild(div);

    ReactDOM.render((<React3 width={5} height={5} />), div);

    ReactDOM.unmountComponentAtNode(div);

    document.body.removeChild(div);

    console.log('warmup complete'); // eslint-disable-line no-console
  }

  const mockConsole = new MockConsole();

  mockConsole.expectThreeLog = () => {
    mockConsole.expect('THREE.WebGLRenderer\t86');
  };

  if (process.env.NODE_ENV === 'production') {
    mockConsole.expectDev = function _() {
    };
  } else {
    mockConsole.expectDev = function _(...args) {
      this.expect(...args);
    };
  }

  before(() => {
    document.body.appendChild(testDiv);
  });

  beforeEach(function _() {
    this.test.body = _.toString(); // can now debug failed beforeEach

    mockConsole.replaceConsole();
  });

  afterEach(function _() {
    this.test.body = _.toString(); // can now debug failed afterEach

    ReactDOM.unmountComponentAtNode(testDiv);

    if (this.currentTest.state === 'failed') {
      // there were errors, no need to check more
      mockConsole.revert(true);
    } else {
      mockConsole.revert();
    }
  });

  after(() => {
    document.body.removeChild(testDiv);
  });

  return {
    testDiv,
    React3,
    /**
     * @type {MockConsole}
     */
    mockConsole,
    requireHelper,
  };
};
