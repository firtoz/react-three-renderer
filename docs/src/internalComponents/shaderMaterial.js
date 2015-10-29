import DocInfo from '../DocInfo';

class shaderMaterial extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.ShaderMaterial](http://threejs.org/docs/#Reference/Materials/ShaderMaterial)';
  }

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
