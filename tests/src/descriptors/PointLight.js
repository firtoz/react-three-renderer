import React from 'react';
import ReactDOM from 'react-dom';

import chai from 'chai';
const { expect } = chai;

module.exports = type => {
  describe('PointLightDescriptor', () => {
    const { testDiv, React3, mockConsole, requireHelper } = require('../utils/initContainer')(type);

    const PointLightDescriptor = requireHelper('descriptors/Light/PointLightDescriptor');
    const LightDescriptorBase = requireHelper('descriptors/Light/LightDescriptorBase');

    class TestComponent extends React.Component {
      static propTypes = {
        done: React.PropTypes.func,
        lightProps: React.PropTypes.any,
        expectedCameraNear: React.PropTypes.number,
        expectedCameraFar: React.PropTypes.number,

        expectedCameraFov: React.PropTypes.number,
        expectedCameraAspect: React.PropTypes.number,

        expectedShadowBias: React.PropTypes.number,
      };

      static defaultProps = {
        expectedCameraNear: LightDescriptorBase.defaultShadowCameraNear,
        expectedCameraFar: LightDescriptorBase.defaultShadowCameraFar,

        expectedCameraFov: PointLightDescriptor.defaultShadowCameraFov,
        expectedCameraAspect: PointLightDescriptor.defaultShadowCameraAspect,

        expectedShadowBias: LightDescriptorBase.defaultShadowBias,
      };

      componentDidMount() {
        const {
          pointLight,
        } = this.refs;

        const {
          expectedCameraNear,
          expectedCameraFar,

          expectedCameraFov,
          expectedCameraAspect,
          expectedShadowBias,
        } = this.props;

        expect(pointLight.shadow.bias).to.be.equal(expectedShadowBias);

        expect(pointLight.shadow.camera.near).to.be.equal(expectedCameraNear);
        expect(pointLight.shadow.camera.far).to.be.equal(expectedCameraFar);

        expect(pointLight.shadow.camera.fov).to.be.equal(expectedCameraFov);
        expect(pointLight.shadow.camera.aspect).to.be.equal(expectedCameraAspect);

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
            <pointLight
              ref="pointLight"
              {...lightProps}
            />
          </scene>
        </React3>);
      }
    }

    it('Should have correct default values for shadow camera', (done) => {
      mockConsole.expect('THREE.WebGLRenderer	74');

      ReactDOM.render((<TestComponent
        done={done}
        lightProps={{}}
      />), testDiv);
    });

    it('Should assign correct values for shadow camera', (done) => {
      mockConsole.expect('THREE.WebGLRenderer	74');

      ReactDOM.render((<TestComponent
        done={done}
        expectedCameraFov={300}
        expectedCameraAspect={400}
        expectedCameraNear={7}
        expectedCameraFar={8}
        expectedShadowBias={1}
        lightProps={{
          shadowCameraFov: 300,
          shadowCameraAspect: 400,

          shadowCameraNear: 7,
          shadowCameraFar: 8,

          shadowBias: 1,
        }}
      />), testDiv);
    });
  });
};
