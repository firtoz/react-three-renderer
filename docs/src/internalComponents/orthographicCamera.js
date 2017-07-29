import camera from './camera';

class orthographicCamera extends camera {
  getIntro() {
    return 'Creates a [THREE.OrthographicCamera](https://threejs.org/docs/#api/cameras/OrthographicCamera)';
  }

  getDescription() {
    return '';
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
