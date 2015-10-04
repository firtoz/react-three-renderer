import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class BoxGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    const updateCacheAndReplace = (threeObject) => {
      threeObject.userData._wantReplace = true;
    };

    [
      'width',
      'height',
      'depth',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number.isRequired,
        update: updateCacheAndReplace,
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
        update: updateCacheAndReplace,
        default: undefined,
      });
    });
  }

  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    threeObject.userData._wantReplace = false;
  }

  beginPropertyUpdates(threeObject) {
    super.beginPropertyUpdates(threeObject);

    threeObject.userData._wantReplace = false;
  }

  completePropertyUpdates(threeObject, transaction, context) {
    super.completePropertyUpdates(threeObject);

    if (threeObject.userData._wantReplace) {
      threeObject.userData._wantReplace = false;

      const ownInternal = threeObject.userData.react3internalComponent;

      ownInternal._wantsReplace = true;
    }
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
