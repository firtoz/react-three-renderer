import * as THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

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
    // props from http://threejs.org/docs/index.html#Reference/Extras.Geometries/DodecahedronGeometry:
    const {
      radius, // number
      detail, // number
    } = props;

    return new THREE.DodecahedronGeometry(radius, detail);
  }
}

module.exports = DodecahedronGeometryDescriptor;
