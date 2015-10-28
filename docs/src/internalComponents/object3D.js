import DocInfo from '../DocInfo';

class object3D extends DocInfo {
  getIntro() {
    return `Creates a [THREE.Object3D](http://threejs.org/docs/#Reference/Core/Object3D)`;
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
    };
  }
}

export default object3D;
