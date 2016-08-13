import THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

import GeometryDescriptorBase from './GeometryDescriptorBase';

class TorusGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    [
      'radius',
      'tube',
      'radialSegments',
      'tubularSegments',
      'arc',
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
      tube,
      radialSegments,
      tubularSegments,
      arc,
    } = props;

    return new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc);
  }
}

module.exports = TorusGeometryDescriptor;
