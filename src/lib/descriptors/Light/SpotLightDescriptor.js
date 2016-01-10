import THREE from 'three.js';
import LightDescriptorBase from './LightDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class SpotLightDescriptor extends LightDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    const defaults = [
      1,
      0,
      Math.PI / 3,
      10,
      1,
    ];

    [
      'intensity',
      'distance',
      'angle',
      'exponent',
      'decay',
    ].forEach((propName, i) => {
      this.hasProp(propName, {
        type: PropTypes.number,
        simple: true,
        'default': defaults[i],
      });
    });

    this.hasProp('shadowCameraFov', {
      type: PropTypes.number,
      updateInitial: true,
      update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.camera.fov = value;
        }
      },
      'default': 50,
    });

    this.hasColor();
  }

  construct(props) {
    const {
      color,
      intensity,
      distance,
      angle,
      exponent,
      decay,
      } = props;

    return new THREE.SpotLight(color, intensity, distance, angle, exponent, decay);
  }
}

module.exports = SpotLightDescriptor;
