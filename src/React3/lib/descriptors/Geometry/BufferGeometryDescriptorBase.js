import GeometryDescriptorBase from './GeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class BufferGeometryDescriptorBase extends GeometryDescriptorBase {
  updateCacheAndReplace = (propName, threeObject, newValue) => {
    threeObject.userData._propsCache[propName] = newValue;
    threeObject.userData._wantReplace = true;
  };

  beginPropertyUpdates(threeObject) {
    super.beginPropertyUpdates(threeObject);

    threeObject.userData._wantReplace = false;
  }

  completePropertyUpdates(threeObject) {
    super.completePropertyUpdates(threeObject);

    if (threeObject.userData._wantReplace) {
      threeObject.userData._wantReplace = false;

      threeObject.copy(this.construct(threeObject.userData._propsCache));
    }
  }

  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    threeObject.userData._propsCache = {
      ...props,
    };
  }
}

export default BufferGeometryDescriptorBase;
