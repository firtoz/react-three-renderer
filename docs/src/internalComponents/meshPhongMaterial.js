import DocInfo from '../DocInfo';

class meshPhongMaterial extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.MeshPhongMaterial](http://threejs.org/docs/#Reference/Materials/MeshPhongMaterial)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      slot: '',
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
