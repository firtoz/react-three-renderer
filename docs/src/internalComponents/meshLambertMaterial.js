import MaterialInfo from './shared/MaterialInfo';

class meshLambertMaterial extends MaterialInfo {
  getIntro() {
    return 'Creates a [THREE.MeshLambertMaterial](http://threejs.org/docs/#Reference/Materials/MeshLambertMaterial)';
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
      emissive: '',
      wireframe: '',
      wireframeLinewidth: '',
    };
  }
}

module.exports = meshLambertMaterial;
