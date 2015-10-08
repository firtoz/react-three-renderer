import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class BoxGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    [
      'width',
      'height',
      'depth',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number.isRequired,
        update: this.remountInsteadOfUpdating,
        default: undefined,
      });
    });

    [
      'widthSegments',
      'heightSegments',
      'depthSegments',
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
