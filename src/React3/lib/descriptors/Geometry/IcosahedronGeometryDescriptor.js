import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

class IcosahedronGeometryDescriptor extends GeometryDescriptorBase {
  construct(props) {
    const {
      radius,
      detail,
      } = props;

    return new THREE.IcosahedronGeometry(radius, detail);
  }
}

export default IcosahedronGeometryDescriptor;
