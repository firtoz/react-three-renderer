import camera from './camera';

class orthographicCamera extends camera {
  getIntro() {
    return `Creates a [THREE.OrthographicCamera](http://threejs.org/docs/#Reference/Cameras/OrthographicCamera)`;
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
      left: '',
      right: '',
      top: '',
      bottom: '',
      near: '',
      far: '',
    };
  }
}

module.exports = orthographicCamera;
