import DocInfo from '../DocInfo';

class shaderMaterial extends DocInfo {
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
      vertexShader: '',
      fragmentShader: '',
      wireframe: '',
      wireframeLinewidth: '',
    };
  }
}

export default shaderMaterial;
