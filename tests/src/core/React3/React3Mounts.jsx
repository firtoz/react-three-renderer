import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';
import sinon from 'sinon';

module.exports = (type) => {
  const { testDiv, React3, mockConsole } = require('../../utils/initContainer')(type);

  const { expect } = chai;

  it('Mounts with prop warnings', () => {
    mockConsole.expectDev('Warning: Failed prop type: ' +
      'The prop `width` is marked as required in `React3`, but its value is `undefined`.\n' +
      '    in React3');
    mockConsole.expectDev('Warning: Failed prop type: ' +
      'The prop `height` is marked as required in `React3`, but its value is `undefined`.\n' +
      '    in React3');

    mockConsole.expectDev('Warning: Failed prop type: ' +
      'The prop `width` is marked as required in `react3`, but its value is `undefined`.\n' +
      '    in react3');
    mockConsole.expectDev('Warning: Failed prop type: ' +
      'The prop `height` is marked as required in `react3`, but its value is `undefined`.\n' +
      '    in react3');

    mockConsole.expectThreeLog();

    ReactDOM.render(<React3 />, testDiv);

    expect(testDiv.firstChild).to.be.an.instanceOf(HTMLCanvasElement);
  });

  it('Mounts without warnings', () => {
    const reactInstanceRef = sinon.spy();
    const canvasRef = sinon.spy();

    ReactDOM.render(<React3
      ref={reactInstanceRef}
      canvasRef={canvasRef}
      width={800}
      height={600}
    />, testDiv);

    mockConsole.expectThreeLog();

    expect(testDiv.firstChild).to.be.an.instanceOf(HTMLCanvasElement);
    const canvas = canvasRef.lastCall.args[0];
    expect(canvas).to.equal(testDiv.firstChild);

    expect(canvas.userData).to.exist();
  });

  it('Can mount multiple times', () => {
    ReactDOM.render(<div>
      <React3
        width={800}
        height={600}
      >
        <scene>
          <object3D />
        </scene>
      </React3>
      <React3
        width={800}
        height={600}
      >
        <scene>
          <group>
            <object3D />
          </group>
        </scene>
      </React3>
    </div>, testDiv);

    // twice, one for each renderer
    mockConsole.expectThreeLog();
    mockConsole.expectThreeLog();

    // add another object into the first scene and remove from the second

    ReactDOM.render(<div>
      <React3
        width={800}
        height={600}
      >
        <scene>
          <object3D />
          <object3D />
        </scene>
      </React3>
      <React3
        width={800}
        height={600}
      >
        <scene>
          <group />
        </scene>
      </React3>
    </div>, testDiv);

    // remove from the first renderer's scene

    ReactDOM.render(<div>
      <React3
        width={800}
        height={600}
      />
      <React3
        width={800}
        height={600}
      >
        <scene>
          <group />
        </scene>
      </React3>
    </div>, testDiv);

    // now remove from the second renderer's scene

    ReactDOM.render(<div>
      <React3
        width={800}
        height={600}
      />
      <React3
        width={800}
        height={600}
      >
        <scene />
      </React3>
    </div>, testDiv);
  });
};
