import DocInfo from '../DocInfo';

class cubeCamera extends DocInfo {
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
