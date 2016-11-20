import THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

import LightDescriptorBase from './LightDescriptorBase';

class HemisphereLightDescriptor extends LightDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    this.hasColor('skyColor');
    this.hasColor('groundColor');

    this.hasProp('intensity', {
      type: PropTypes.number,
      simple: true,
      default: 1,
    });
  }

  construct(props) {
    const {
      skyColor,
      groundColor,
      intensity,
    } = props;

    return new THREE.HemisphereLight(skyColor, groundColor, intensity);
  }
}

module.exports = HemisphereLightDescriptor;
