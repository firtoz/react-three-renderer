import CameraDescriptorBase from './CameraDescriptorBase';
import THREE from 'three.js';

import PropTypes from 'react/lib/ReactPropTypes';

class PerspectiveCameraDescriptor extends CameraDescriptorBase {

  constructor(react3Instance) {
    super(react3Instance);

    this.propTypes = {
      ...this.propTypes,

      fov: PropTypes.number,
      aspect: PropTypes.number,
      near: PropTypes.number,
      far: PropTypes.number,
    };

    this.propUpdates = {
      ...this.propUpdates,
      aspect: this._updateAspect,
      fov: this._updateFov,
      far: this._updateFar,
      near: this._updateNear,
    };
  }

  construct(props) {
    return new THREE.PerspectiveCamera(props.fov, props.aspect, props.near, props.far);
  }

  _updateFov(threeObject, fov) {
    threeObject.fov = fov;

    threeObject.userData._needsProjectionMatrixUpdate = true;
  }

  _updateNear(threeObject, near) {
    threeObject.near = near;

    threeObject.userData._needsProjectionMatrixUpdate = true;
  }

  _updateFar(threeObject, far) {
    threeObject.far = far;

    threeObject.userData._needsProjectionMatrixUpdate = true;
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
