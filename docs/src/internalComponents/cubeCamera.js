import camera from './camera';

class cubeCamera extends camera {
  getIntro() {
    return 'Creates a [THREE.CubeCamera](https://threejs.org/docs/#api/cameras/CubeCamera)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
      near: 'The near clipping distance.',
      far: 'The far clipping distance.',
      cubeResolution: '',
    };
  }
}

module.exports = cubeCamera;
