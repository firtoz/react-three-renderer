import MaterialInfo from './shared/MaterialInfo';

class meshNormalMaterial extends MaterialInfo {
  getIntro() {
    return 'Creates a [THREE.MeshNormalMaterial](http://threejs.org/docs/#Reference/Materials/MeshNormalMaterial)';
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
      wireframe: '',
      wireframeLinewidth: '',
    };
  }
}

module.exports = meshNormalMaterial;
