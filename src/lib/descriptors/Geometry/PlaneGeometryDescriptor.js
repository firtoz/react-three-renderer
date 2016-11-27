import * as THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

import GeometryDescriptorBase from './GeometryDescriptorBase';

class PlaneGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    [
      'width',
      'height',
    ].forEach((propName) => {
      this.hasProp(propName, {
        type: PropTypes.number.isRequired,
        update: this.triggerRemount,
        default: undefined,
      });
    });

    [
      'widthSegments',
      'heightSegments',
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
      widthSegments,
      heightSegments,
    } = props;

    return new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
  }
}

module.exports = PlaneGeometryDescriptor;
