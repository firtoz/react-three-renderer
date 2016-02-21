import DocInfo from '../DocInfo';

class rawShaderMaterial extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.RawShaderMaterial](http://threejs.org/docs/#Reference/Materials/RawShaderMaterial)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      transparent: '',
      side: '',
      opacity: '',
      visible: '',
      resourceId: '',
      vertexShader: '',
      fragmentShader: '',
    };
  }
}

module.exports = rawShaderMaterial;
