import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

import React from 'react';
const {PropTypes} = React;

class IcosahedronGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.propTypes = {
      ...this.propTypes,

      vertices: PropTypes.arrayOf(PropTypes.number).isRequired,
      indices: PropTypes.arrayOf(PropTypes.number).isRequired,
      radius: PropTypes.number.isRequired,
      detail: PropTypes.number.isRequired,
    };
  }

  construct(props) {
    const {
      vertices,
      indices,
      radius,
      detail,
      } = props;

    return new THREE.PolyhedronGeometry(vertices, indices, radius, detail);
  }
}

export default IcosahedronGeometryDescriptor;
