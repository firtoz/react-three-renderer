import THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

import LightDescriptorBase from './LightDescriptorBase';

class HemisphereLightDescriptor extends LightDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    this.hasProp('skyColor', {
      type: PropTypes.number,
      simple: true,
      default: 1,
    });
    this.hasProp('groundColor', {
      type: PropTypes.number,
      simple: true,
      default: 1,
    });
    this.hasProp('intensity', {
      type: PropTypes.number,
      simple: true,
      default: 1,
    });

    this.hasColor();
  }

  construct(props) {
    const {
      skyColor,
      groundColor,
      intensity,
    } = props;

    const result = new THREE.HemisphereLight(skyColor, groundColor, intensity);

    result.position.set(0, 0, 0);

    return result;
  }

  unmount(threeObject) {
    super.unmount(threeObject);
  }
}

module.exports = HemisphereLightDescriptor;
