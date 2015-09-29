import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

import React from 'react';
const {PropTypes} = React;

class LatheGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.propTypes = {
      ...this.propTypes,

      points: PropTypes.arrayOf(PropTypes.instanceOf(THREE.Vector3)).isRequired,
      segments: PropTypes.number,
      phiStart: PropTypes.number,
      phiLength: PropTypes.number,
    };
  }

  construct(props) {
    const {
      points,
      segments,
      phiStart,
      phiLength,
      } = props;

    return new THREE.LatheGeometry(points, segments, phiStart, phiLength);
  }
}

export default LatheGeometryDescriptor;
