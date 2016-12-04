import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import chai from 'chai';

import SceneWrapper from '../utils/SceneWrapper';

const { expect } = chai;

module.exports = (type) => {
  describe('HemisphereLight', () => {
    const { testDiv, React3, mockConsole } = require('../utils/initContainer')(type);

    it('Should construct with correct properties', () => {
      mockConsole.expectThreeLog();

      const hemisphereLightRef = sinon.spy();

      ReactDOM.render((<SceneWrapper
        React3={React3}
      >
        <hemisphereLight
          ref={hemisphereLightRef}

          skyColor={0xff0000}
          groundColor={0x00ff00}
          intensity={5}
        />
      </SceneWrapper>), testDiv);

      const hemisphereLight = hemisphereLightRef.lastCall.args[0];

      expect(hemisphereLight.color.getHexString()).to.equal('ff0000');
      expect(hemisphereLight.groundColor.getHexString()).to.equal('00ff00');
      expect(hemisphereLight.intensity).to.equal(5);
    });
  });
};
