import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class IcosahedronGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.propTypes = {
      ...this.propTypes,

      radius: PropTypes.number,
      detail: PropTypes.number,
    };
  }

  construct(props) {
    const {
      radius,
      detail,
      } = props;

    return new THREE.IcosahedronGeometry(radius, detail);
  }
}

export default IcosahedronGeometryDescriptor;
