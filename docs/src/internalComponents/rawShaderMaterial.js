import shaderMaterial from './shaderMaterial';

class rawShaderMaterial extends shaderMaterial {
  getIntro() {
    return 'Creates a [THREE.RawShaderMaterial]' +
      '(https://threejs.org/docs/#api/materials/RawShaderMaterial).';
  }

  getDescription() {
    return `This is very similar to [[ShaderMaterial]], except that
the vertex and fragment shader code will be exactly copied without any modifications.`;
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
    };
  }
}

module.exports = rawShaderMaterial;
