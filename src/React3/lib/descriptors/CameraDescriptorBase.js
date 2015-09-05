import Object3DDescriptor from './Object3DDescriptor';

import events from 'events';
const {EventEmitter} = events;

function getRoot(object) {
  const parentMarkup = object.userData.parentMarkup;
  if (parentMarkup) {
    return getRoot(parentMarkup.threeObject);
  }

  return object;
}

class CameraDescriptorBase extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.propUpdates = {
      ...this.propUpdates,
      aspect: this._updateAspect,
      fov: this._updateFov,
      far: this._updateFar,
    };
  }

  applyInitialProps(self, props) {
    super.applyInitialProps(self, props);

    self.userData.events = new EventEmitter();
  }

  setParent(camera, parentObject3D) {
    super.setParent(camera, parentObject3D);

    const root = getRoot(parentObject3D);

    const rootInstance = root && root.instance;

    if (rootInstance && rootInstance instanceof React3DInstance && rootInstance.getMainCameraName() === camera.name) {
      rootInstance.setCamera(camera);
    }
  }

  /**
   * @param {THREE.PerspectiveCamera} self
   * @param newAspect
   * @private
   */
  _updateAspect(self, newAspect) {
    self.aspect = newAspect;

    self.updateProjectionMatrix();
    self.userData.events.emit('updateProjectionMatrix');
  }

  _updateFov(self, fov) {
    self.fov = fov;

    self.updateProjectionMatrix();
    self.userData.events.emit('updateProjectionMatrix');
  }

  _updateFar(self, far) {
    self.far = far;

    self.updateProjectionMatrix();
    self.userData.events.emit('updateProjectionMatrix');
  }

  unmount(self) {
    self.userData.events.emit('dispose');
    self.userData.events.removeAllListeners();
    delete self.userData.events;
  }
}

export default CameraDescriptorBase;
