import * as THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

import LightDescriptorBase from './LightDescriptorBase';

class AmbientLightDescriptor extends LightDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    this.hasProp('intensity', {
      type: PropTypes.number,
      simple: true,
      default: 1,
    });

    this.hasColor();
  }

  construct(props) {
    const {
      color,
      intensity,
    } = props;

    return new THREE.AmbientLight(color, intensity);
  }
}

module.exports = AmbientLightDescriptor;
