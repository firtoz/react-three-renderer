import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

import React from 'react';
const {PropTypes} = React;

class CylinderGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.propTypes = {
      ...this.propTypes,

      radiusTop: PropTypes.number,
      radiusBottom: PropTypes.number,
      height: PropTypes.number,
      radialSegments: PropTypes.number,
      heightSegments: PropTypes.number,
      openEnded: PropTypes.number,
      thetaStart: PropTypes.number,
      thetaLength: PropTypes.number,
    };
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

    return new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);
  }
}

export default CylinderGeometryDescriptor;
