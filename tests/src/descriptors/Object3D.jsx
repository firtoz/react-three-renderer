import React from 'react';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import chai from 'chai';

module.exports = (type) => {
  const { expect } = chai;

  describe('Object3DDescriptor', () => {
    const { testDiv, React3, mockConsole } = require('../utils/initContainer')(type);

    it('should give warnings when matrix property is used with other incompatible properties', () => {
      const objectRef = sinon.spy();

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
      >
        <scene>
          <object3D
            ref={objectRef}

            matrix={new THREE.Matrix4()}
            position={new THREE.Vector3()}
          />
        </scene>
      </React3>), testDiv);

      mockConsole.expectDev('Warning: The Object3D should not have a \'position\' property' +
        ' if it has a \'matrix\' property.');
      mockConsole.expectThreeLog();
    });

    it('should update using the matrix property', () => {
      const objectRef = sinon.spy();

      const matrix = new THREE.Matrix4();

      const wantedRotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 90, 180));
      matrix.compose(
        new THREE.Vector3(0, 1, 2),
        wantedRotation,
        new THREE.Vector3(3, 4, 5),
      );

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
      >
        <scene>
          <object3D
            ref={objectRef}

            matrix={matrix}
          />
        </scene>
      </React3>), testDiv);

      mockConsole.expectThreeLog();

      const threeObject = objectRef.lastCall.args[0];

      const extractedPosition = new THREE.Vector3();
      const extractedRotation = new THREE.Quaternion();
      const extractedScale = new THREE.Vector3();

      threeObject.matrix.decompose(extractedPosition, extractedRotation, extractedScale);

      const twoDP = x => Math.round(x * 100) / 100;

      function compareQuaternions(expected, actual) {
        const expectedForward = new THREE.Vector3(0, 0, 1).applyQuaternion(expected);
        const expectedUp = new THREE.Vector3(0, 1, 0).applyQuaternion(expected);
        const expectedRight = new THREE.Vector3(1, 0, 0).applyQuaternion(expected);

        const actualForward = new THREE.Vector3(0, 0, 1).applyQuaternion(actual);
        const actualUp = new THREE.Vector3(0, 1, 0).applyQuaternion(actual);
        const actualRight = new THREE.Vector3(1, 0, 0).applyQuaternion(actual);

        expect(actualForward.toArray().map(twoDP))
          .to.deep.equal(expectedForward.toArray().map(twoDP));
        expect(actualUp.toArray().map(twoDP))
          .to.deep.equal(expectedUp.toArray().map(twoDP));
        expect(actualRight.toArray().map(twoDP))
          .to.deep.equal(expectedRight.toArray().map(twoDP));
      }

      expect(extractedPosition.toArray()).to.deep.equal([0, 1, 2]);
      compareQuaternions(wantedRotation, extractedRotation);
      expect(extractedScale.toArray().map(twoDP)).to.deep.equal([3, 4, 5].map(twoDP));

      wantedRotation.setFromEuler(new THREE.Euler(90, 180, 270));

      matrix.compose(
        new THREE.Vector3(6, 7, 8),
        wantedRotation,
        new THREE.Vector3(9, 10, 11),
      );

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
      >
        <scene>
          <object3D
            ref={objectRef}

            matrix={new THREE.Matrix4().copy(matrix)}
          />
        </scene>
      </React3>), testDiv);

      threeObject.matrix.decompose(extractedPosition, extractedRotation, extractedScale);

      expect(extractedPosition.toArray()).to.deep.equal([6, 7, 8]);
      compareQuaternions(wantedRotation, extractedRotation);
      expect(extractedScale.toArray().map(twoDP)).to.deep.equal([9, 10, 11].map(twoDP));
    });
  });
};

