import * as THREE from 'three';

import PropTypes from 'prop-types';

import GeometryDescriptorBase from './GeometryDescriptorBase';

class CylinderGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    [
      'radiusTop',
      'radiusBottom',
      'height',
      'radialSegments',
      'heightSegments',
      'openEnded',
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
      radiusTop,
      radiusBottom,
      height,
      radialSegments,
      heightSegments,
      openEnded,
      thetaStart,
      thetaLength,
    } = props;

    return new THREE.CylinderGeometry(
      radiusTop,
      radiusBottom,
      height,
      radialSegments,
      heightSegments,
      openEnded,
      thetaStart,
      thetaLength);
  }
}

module.exports = CylinderGeometryDescriptor;
