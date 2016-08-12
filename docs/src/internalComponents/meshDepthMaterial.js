import MaterialInfo from './shared/MaterialInfo';

class meshDepthMaterial extends MaterialInfo {
  getIntro() {
    return 'Creates a [THREE.MeshDepthMaterial](http://threejs.org/docs/#Reference/Materials/MeshDepthMaterial)';
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

module.exports = meshDepthMaterial;
