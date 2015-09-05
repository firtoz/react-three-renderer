import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

class SphereGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    this.propUpdates = {
      ...this.propUpdates,
      'width': this._updateWidth,
      'height': this._updateHeight,
      'depth': this._updateDepth,
    };
  }

  construct(props) {
    const {
      radius,
      widthSegments,
      heightSegments,
      phiStart,
      phiLength,
      thetaStart,
      thetaLength,
      } = props;

    return new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
  }
}

export default SphereGeometryDescriptor;
