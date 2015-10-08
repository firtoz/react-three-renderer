import THREE from 'three';
import PolyhedronGeometryDescriptorBase from './PolyhedronGeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class PolyhedronGeometryDescriptor extends PolyhedronGeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    [
      'vertices',
      'indices',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.arrayOf(PropTypes.number).isRequired,
        update: this.remountInsteadOfUpdating,
        default: undefined,
      });
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

export default PolyhedronGeometryDescriptor;
