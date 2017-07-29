import * as THREE from 'three';
import PolyhedronGeometryDescriptorBase from './PolyhedronGeometryDescriptorBase';

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
