import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

class CircleGeometryDescriptor extends GeometryDescriptorBase {
  construct(props) {
    const {
      radius,
      segments,
      thetaStart,
      thetaLength,
      } = props;

    return new THREE.CircleGeometry(radius, segments, thetaStart, thetaLength);
  }
}

export default CircleGeometryDescriptor;
