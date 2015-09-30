import THREE from 'three';
import CameraUtils from '../../../utils/CameraUtils.js';
import Object3DDescriptor from '../Object3DDescriptor';

import PropTypes from 'react/lib/ReactPropTypes';

class CameraHelperDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.propUpdates = {
      ...this.propUpdates,
      visible: this._updateVisible, //overwrite
      cameraName: this._updateCameraName,
    };

    this.propTypes = {
      ...this.propTypes,

      cameraName: PropTypes.string.isRequired,
    };
  }

  construct() {
    return new THREE.CameraHelper(new THREE.Camera());
  }

  applyInitialProps(cameraHelper:THREE.CameraHelper, props) {
    super.applyInitialProps(cameraHelper, props);

    cameraHelper.userData._onCameraProjectionUpdate = () => {
      cameraHelper.update();
    };

    cameraHelper.userData._onCameraDispose = () => {
      this._startCameraFinder(cameraHelper);
    };

    cameraHelper.userData._onCameraRename = (payload) => {
      if (payload.oldName === cameraHelper.userData._cameraName) {
        this._startCameraFinder(cameraHelper);
      }
    };

    cameraHelper.userData._onBeforeRender = () => {
      cameraHelper.visible = cameraHelper.userData._hasCamera
        && cameraHelper.userData._visible
        && CameraUtils.current !== cameraHelper.userData._camera;
    };

    cameraHelper.userData._cameraName = props.cameraName;
    cameraHelper.userData._visible = props.hasOwnProperty('visible') ? props.visible : true;

    cameraHelper.userData.events.once('addedIntoRoot', () => {
      const rootInstance = cameraHelper.userData.markup._rootInstance;

      rootInstance.addBeforeRenderListener(cameraHelper.userData._onBeforeRender);

      this._startCameraFinder(cameraHelper);
    });
  }

  unmount(self) {
    this._clearCameraEvents(self);

    delete self.userData._onCameraProjectionUpdate;

    return super.unmount(self);
  }

  _getCamera(rootInstance, cameraName) {
    let camera = null;

    if (cameraName) {
      const camerasByName = rootInstance.getObjectsByName(cameraName).filter(obj => obj instanceof THREE.Camera);

      if (camerasByName.length > 0) {
        camera = camerasByName[0];
      }
    }

    return camera;
  }

  _clearCameraEvents(helper) {
    if (helper.userData._hasCamera) {
      helper.userData._camera.userData.events.removeListener('updateProjectionMatrix', helper.userData._onCameraProjectionUpdate);
      helper.userData._camera.userData.events.removeListener('dispose', helper.userData._onCameraDispose);
      helper.userData._camera.userData.events.removeListener('rename', helper.userData._onCameraRename);
    }
  }

  _setCamera(helper:THREE.CameraHelper, camera) {
    const userData = helper.userData;

    if (userData._camera === camera) {
      return;
    }

    this._clearCameraEvents(helper);

    userData._hasCamera = true;
    userData._camera = camera;
    helper.camera = camera;
    helper.matrix = camera.matrixWorld;
    helper.update();
    helper.visible = userData._visible;
    const cameraEvents = helper.userData._camera.userData.events;

    cameraEvents.on('rename', userData._onCameraRename);
    cameraEvents.on('updateProjectionMatrix', userData._onCameraProjectionUpdate);
    cameraEvents.once('dispose', userData._onCameraDispose);
  }

  _startCameraFinder(helper) {
    this._clearCameraEvents(helper);

    const rootInstance = helper.userData.markup && helper.userData.markup._rootInstance;

    if (!rootInstance) {
      return;
    }

    helper.userData._hasCamera = false;
    helper.userData._camera = null;
    helper.camera = new THREE.Camera();
    helper.visible = false;

    const camera = this._getCamera(rootInstance, helper.userData._cameraName);

    if (camera) {
      this._setCamera(helper, camera);
    } else {
      // try to find camera before renders
      const findCamera = () => {
        const foundCamera = this._getCamera(rootInstance, helper.userData._cameraName);

        if (foundCamera) {
          rootInstance.removeAnimateListener(findCamera);

          this._setCamera(helper, foundCamera);
        }
      };

      rootInstance.addAnimateListener(findCamera);
    }
  }

  _updateVisible(cameraHelper, visible) {
    cameraHelper.userData._visible = visible;

    cameraHelper.visible = cameraHelper.userData._hasCamera && visible;
  }

  _updateCameraName = (cameraHelper, cameraName) => {
    this._clearCameraEvents(cameraHelper);

    cameraHelper.userData._cameraName = cameraName;

    this._startCameraFinder(cameraHelper);
  }
}

export default CameraHelperDescriptor;
