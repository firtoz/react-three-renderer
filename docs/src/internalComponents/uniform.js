import DocInfo from '../DocInfo';

class uniform extends DocInfo {
  getIntro() {
    return 'A single uniform value for a shader material.';
  }

  getDescription() {
    return `See [THREE.ShaderMaterial](http://threejs.org/docs/#Reference/Materials/ShaderMaterial).

Any modifications to uniforms will result in the recompilation of the shader.`;
  }

  getAttributesText() {
    return {
      type: 'See [THREE.ShaderMaterial](http://threejs.org/docs/#Reference/Materials/ShaderMaterial) for information about uniform types.',
      value: 'See [THREE.ShaderMaterial](http://threejs.org/docs/#Reference/Materials/ShaderMaterial) for information about uniform values.',
      name: 'The name of the uniform. This will act as the key in the [uniforms](http://threejs.org/docs/#Reference/Materials/ShaderMaterial.uniforms) dictionary.',
    };
  }
}

export default uniform;
