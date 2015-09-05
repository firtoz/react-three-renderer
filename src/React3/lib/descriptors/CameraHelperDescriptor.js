import THREE from 'three';
import Object3DDescriptor from './Object3DDescriptor';

class CameraHelperDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.propUpdates = {
      ...this.propUpdates,
      visible: this._updateVisible,
    };
  }

  construct(props) {
    return new THREE.CameraHelper(props.camera);
  }

  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    if (props.autoUpdate && props.camera) {
      const userData = threeObject.userData;

      userData._onCameraProjectionUpdate = () => {
        threeObject.update();
      };

      userData._onCameraDispose = () => {
        props.camera.userData.events.off('updateProjectionMatrix', threeObject.userData._onCameraProjectionUpdate);
      };

      props.camera.userData.events.on('updateProjectionMatrix', userData._onCameraProjectionUpdate);
      props.camera.userData.events.once('dispose', userData._onCameraDispose);
    }

    threeObject.visible = props.visible;
  }

  _updateVisible(threeObject, visible) {
    threeObject.visible = visible;
  }
}

export default CameraHelperDescriptor;
