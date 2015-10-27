import DocInfo from '../DocInfo';

class pointsMaterial extends DocInfo {
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
      size: '',
      sizeAttenuation: '',
      fog: '',
      vertexColors: '',
    };
  }
}

export default pointsMaterial;
