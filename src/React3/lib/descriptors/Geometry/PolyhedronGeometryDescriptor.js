import THREE from 'three';
import PolyhedronGeometryDescriptorBase from './PolyhedronGeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class PolyhedronGeometryDescriptor extends PolyhedronGeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.propTypes = {
      ...this.propTypes,

      vertices: PropTypes.arrayOf(PropTypes.number).isRequired,
      indices: PropTypes.arrayOf(PropTypes.number).isRequired,
    };
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
