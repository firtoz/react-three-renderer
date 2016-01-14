import THREE from 'three';
import PolyhedronGeometryDescriptorBase from './PolyhedronGeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class IcosahedronGeometryDescriptor extends PolyhedronGeometryDescriptorBase {
  construct(props) {
    const {
      radius,
      detail,
      } = props;

    return new THREE.IcosahedronGeometry(radius, detail);
  }
}

module.exports = IcosahedronGeometryDescriptor;
