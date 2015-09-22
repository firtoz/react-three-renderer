import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

class RingGeometryDescriptor extends GeometryDescriptorBase {
  construct(props) {
    const {
      innerRadius,
      outerRadius,
      thetaSegments,
      phiSegments,
      thetaStart,
      thetaLength,
      } = props;

    return new THREE.RingGeometry(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength);
  }
}

export default RingGeometryDescriptor;
