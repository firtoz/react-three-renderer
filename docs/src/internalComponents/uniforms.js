import DocInfo from '../DocInfo';

class uniforms extends DocInfo {
  getIntro() {
    return 'A container for [THREE.ShaderMaterial#uniforms](https://threejs.org/docs/#api/materials/ShaderMaterial.uniforms).';
  }

  getDescription() {
    return 'Any modifications to uniforms will result in the recompilation of the shader.';
  }

  getAttributesText() {
    return {};
  }
}

module.exports = uniforms;
