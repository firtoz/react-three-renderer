import * as THREE from 'three';

import PropTypes from 'prop-types';

import GeometryDescriptorBase from './GeometryDescriptorBase';

class DodecahedronGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasProp('radius', {
      type: PropTypes.number,
      update: this.triggerRemount,
      default: 1,
    });

    this.hasProp('detail', {
      type: PropTypes.number,
      update: this.triggerRemount,
      default: 0,
    });
  }

  construct(props) {
    // props from https://threejs.org/docs/#api/geometries/DodecahedronGeometry:
    const {
      radius, // number
      detail, // number
    } = props;

    return new THREE.DodecahedronGeometry(radius, detail);
  }
}

module.exports = DodecahedronGeometryDescriptor;
