import object3D from './object3D';

class camera extends object3D {
  getIntro() {
    return 'Creates a [THREE.Camera](https://threejs.org/docs/#api/cameras/Camera)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
      name: 'The [name](https://threejs.org/docs/#api/core/Object3D.name) property of the camera.\n\n' +
      'This gets used by [&lt;react3/&gt;](react3), [&lt;viewport/&gt;](viewport), or' +
      ' [&lt;cameraHelper&gt;](cameraHelper).',
      near: 'Camera frustum near plane.',
      far: 'Camera frustum far plane.',
    };
  }
}

module.exports = camera;
