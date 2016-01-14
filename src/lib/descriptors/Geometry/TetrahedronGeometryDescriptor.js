import THREE from 'three';
import PolyhedronGeometryDescriptorBase from './PolyhedronGeometryDescriptorBase';

class TetrahedronGeometryDescriptor extends PolyhedronGeometryDescriptorBase {
  construct(props) {
    const {
      radius,
      detail,
      } = props;

    return new THREE.TetrahedronGeometry(radius, detail);
  }
}

module.exports = TetrahedronGeometryDescriptor;
