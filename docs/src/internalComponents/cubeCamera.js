import camera from './camera';

class cubeCamera extends camera {
  getIntro() {
    return 'Creates a [THREE.CubeCamera](http://threejs.org/docs/#Reference/Cameras/CubeCamera)';
  }

  getDescription() {
    return ``;
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

export default cubeCamera;
