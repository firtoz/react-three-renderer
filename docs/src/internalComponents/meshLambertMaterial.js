import MaterialInfo from './shared/MaterialInfo';

class meshLambertMaterial extends MaterialInfo {
  getIntro() {
    return 'Creates a [THREE.MeshLambertMaterial](https://threejs.org/docs/#api/materials/MeshLambertMaterial)';
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
