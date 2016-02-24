import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';

module.exports = type => {
  const { testDiv, React3, mockConsole } = require('../../utils/initContainer')(type);

  const { expect } = chai;

  it('Mounts with prop warnings', () => {
    mockConsole.expect('Warning: Failed propType: ' +
      'Required prop `width` was not specified in `React3`.');
    mockConsole.expect('Warning: Failed propType: ' +
      'Required prop `height` was not specified in `React3`.');

    mockConsole.expect('Warning: Failed propType: ' +
      'Required prop `width` was not specified in `react3`.');
    mockConsole.expect('Warning: Failed propType: ' +
      'Required prop `height` was not specified in `react3`.');

    mockConsole.expect('THREE.WebGLRenderer	74');

    ReactDOM.render(<React3/>, testDiv);

    expect(testDiv.firstChild).to.be.an.instanceOf(HTMLCanvasElement);
  });

  it('Mounts without warnings', () => {
    const react3Instance = ReactDOM.render(<React3
      width={800}
      height={600}
    />, testDiv);

    mockConsole.expect('THREE.WebGLRenderer	74');

    expect(testDiv.firstChild).to.be.an.instanceOf(HTMLCanvasElement);
    const canvas = ReactDOM.findDOMNode(react3Instance);
    expect(canvas).to.equal(testDiv.firstChild);

    expect(canvas.userData).to.exist();
  });
};
