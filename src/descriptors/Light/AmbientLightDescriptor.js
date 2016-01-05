import THREE from 'three.js';
import LightDescriptorBase from './LightDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class AmbientLightDescriptor extends LightDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    this.hasColor();
  }

  construct(props) {
    const {
      color,
      } = props;

    return new THREE.AmbientLight(color);
  }
}

module.exports = AmbientLightDescriptor;
