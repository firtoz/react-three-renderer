import DocInfo from '../DocInfo';

class perspectiveCamera extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.PerspectiveCamera](http://threejs.org/docs/#Reference/Cameras/PerspectiveCamera)';
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
      fov: '',
      aspect: '',
      near: '',
      far: '',
    };
  }
}

export default perspectiveCamera;
