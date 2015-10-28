import DocInfo from '../DocInfo';

class cubeCamera extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.CubeCamera](http://threejs.org/docs/#Reference/Cameras/CubeCamera)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      quaternion: '',
      scale: '',
      lookAt: '',
      frustumCulled: '',
      visible: '',
      renderOrder: '',
      castShadow: '',
      receiveShadow: '',
      position: '',
      rotation: '',
      name: '',
      near: '',
      far: '',
      cubeResolution: '',
    };
  }
}

export default cubeCamera;
