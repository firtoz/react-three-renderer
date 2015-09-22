import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

class TorusKnotGeometryDescriptor extends GeometryDescriptorBase {
  construct(props) {
    const {
      radius,
      tube,
      radialSegments,
      tubularSegments,
      p,
      q,
      heightScale,
      } = props;

    return new THREE.TorusKnotGeometry(radius, tube, radialSegments, tubularSegments, p, q, heightScale);
  }
}

export default TorusKnotGeometryDescriptor;
