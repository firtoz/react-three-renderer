import THREE from 'three';

import Object3DDescriptor from '../Object3DDescriptor';

class CameraDescriptorBase extends Object3DDescriptor {
  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);
  }

  setParent(camera, parentObject3D) {
    super.setParent(camera, parentObject3D);
  }

  unmount(threeObject) {
    super.unmount(threeObject);
  }

  beginPropertyUpdates(threeObject: THREE.Object3D) {
    super.beginPropertyUpdates(threeObject);

    threeObject.userData._needsProjectionMatrixUpdate = false;
  }

  /**
   * @param {THREE.PerspectiveCamera | THREE.OrthographicCamera} threeObject
   */
  completePropertyUpdates(threeObject) {
    super.completePropertyUpdates(threeObject);

    if (threeObject.userData._needsProjectionMatrixUpdate) {
      threeObject.userData._needsProjectionMatrixUpdate = false;

      threeObject.updateProjectionMatrix();
      threeObject.userData.events.emit('updateProjectionMatrix');
    }
  }
}

module.exports = CameraDescriptorBase;
