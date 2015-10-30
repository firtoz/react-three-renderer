import object3D from './object3D';

class camera extends object3D {
  getIntro() {
    return 'Creates a [THREE.Camera](http://threejs.org/docs/#Reference/Cameras/Camera)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
      near: 'The [near]() property of the camera.',
      far: 'The [far]() property of the camera.',
    };
  }
}

export default camera;
