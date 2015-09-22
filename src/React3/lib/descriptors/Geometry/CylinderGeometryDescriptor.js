import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

class CylinderGeometryDescriptor extends GeometryDescriptorBase {
  construct(props) {
    const {
      radiusTop,
      radiusBottom,
      height,
      radialSegments,
      heightSegments,
      openEnded,
      thetaStart,
      thetaLength,
      } = props;

    return new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);
  }
}

export default CylinderGeometryDescriptor;
