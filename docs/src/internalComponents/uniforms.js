import DocInfo from '../DocInfo';

class uniforms extends DocInfo {
  getIntro() {
    return 'A container for uniforms. Controls the ' +
      '[uniforms](http://threejs.org/docs/#Reference/Materials/ShaderMaterial.uniforms) property for a ShaderMaterial';
  }

  getDescription() {
    return `See [THREE.ShaderMaterial](http://threejs.org/docs/#Reference/Materials/ShaderMaterial).`;
  }

  getAttributesText() {
    return {};
  }
}

export default uniforms;
