import DocInfo from '../DocInfo';

class arrowHelper extends DocInfo {
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
      dir: '',
      origin: '',
      length: '',
      color: '',
      headLength: '',
      headWidth: '',
    };
  }
}

export default arrowHelper;
