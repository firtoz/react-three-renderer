import CameraDescriptorBase from './CameraDescriptorBase';
import THREE from 'three';

class OrthographicCameraDescriptor extends CameraDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    this.propUpdates = {
      ...this.propUpdates,

      top: this._updateAndRefreshProjection.bind(this, 'top'),
      bottom: this._updateAndRefreshProjection.bind(this, 'bottom'),
    };
  }

  construct(props) {
    return new THREE.OrthographicCamera(props.left, props.right, props.top, props.bottom, props.near, props.far);
  }

  _updateAndRefreshProjection(propName, camera, value) {
    camera[propName] = value;

    camera.userData._needsProjectionMatrixUpdate = true;
  }
}

export default OrthographicCameraDescriptor;
