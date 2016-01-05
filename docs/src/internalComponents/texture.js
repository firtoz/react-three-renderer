import DocInfo from '../DocInfo';

class texture extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.Texture](http://threejs.org/docs/#Reference/Textures/Texture)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      repeat: '',
      wrapS: '',
      wrapT: '',
      anisotropy: '',
      url: '',
      resourceId: '',
    };
  }
}

module.exports = texture;
