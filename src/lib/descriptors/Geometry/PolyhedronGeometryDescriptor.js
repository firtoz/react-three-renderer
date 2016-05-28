import THREE from 'three';
import PolyhedronGeometryDescriptorBase from './PolyhedronGeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class PolyhedronGeometryDescriptor extends PolyhedronGeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);


    this.hasProp('vertices', {
      override: true,
      type: PropTypes.arrayOf(PropTypes.number).isRequired,
      update: this.triggerRemount,
      default: undefined,
    });

    this.hasProp('indices', {
      type: PropTypes.arrayOf(PropTypes.number).isRequired,
      update: this.triggerRemount,
      default: undefined,
    });
  }

  construct(props) {
    const {
      vertices,
      indices,
      radius,
      detail,
      } = props;

    return new THREE.PolyhedronGeometry(vertices, indices, radius, detail);
  }
}

module.exports = PolyhedronGeometryDescriptor;
