import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class SphereGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    const updateCacheAndReplace = (propName, threeObject, newValue) => {
      threeObject.userData._propsCache[propName] = newValue;
      threeObject.userData._wantReplace = true;
    };

    [
      'radius',
      'widthSegments',
      'heightSegments',
      'phiStart',
      'phiLength',
      'thetaStart',
      'thetaLength',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number,
        update: updateCacheAndReplace.bind(this, propName),
        default: undefined,
      });
    });
  }

  beginPropertyUpdates(threeObject) {
    super.beginPropertyUpdates(threeObject);

    threeObject.userData._wantReplace = false;
    threeObject.userData._wantReplace = false;
  }

  completePropertyUpdates(threeObject) {
    super.completePropertyUpdates(threeObject);

    if (threeObject.userData._wantReplace) {
      threeObject.userData._wantReplace = false;

      const {
        radius,
        widthSegments,
        heightSegments,
        phiStart,
        phiLength,
        thetaStart,
        thetaLength,
        } = threeObject.userData._propsCache;

      threeObject.copy(new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength));
    }
  }

  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    threeObject.userData._propsCache = {
      ...props,
    };
  }

  construct(props) {
    const {
      radius,
      widthSegments,
      heightSegments,
      phiStart,
      phiLength,
      thetaStart,
      thetaLength,
      } = props;

    return new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
  }
}

export default SphereGeometryDescriptor;
