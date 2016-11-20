import * as THREE from 'three';
import PolyhedronGeometryDescriptorBase from './PolyhedronGeometryDescriptorBase';

class OctahedronGeometryDescriptor extends PolyhedronGeometryDescriptorBase {
  construct(props) {
    const {
      radius,
      detail,
      } = props;

    return new THREE.OctahedronGeometry(radius, detail);
  }
}

module.exports = OctahedronGeometryDescriptor;
