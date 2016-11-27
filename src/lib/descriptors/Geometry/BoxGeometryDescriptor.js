import * as THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

import GeometryDescriptorBase from './GeometryDescriptorBase';

class BoxGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    [
      'width',
      'height',
      'depth',
    ].forEach((propName) => {
      this.hasProp(propName, {
        type: PropTypes.number.isRequired,
        update: this.triggerRemount,
        default: 1,
      });
    });

    [
      'widthSegments',
      'heightSegments',
      'depthSegments',
    ].forEach((propName) => {
      this.hasProp(propName, {
        type: PropTypes.number,
        update: this.triggerRemount,
        default: 1,
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

    return new THREE.BoxGeometry(width, height, depth,
      widthSegments, heightSegments, depthSegments);
  }
}

module.exports = BoxGeometryDescriptor;
