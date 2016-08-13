import THREE from 'three';

import LightDescriptorBase from './LightDescriptorBase';

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
