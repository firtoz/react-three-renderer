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
      near: 'The [near]() property of the cube camera.',
      far: 'The [far]() property of the cube camera.',
      cubeResolution: '',
    };
  }
}

export default cubeCamera;
