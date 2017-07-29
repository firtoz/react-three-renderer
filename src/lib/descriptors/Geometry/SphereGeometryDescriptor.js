import * as THREE from 'three';
import PropTypes from 'prop-types';

import BufferGeometryDescriptorBase from './BufferGeometryDescriptorBase';

class SphereGeometryDescriptor extends BufferGeometryDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    this.hasProp('radius', {
      type: PropTypes.number,
      update: this.updateCacheAndReplace.bind(this, 'radius'),
      default: undefined,
    });

    [
      'widthSegments',
      'heightSegments',
    ].forEach((propName) => {
      this.hasProp(propName, {
        type: PropTypes.number,
        update: this.triggerRemount,
        default: undefined,
      });
    });

    [
      'phiStart',
      'phiLength',
      'thetaStart',
      'thetaLength',
    ].forEach((propName) => {
      this.hasProp(propName, {
        type: PropTypes.number,
        update: this.updateCacheAndReplace.bind(this, propName),
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

    return new THREE.SphereBufferGeometry(
      radius,
      widthSegments,
      heightSegments,
      phiStart,
      phiLength,
      thetaStart,
      thetaLength);
  }
}

module.exports = SphereGeometryDescriptor;
