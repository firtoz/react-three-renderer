import MaterialInfo from './shared/MaterialInfo';

class meshBasicMaterial extends MaterialInfo {
  getIntro() {
    return 'Creates a [THREE.MeshBasicMaterial](https://threejs.org/docs/#api/materials/MeshBasicMaterial)';
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
      wireframe: '',
      wireframeLinewidth: '',
    };
  }
}

module.exports = meshBasicMaterial;
