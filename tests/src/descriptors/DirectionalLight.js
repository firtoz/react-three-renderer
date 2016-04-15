import React from 'react';
import ReactDOM from 'react-dom';

import chai from 'chai';
const { expect } = chai;

module.exports = type => {
  describe('DirectionalLightDescriptor', () => {
    const { testDiv, React3, mockConsole, requireHelper } = require('../utils/initContainer')(type);

    const DirectionalLightDescriptor = requireHelper('descriptors/Light/' +
      'DirectionalLightDescriptor');
    const LightDescriptorBase = requireHelper('descriptors/Light/LightDescriptorBase');

    class TestComponent extends React.Component {
      static propTypes = {
        done: React.PropTypes.func,
        lightProps: React.PropTypes.any,
        expectedCameraNear: React.PropTypes.number,
        expectedCameraFar: React.PropTypes.number,

        expectedCameraLeft: React.PropTypes.number,
        expectedCameraRight: React.PropTypes.number,
        expectedCameraTop: React.PropTypes.number,
        expectedCameraBottom: React.PropTypes.number,
      };

      static defaultProps = {
        expectedCameraNear: LightDescriptorBase.defaultShadowCameraNear,
        expectedCameraFar: LightDescriptorBase.defaultShadowCameraFar,

        expectedCameraLeft: DirectionalLightDescriptor.defaultShadowCameraLeft,
        expectedCameraRight: DirectionalLightDescriptor.defaultShadowCameraRight,
        expectedCameraTop: DirectionalLightDescriptor.defaultShadowCameraTop,
        expectedCameraBottom: DirectionalLightDescriptor.defaultShadowCameraBottom,
      };

      componentDidMount() {
        const {
          directionalLight,
        } = this.refs;

        const {
          expectedCameraNear,
          expectedCameraFar,

          expectedCameraLeft,
          expectedCameraRight,
          expectedCameraTop,
          expectedCameraBottom,
        } = this.props;

        expect(directionalLight.shadow.camera.near).to.be.equal(expectedCameraNear);
        expect(directionalLight.shadow.camera.far).to.be.equal(expectedCameraFar);

        expect(directionalLight.shadow.camera.left).to.be.equal(expectedCameraLeft);
        expect(directionalLight.shadow.camera.right).to.be.equal(expectedCameraRight);
        expect(directionalLight.shadow.camera.top).to.be.equal(expectedCameraTop);
        expect(directionalLight.shadow.camera.bottom).to.be.equal(expectedCameraBottom);

        this.props.done();
      }

      render() {
        const {
          lightProps,
        } = this.props;

        return (<React3
          width={800}
          height={600}
        >
          <scene>
            <directionalLight
              ref="directionalLight"
              {...lightProps}
            />
          </scene>
        </React3>);
      }
    }

    it('Should have correct default values for shadow camera', (done) => {
      mockConsole.expectThreeLog();

      ReactDOM.render((<TestComponent
        done={done}
        lightProps={{}}
      />), testDiv);
    });

    it('Should assign correct values for shadow camera', (done) => {
      mockConsole.expectThreeLog();

      ReactDOM.render((<TestComponent
        done={done}
        expectedCameraLeft={300}
        expectedCameraRight={400}
        expectedCameraTop={500}
        expectedCameraBottom={600}
        expectedCameraNear={7}
        expectedCameraFar={8}
        lightProps={{
          shadowCameraLeft: 300,
          shadowCameraRight: 400,
          shadowCameraTop: 500,
          shadowCameraBottom: 600,

          shadowCameraNear: 7,
          shadowCameraFar: 8,
        }}
      />), testDiv);
    });
  });
};
