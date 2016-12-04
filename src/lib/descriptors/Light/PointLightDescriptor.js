import * as THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

import LightDescriptorBase from './LightDescriptorBase';

class PointLightDescriptor extends LightDescriptorBase {
  static defaultShadowCameraFov = 90;
  static defaultShadowCameraAspect = 1;

  constructor(react3Instance) {
    super(react3Instance);

    this.hasColor();

    [
      'intensity',
      'decay',
    ].forEach((propName) => {
      this.hasProp(propName, {
        type: PropTypes.number,
        simple: true,
        default: 1,
      });
    });

    this.hasProp('distance', {
      type: PropTypes.number,
      simple: true,
      default: 0,
    });

    this.hasProp('shadowCameraFov', {
      type: PropTypes.number,
      updateInitial: true,
      update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.camera.fov = value;
        }
      },
      default: PointLightDescriptor.defaultShadowCameraFov,
    });

    this.hasProp('shadowCameraAspect', {
      type: PropTypes.number,
      updateInitial: true,
      update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.camera.aspect = value;
        }
      },
      default: PointLightDescriptor.defaultShadowCameraAspect,
    });

    this.removeProp('lookAt');
    this.removeProp('rotation');
    this.removeProp('quaternion');
  }

  construct(props) {
    const {
      color,
      intensity,
      distance,
      decay,
    } = props;

    return new THREE.PointLight(color, intensity, distance, decay);
  }
}

module.exports = PointLightDescriptor;
