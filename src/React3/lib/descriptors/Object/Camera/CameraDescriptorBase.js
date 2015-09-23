import Object3DDescriptor from './../Object3DDescriptor';
import THREE from 'three';

import getRoot from '../../../getRoot';

class CameraDescriptorBase extends Object3DDescriptor {
  applyInitialProps(self, props) {
    super.applyInitialProps(self, props);
  }

  setParent(camera, parentObject3D) {
    super.setParent(camera, parentObject3D);
  }

  unmount(self) {
    super.unmount(self);
  }

  beginPropertyUpdates(threeObject:THREE.Object3D) {
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

export default CameraDescriptorBase;
