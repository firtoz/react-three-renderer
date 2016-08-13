import THREE from 'three';
import PropTypes from 'react/lib/ReactPropTypes';

import GeometryDescriptorBase from './GeometryDescriptorBase';

class ParametricGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    [
      'slices',
      'stacks',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number.isRequired,
        update: this.triggerRemount,
        default: undefined,
      });
    });

    this.hasProp('parametricFunction', {
      type: PropTypes.func.isRequired,
      update: this.triggerRemount,
      default: undefined,
    });
  }

  construct(props) {
    const {
      parametricFunction,
      slices,
      stacks,
      } = props;

    return new THREE.ParametricGeometry(parametricFunction, slices, stacks);
  }
}

module.exports = ParametricGeometryDescriptor;
