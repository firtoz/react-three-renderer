import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

class LatheGeometryDescriptor extends GeometryDescriptorBase {
  construct(props) {
    const {
      points,
      segments,
      phiStart,
      phiLength,
      } = props;

    return new THREE.LatheGeometry(points, segments, phiStart, phiLength);
  }
}

export default LatheGeometryDescriptor;
