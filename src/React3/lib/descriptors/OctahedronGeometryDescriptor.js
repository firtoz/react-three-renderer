import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

class OctahedronGeometryDescriptor extends GeometryDescriptorBase {
  construct(props) {
    const {
      radius,
      detail,
      } = props;

    return new THREE.OctahedronGeometry(radius, detail);
  }
}

export default OctahedronGeometryDescriptor;
