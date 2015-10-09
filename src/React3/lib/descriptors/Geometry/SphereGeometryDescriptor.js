import THREE from 'three';
import BufferGeometryDescriptorBase from './BufferGeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class SphereGeometryDescriptor extends BufferGeometryDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    [
      'radius',
      'phiStart',
      'phiLength',
      'thetaStart',
      'thetaLength',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number,
        update: this.updateCacheAndReplace.bind(this, propName),
        default: undefined,
      });
    });

    [
      'widthSegments',
      'heightSegments',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number,
        update: this.triggerRemount,
        default: undefined,
      });
    });
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

    return new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
  }
}

export default SphereGeometryDescriptor;
