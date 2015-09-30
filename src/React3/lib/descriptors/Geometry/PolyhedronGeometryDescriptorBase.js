import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class PolyhedronGeometryDescriptorBase extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.propTypes = {
      ...this.propTypes,

      radius: PropTypes.number.isRequired,
      detail: PropTypes.number.isRequired,
    };
  }
}

export default PolyhedronGeometryDescriptorBase;
