/* eslint-disable no-console */
import 'source-map-support/browser-source-map-support';
import chai from 'chai';
import dirtyChai from 'dirty-chai';

import MockConsole from '../utils/MockConsole';

if (process.env.KARMA_TDD) {
  sourceMapSupport.install({ // eslint-disable-line no-undef
    handleUncaughtExceptions: true,
    environment: 'node',
    hookRequire: true,
  });
}

chai.use(dirtyChai);

const { expect } = chai;

const originalConsole = window.console;

afterEach(() => {
  // ensure cleanup after each test
  expect(window.console).to.equal(originalConsole);
});

describe('Mock Console', () => {
  it('should replace window.console', () => {
    const mockConsole = new MockConsole();
    mockConsole.replaceConsole();

    expect(window.console).to.equal(mockConsole);

    mockConsole.revert();
  });

  it('should fail when a message is expected but another is received', () => {
    const mockConsole = new MockConsole();
    mockConsole.replaceConsole();

    expect(() => {
      mockConsole.expect('one');
      console.log('two');
    }).to.throw('AssertionError: Log error, ' +
      'expected message:\n> one\nBut received message:\n> two\n');

    mockConsole.revert();

    mockConsole.replaceConsole();

    expect(() => {
      console.log('two');
      mockConsole.expect('one');
    }).to.throw('AssertionError: Log error, ' +
      'expected message:\n> one\nBut received message:\n> two\n');

    mockConsole.revert();
  });

  it('should fail when a message is expected but is not received', () => {
    expect(() => {
      const mockConsole = new MockConsole();
      mockConsole.replaceConsole();

      mockConsole.expect('one');

      mockConsole.revert();
    }).to.throw('AssertionError: Messages expected but not received:\n0: [LOG]|\'one\'');
  });

  it('should fail when a message is received but is not expected', () => {
    expect(() => {
      const mockConsole = new MockConsole();
      mockConsole.replaceConsole();

      console.log('one');

      mockConsole.revert();
    }).to.throw('AssertionError: Messages received but not expected:\n0: [LOG]|\'one\'');
  });

  it('should fail for console.warn', () => {
    expect(() => {
      const mockConsole = new MockConsole();
      mockConsole.replaceConsole();

      console.warn('one');

      mockConsole.revert();
    }).to.throw('AssertionError: Messages received but not expected:\n0: [WARNING]|\'one\'');
  });

  it('should fail for console.error', () => {
    expect(() => {
      const mockConsole = new MockConsole();
      mockConsole.replaceConsole();

      console.error('one');

      mockConsole.revert();
    }).to.throw('AssertionError: Messages received but not expected:\n0: [ERROR]|\'one\'');
  });

  it('should succeed when expected messages are received', () => {
    const mockConsole = new MockConsole();
    mockConsole.replaceConsole();

    mockConsole.expect('one');
    console.log('one');

    mockConsole.expect('two');
    console.warn('two');

    mockConsole.expect('three');
    console.error('three');

    mockConsole.expect('four', 'five');
    console.error('four', 'five');

    mockConsole.expect('six\tseven');
    console.error('six', 'seven');

    mockConsole.expect('eight', 'nine');
    console.error('eight\tnine');

    mockConsole.expect('ten');
    mockConsole.expect('eleven', 'twelve');
    mockConsole.expect('thirteen');

    console.log('ten');
    console.warn('eleven', 'twelve');
    console.error('thirteen');

    mockConsole.revert();
  });

  it('should succeed when received messages are expected', () => {
    const mockConsole = new MockConsole();
    mockConsole.replaceConsole();

    console.log('one');
    mockConsole.expect('one');

    console.warn('two');
    mockConsole.expect('two');

    console.error('three');
    mockConsole.expect('three');

    console.error('four', 'five');
    mockConsole.expect('four', 'five');

    console.error('six', 'seven');
    mockConsole.expect('six\tseven');

    console.error('eight\tnine');
    mockConsole.expect('eight', 'nine');

    console.log('ten');
    console.warn('eleven', 'twelve');
    console.error('thirteen');

    mockConsole.expect('ten');
    mockConsole.expect('eleven', 'twelve');
    mockConsole.expect('thirteen');

    mockConsole.revert();
  });

  it('should work for delayed logs', (done) => {
    const mockConsole = new MockConsole();
    mockConsole.replaceConsole();

    mockConsole.expect('one');

    setTimeout(() => {
      console.log('one');
    }, 50);

    let emptyCalled = false;
    mockConsole.once('empty', () => {
      emptyCalled = true;
    });

    setTimeout(() => {
      expect(emptyCalled).to.be.true();

      mockConsole.revert();

      done();
    }, 50);
  });

  it('should be reusable', () => {
    const mockConsole = new MockConsole();

    mockConsole.replaceConsole();
    console.log('one');
    mockConsole.expect('one');
    mockConsole.revert();

    // should be ignored
    console.log('two');

    mockConsole.replaceConsole();
    mockConsole.expect('three');
    console.log('three');
    mockConsole.revert();
  });

  it('should ignore messages when requested', () => {
    const mockConsole = new MockConsole();

    mockConsole.replaceConsole();

    mockConsole.expect('one');
    console.log('one');

    console.log('two');

    mockConsole.revert(true);
  });
});

/* eslint-enable no-console */
