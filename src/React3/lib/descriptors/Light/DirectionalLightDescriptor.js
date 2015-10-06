import THREE from 'three';
import LightDescriptorBase from './LightDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class DirectionalLightDescriptor extends LightDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    this.registerSimpleProperties([
      'intensity',
      'shadowMapWidth',
      'shadowMapHeight',
      'shadowCameraLeft',
      'shadowCameraRight',
      'shadowCameraTop',
      'shadowCameraBottom',
      'shadowCameraNear',
      'shadowCameraFar',
      'shadowBias',
      'shadowDarkness',
      'shadowCameraVisible',
      'onlyShadow',
    ]);

    this.propTypes = {
      ...this.propTypes,

      intensity: PropTypes.number,
      shadowMapWidth: PropTypes.number,
      shadowMapHeight: PropTypes.number,
      shadowCameraLeft: PropTypes.number,
      shadowCameraRight: PropTypes.number,
      shadowCameraTop: PropTypes.number,
      shadowCameraBottom: PropTypes.number,
      shadowCameraNear: PropTypes.number,
      shadowCameraFar: PropTypes.number,
      shadowBias: PropTypes.number,
      shadowDarkness: PropTypes.number,
      shadowCameraVisible: PropTypes.bool,
    };

    this.hasColor();

    this.hasProp('castShadow', {
      override: true,
      type: PropTypes.bool,
      update(threeObject, castShadow) {
        threeObject.userData.react3internalComponent._wantsReplace = true;
      },
      default: undefined,
    })
  }

  construct(props) {
    const color = props.color;
    const intensity = props.intensity;

    return new THREE.DirectionalLight(color, intensity);
  }
}

export default DirectionalLightDescriptor;
