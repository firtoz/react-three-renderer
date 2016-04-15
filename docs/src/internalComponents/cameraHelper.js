import object3D from './object3D';

class cameraHelper extends object3D {
  getIntro() {
    return 'Creates a [THREE.CameraHelper](http://threejs.org/docs/#Reference/Extras.Helpers/CameraHelper)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
      cameraName: 'The [name](perspectiveCamera#name) of the camera to visualize.',
    };
  }
}

module.exports = cameraHelper;
