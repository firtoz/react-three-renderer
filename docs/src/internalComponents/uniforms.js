import DocInfo from '../DocInfo';

class uniforms extends DocInfo {
  getIntro() {
    return 'A container for [THREE.ShaderMaterial#uniforms](http://threejs.org/docs/#Reference/Materials/ShaderMaterial.uniforms).';
  }

  getDescription() {
    return `Any modifications to uniforms will result in the recompilation of the shader.`;
  }

  getAttributesText() {
    return {};
  }
}

export default uniforms;
