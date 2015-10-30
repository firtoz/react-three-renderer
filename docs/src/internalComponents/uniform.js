import DocInfo from '../DocInfo';

class uniform extends DocInfo {
  getIntro() {
    return 'A single uniform value for a shader material.';
  }

  getDescription() {
    return `See [THREE.ShaderMaterial](http://threejs.org/docs/#Reference/Materials/ShaderMaterial).`;
  }

  getAttributesText() {
    return {
      type: '',
      value: '',
      name: '',
    };
  }
}

export default uniform;
