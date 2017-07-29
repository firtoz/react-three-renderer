import MaterialInfo from './shared/MaterialInfo';

class shaderMaterial extends MaterialInfo {
  getIntro() {
    return 'Creates a [THREE.ShaderMaterial](https://threejs.org/docs/#api/materials/ShaderMaterial)';
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
      uniforms: `The uniforms to be used for the shader.

See [THREE.ShaderMaterial#uniforms](https://threejs.org/docs/#api/materials/ShaderMaterial.uniforms)`,
      vertexShader: 'The vertex shader code.',
      fragmentShader: 'The fragment shader code.',
      wireframe: '',
      wireframeLinewidth: '',
    };
  }
}

module.exports = shaderMaterial;
