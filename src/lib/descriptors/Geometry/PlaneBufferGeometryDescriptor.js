import THREE from 'three';
import BufferGeometryDescriptorBase from './BufferGeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class PlaneBufferGeometryDescriptor extends BufferGeometryDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    [
      'width',
      'height',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number.isRequired,
        update: this.updateCacheAndReplace.bind(this, propName),
        default: 1,
      });
    });

    [
      'widthSegments',
      'heightSegments',
    ].forEach(propName => {
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

    return new THREE.PlaneBufferGeometry(width, height, widthSegments, heightSegments);
  }
}

module.exports = PlaneBufferGeometryDescriptor;
