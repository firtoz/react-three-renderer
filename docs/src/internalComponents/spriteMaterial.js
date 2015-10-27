import DocInfo from '../DocInfo';

class spriteMaterial extends DocInfo {
  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      slot: '',
      transparent: '',
      alphaTest: '',
      side: '',
      opacity: '',
      visible: '',
      resourceId: '',
      color: '',
      rotation: '',
      fog: '',
    };
  }
}

export default spriteMaterial;
