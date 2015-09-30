import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class TorusGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.propTypes = {
      ...this.propTypes,

      radius: PropTypes.number,
      tube: PropTypes.number,
      radialSegments: PropTypes.number,
      tubularSegments: PropTypes.number,
      arc: PropTypes.number,
    };
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
