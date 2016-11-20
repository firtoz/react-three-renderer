import * as THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

import LightDescriptorBase from './LightDescriptorBase';

class SpotLightDescriptor extends LightDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    const defaults = [
      1, // intensity
      0, // distance
      Math.PI / 3, // angle
      10, // exponent
      1, // decay
      0, // penumbra
    ];

    [
      'intensity',
      'distance',
      'angle',
      'exponent',
      'decay',
      'penumbra',
    ].forEach((propName, i) => {
      this.hasProp(propName, {
        type: PropTypes.number,
        simple: true,
        default: defaults[i],
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
      default: 50,
    });

    this.hasColor();
    this.hasDirection();
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
