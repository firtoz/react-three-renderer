import CameraDescriptorBase from './CameraDescriptorBase';
import THREE from 'three';

class PerspectiveCameraDescriptor extends CameraDescriptorBase {

  constructor(react3Instance) {
    super(react3Instance);

    this.propUpdates = {
      ...this.propUpdates,
      aspect: this._updateAspect,
    };
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
