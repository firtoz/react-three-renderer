import * as THREE from 'three';

import PropTypes from 'prop-types';

import GeometryDescriptorBase from './GeometryDescriptorBase';

class RingGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    [
      'innerRadius',
      'outerRadius',
      'thetaSegments',
      'phiSegments',
      'thetaStart',
      'thetaLength',
    ].forEach((propName) => {
      this.hasProp(propName, {
        type: PropTypes.number,
        update: this.triggerRemount,
        default: undefined,
      });
    });
  }

  construct(props) {
    const {
      innerRadius,
      outerRadius,
      thetaSegments,
      phiSegments,
      thetaStart,
      thetaLength,
    } = props;

    return new THREE.RingGeometry(
      innerRadius,
      outerRadius,
      thetaSegments,
      phiSegments,
      thetaStart,
      thetaLength);
  }
}

module.exports = RingGeometryDescriptor;
