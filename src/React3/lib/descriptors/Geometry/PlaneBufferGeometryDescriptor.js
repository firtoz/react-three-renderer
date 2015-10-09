import THREE from 'three';
import BufferGeometryDescriptorBase from './BufferGeometryDescriptorBase';
import invariant from 'fbjs/lib/invariant';

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
      });
    });

    [
      'widthSegments',
      'heightSegments',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number.isRequired,
        update: this.triggerRemount,
        default: undefined,
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

export default PlaneBufferGeometryDescriptor;
