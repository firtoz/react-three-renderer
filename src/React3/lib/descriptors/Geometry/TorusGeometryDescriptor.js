import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

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
        update: this.remountInsteadOfUpdating,
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

export default TorusGeometryDescriptor;
