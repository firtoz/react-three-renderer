import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

class TorusGeometryDescriptor extends GeometryDescriptorBase {
  construct(props) {
    const {
      radius,
      tube,
      radialSegments,
      tubularSegments,
      arc,
      } = props;

    return new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc);
  }
}

export default TorusGeometryDescriptor;
