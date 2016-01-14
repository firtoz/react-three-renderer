import GeometryDescriptorBase from './GeometryDescriptorBase';

class BufferGeometryDescriptorBase extends GeometryDescriptorBase {
  updateCacheAndReplace = (propName, threeObject, newValue) => {
    threeObject.userData._propsCache[propName] = newValue;
    threeObject.userData._wantPropertyOverwrite = true;
  };

  beginPropertyUpdates(threeObject) {
    super.beginPropertyUpdates(threeObject);

    threeObject.userData._wantPropertyOverwrite = false;
  }

  completePropertyUpdates(threeObject) {
    super.completePropertyUpdates(threeObject);

    if (threeObject.userData._wantPropertyOverwrite) {
      threeObject.userData._wantPropertyOverwrite = false;

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

module.exports = BufferGeometryDescriptorBase;
