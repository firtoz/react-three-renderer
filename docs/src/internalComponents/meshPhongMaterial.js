import MaterialInfo from './shared/MaterialInfo';

class meshPhongMaterial extends MaterialInfo {
  getIntro() {
    return 'Creates a [THREE.MeshPhongMaterial](http://threejs.org/docs/#Reference/Materials/MeshPhongMaterial)';
  }

  getDescription() {
    return ``;
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
      specular: '',
      emissive: '',
      wireframe: '',
      wireframeLinewidth: '',
      shininess: '',
      metal: '',
    };
  }
}

module.exports = meshPhongMaterial;
