import DocInfo from '../DocInfo';

class orthographicCamera extends DocInfo {
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
      left: '',
      right: '',
      top: '',
      bottom: '',
      near: '',
      far: '',
    };
  }
}

export default orthographicCamera;
