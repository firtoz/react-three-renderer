import camera from './camera';

class perspectiveCamera extends camera {
  getIntro() {
    return 'Creates a [THREE.PerspectiveCamera](http://threejs.org/docs/#Reference/Cameras/PerspectiveCamera)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
      fov: '',
      aspect: '',
      near: '',
      far: '',
    };
  }
}

export default perspectiveCamera;
