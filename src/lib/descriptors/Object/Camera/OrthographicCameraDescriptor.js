import * as THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

import CameraDescriptorBase from './CameraDescriptorBase';

class OrthographicCameraDescriptor extends CameraDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    this.propTypes = {
      ...this.propTypes,

      left: PropTypes.number.isRequired,
      right: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
      bottom: PropTypes.number.isRequired,
      near: PropTypes.number,
      far: PropTypes.number,
    };

    this.propUpdates = {
      ...this.propUpdates,

      left: this._updateAndRefreshProjection.bind(this, 'left'),
      right: this._updateAndRefreshProjection.bind(this, 'right'),
      top: this._updateAndRefreshProjection.bind(this, 'top'),
      bottom: this._updateAndRefreshProjection.bind(this, 'bottom'),
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
    return new THREE.OrthographicCamera(
      props.left,
      props.right,
      props.top,
      props.bottom,
      props.near,
      props.far);
  }

  _updateAndRefreshProjection(propName, camera, value) {
    camera[propName] = value;

    camera.userData._needsProjectionMatrixUpdate = true;
  }
}

module.exports = OrthographicCameraDescriptor;
