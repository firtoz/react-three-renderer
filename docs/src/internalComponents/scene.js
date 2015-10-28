import DocInfo from '../DocInfo';

class scene extends DocInfo {
  getIntro() {
    return `Creates a [THREE.Scene](http://threejs.org/docs/#Reference/Scenes/Scene)`;
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
      fog: '',
    };
  }
}

export default scene;
