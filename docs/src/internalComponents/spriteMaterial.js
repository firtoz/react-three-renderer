import DocInfo from '../DocInfo';

class spriteMaterial extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.SpriteMaterial](http://threejs.org/docs/#Reference/Materials/SpriteMaterial)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      slot: '',
      transparent: '',
      alphaTest: '',
      side: '',
      opacity: '',
      visible: '',
      resourceId: '',
      color: '',
      rotation: '',
      fog: '',
    };
  }
}

module.exports = spriteMaterial;
