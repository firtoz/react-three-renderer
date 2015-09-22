import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

class TetrahedronGeometryDescriptor extends GeometryDescriptorBase {
  construct(props) {
    const {
      radius,
      detail,
      } = props;

    return new THREE.TetrahedronGeometry(radius, detail);
  }
}

export default TetrahedronGeometryDescriptor;
