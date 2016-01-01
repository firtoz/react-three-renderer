import THREE from 'three';
import LightDescriptorBase from './LightDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class PointLightDescriptor extends LightDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    this.hasColor();

    [
      'intensity',
      'decay',
    ].forEach(propName => {
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
  }

  construct(props) {
    const {
      color,
      intensity,
      distance,
      decay
      } = props;

    return new THREE.PointLight(color, intensity, distance, decay);
  }
}

export default PointLightDescriptor;
