import MaterialInfo from './shared/MaterialInfo';

class meshNormalMaterial extends MaterialInfo {
  getIntro() {
    return 'Creates a [THREE.MeshNormalMaterial](https://threejs.org/docs/#api/materials/MeshNormalMaterial)';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
    };
  }
}

module.exports = meshNormalMaterial;
