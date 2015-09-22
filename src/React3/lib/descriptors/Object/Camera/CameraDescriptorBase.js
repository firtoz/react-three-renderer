import Object3DDescriptor from './../Object3DDescriptor';
import THREE from 'three';

import getRoot from '../../../getRoot';

class CameraDescriptorBase extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.propUpdates = {
      ...this.propUpdates,
      fov: this._updateFov,
      far: this._updateFar,
    };
  }

  applyInitialProps(self, props) {
    super.applyInitialProps(self, props);
  }

  setParent(camera, parentObject3D) {
    super.setParent(camera, parentObject3D);
  }

  _updateFov(threeObject, fov) {
    threeObject.fov = fov;

    threeObject.userData._needsProjectionMatrixUpdate = true;
  }

  _updateFar(threeObject, far) {
    threeObject.far = far;

    threeObject.userData._needsProjectionMatrixUpdate = true;
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
