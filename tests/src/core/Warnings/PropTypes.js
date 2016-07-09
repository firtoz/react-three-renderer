import React from 'react';
import THREE from 'three';
import ReactDOM from 'react-dom';

module.exports = type => {
  const { testDiv, React3, mockConsole } = require('../../utils/initContainer')(type);

  it('Shows helpful warnings with correct class names', () => {
    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <scene
        position={new THREE.Vector2()}
        rotation={new THREE.Vector3()}
        quaternion={new THREE.Euler()}

        fog="0xffffff"

        renderOrder="five"
        name={9}
      />
    </React3>, testDiv);

    mockConsole.expect('Warning: Failed propType: Invalid prop `name` of type `number`' +
      ' supplied to `scene`, expected `string`.');
    mockConsole.expect('Warning: Failed propType: Invalid prop `position` of type `THREE.Vector2`' +
      ' supplied to `scene`, expected instance of `THREE.Vector3`.');
    mockConsole.expect('Warning: Failed propType: Invalid prop `rotation` of type `THREE.Vector3`' +
      ' supplied to `scene`, expected instance of `THREE.Euler`.');
    mockConsole.expect('Warning: Failed propType: Invalid prop `quaternion` of type `THREE.Euler`' +
      ' supplied to `scene`, expected instance of `THREE.Quaternion`.');
    mockConsole.expect('Warning: Failed propType: Invalid prop `renderOrder` of type `string`' +
      ' supplied to `scene`, expected `number`.');
    mockConsole.expect('Warning: Failed propType: Invalid prop `fog` of type `String`' +
      ' supplied to `scene`, expected instance of `THREE.Fog`.');

    // should whine but still should work!
    mockConsole.expect('THREE.Euler: .setFromRotationMatrix() given unsupported order: undefined');
    mockConsole.expectThreeLog();
  });

  it('Does not show warnings when proper types are used', () => {
    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <scene
        position={new THREE.Vector3()}
        rotation={new THREE.Euler()}
        quaternion={new THREE.Quaternion()}
      />
    </React3>, testDiv);

    mockConsole.expectThreeLog();
  });
};
