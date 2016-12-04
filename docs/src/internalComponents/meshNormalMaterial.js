import MaterialInfo from './shared/MaterialInfo';

class meshNormalMaterial extends MaterialInfo {
  getIntro() {
    return 'Creates a [THREE.MeshNormalMaterial](http://threejs.org/docs/#Reference/Materials/MeshNormalMaterial)';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
    };
  }
}

module.exports = meshNormalMaterial;
