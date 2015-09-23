import CameraDescriptorBase from './CameraDescriptorBase';
import THREE from 'three';

class PerspectiveCameraDescriptor extends CameraDescriptorBase {

  constructor(react3Instance) {
    super(react3Instance);

    this.propUpdates = {
      ...this.propUpdates,
      aspect: this._updateAspect,
      fov: this._updateFov,
      far: this._updateFar,
    };
  }

  _updateFov(threeObject, fov) {
    threeObject.fov = fov;

    threeObject.userData._needsProjectionMatrixUpdate = true;
  }

  _updateFar(threeObject, far) {
    threeObject.far = far;

    threeObject.userData._needsProjectionMatrixUpdate = true;
  }

  construct(props) {
    return new THREE.PerspectiveCamera(props.fov, props.aspect, props.near, props.far);
  }

  /**
   * @param {THREE.PerspectiveCamera} threeObject
   * @param newAspect
   * @private
   */
  _updateAspect(threeObject, newAspect) {
    threeObject.aspect = newAspect;

    threeObject.userData._needsProjectionMatrixUpdate = true;
  }
}

export default PerspectiveCameraDescriptor;
