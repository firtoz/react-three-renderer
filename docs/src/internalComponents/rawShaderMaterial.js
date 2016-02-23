import DocInfo from '../DocInfo';

class rawShaderMaterial extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.RawShaderMaterial]' +
      '(http://threejs.org/docs/#Reference/Materials/RawShaderMaterial).';
  }

  getDescription() {
    return `This is very similar to [ShaderMaterial](shadermaterial), except that
the vertex and fragment shader code will be exactly copied without any modifications.`;
  }

  getAttributesText() {
    return {};
  }
}

module.exports = rawShaderMaterial;
