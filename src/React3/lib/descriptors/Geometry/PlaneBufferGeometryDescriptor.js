import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';
import invariant from 'fbjs/lib/invariant';

import PropTypes from 'react/lib/ReactPropTypes';

class PlaneBufferGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    this.propTypes = {
      ...this.propTypes,

      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      widthSegments: PropTypes.number,
      heightSegments: PropTypes.number,
    };

    this.propUpdates = {
      ...this.propUpdates,
      'width': this._updateWidth,
      'height': this._updateHeight,
    };
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

  _updateWidth = (self, newWidth) => {
    invariant(false, 'Please do not modify the width property of the planeBufferGeometry component.');
  };

  _updateHeight = (self, newHeight) => {
    invariant(false, 'Please do not modify the height property of the planeBufferGeometry component.');
  };
}

export default PlaneBufferGeometryDescriptor;
