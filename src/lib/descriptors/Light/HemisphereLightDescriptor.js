import * as THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

import LightDescriptorBase from './LightDescriptorBase';
import propTypeInstanceOf from '../../utils/propTypeInstanceOf';

class HemisphereLightDescriptor extends LightDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    this.hasColor();

    this.hasProp('groundColor', {
      type: PropTypes.oneOfType([
        propTypeInstanceOf(THREE.Color),
        PropTypes.number,
        PropTypes.string,
      ]),
      update(threeObject, newColor) {
        threeObject.groundColor.set(newColor);
      },
      default: 0xcccccc,
    });

    this.hasProp('intensity', {
      type: PropTypes.number,
      simple: true,
      default: 1,
    });
  }

  construct(props) {
    const {
      color,
      groundColor,
      intensity,
    } = props;

    return new THREE.HemisphereLight(color, groundColor, intensity);
  }
}

module.exports = HemisphereLightDescriptor;
