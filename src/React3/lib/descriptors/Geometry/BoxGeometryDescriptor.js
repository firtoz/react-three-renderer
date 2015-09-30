import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class BoxGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.propTypes = {
      ...this.propTypes,

      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      depth: PropTypes.number.isRequired,
      widthSegments: PropTypes.number,
      heightSegments: PropTypes.number,
      depthSegments: PropTypes.number,
    };
  }

  construct(props) {
    const {
      width,
      height,
      depth,
      widthSegments,
      heightSegments,
      depthSegments,
      } = props;

    return new THREE.BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments);
  }
}

export default BoxGeometryDescriptor;
