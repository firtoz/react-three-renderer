import MaterialInfo from './shared/MaterialInfo';


class meshStandardMaterial extends MaterialInfo {
  getIntro() {
    return 'Creates a [THREE.MeshStandardMaterial](https://threejs.org/docs/#Reference/Materials/MeshStandardMaterial)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
    };
  }
}

module.exports = meshStandardMaterial;
