import MaterialInfo from './shared/MaterialInfo';

class spriteMaterial extends MaterialInfo {
  getIntro() {
    return 'Creates a [THREE.SpriteMaterial](http://threejs.org/docs/#Reference/Materials/SpriteMaterial)';
  }

  getDescription() {
    return '';
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
      color: '',
      rotation: '',
      fog: '',
    };
  }
}

module.exports = spriteMaterial;
