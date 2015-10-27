import DocInfo from '../DocInfo';

class perspectiveCamera extends DocInfo {
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
