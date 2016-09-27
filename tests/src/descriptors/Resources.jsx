import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';

const { expect } = chai;

module.exports = type => {
  describe('ResourcesDescriptor', () => {
    const { testDiv, React3, mockConsole } = require('../utils/initContainer')(type);

    it('should give warnings for items with resourceId properties outside resources', () => {
      mockConsole.expectDev('Warning: Found <meshBasicMaterial> with a resourceId property, ' +
        'but it was not placed within a <resources/> element.');
      mockConsole.expectThreeLog();

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
      >
        <scene>
          <mesh>
            <meshBasicMaterial
              color={0xff0000}
              resourceId="one"
            />
            <boxGeometry
              width={2}
              height={2}
              depth={2}
            />
          </mesh>
        </scene>
      </React3>), testDiv);
    });

    it('should give warnings for items ' +
      'without resourceId properties inside resources', () => {
      let errorMessage;

      if (process.env.NODE_ENV !== 'production') {
        errorMessage = 'Resource container can only hold resources.' +
          ' Found children without `resourceId` properties:' +
          ' <meshBasicMaterial/>, <meshPhongMaterial/>.';
      } else {
        errorMessage = 'Minified exception occurred; use the non-minified' +
          ' dev environment for the full error message and additional' +
          ' helpful warnings.';
      }

      expect(() => {
        ReactDOM.render((<React3
          width={800}
          height={600}
          mainCamera="mainCamera"
        >
          <resources>
            <meshBasicMaterial
              color={0xff0000}
            />
            <boxGeometry
              width={2}
              height={2}
              depth={2}
              resourceId="box"
            />
            <meshPhongMaterial
              color={0xff0000}
            />
          </resources>
        </React3>), testDiv);
      }).to.throw(errorMessage);
    });
  });
};
