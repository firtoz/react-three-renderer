import MaterialInfo from './shared/MaterialInfo';

class shaderMaterial extends MaterialInfo {
  getIntro() {
    return 'Creates a [THREE.ShaderMaterial](http://threejs.org/docs/#Reference/Materials/ShaderMaterial)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),

      transparent: '',
      alphaTest: '',
      side: '',
      opacity: '',
      visible: '',
      resourceId: '',
      vertexShader: 'The vertex shader code.',
      fragmentShader: 'The fragment shader code.',
      wireframe: '',
      wireframeLinewidth: '',
    };
  }
}

module.exports = shaderMaterial;
