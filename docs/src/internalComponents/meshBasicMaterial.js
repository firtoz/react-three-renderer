import DocInfo from '../DocInfo';

class meshBasicMaterial extends DocInfo {
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
      wireframe: '',
      wireframeLinewidth: '',
    };
  }
}

export default meshBasicMaterial;
