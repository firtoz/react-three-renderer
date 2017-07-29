import MaterialInfo from './shared/MaterialInfo';

class meshDepthMaterial extends MaterialInfo {
  getIntro() {
    return 'Creates a [THREE.MeshDepthMaterial](https://threejs.org/docs/#api/materials/MeshDepthMaterial)';
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
