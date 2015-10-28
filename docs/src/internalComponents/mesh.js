import DocInfo from '../DocInfo';

class mesh extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.Mesh](http://threejs.org/docs/#Reference/Objects/Mesh)';
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

export default mesh;
