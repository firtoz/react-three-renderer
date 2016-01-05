import DocInfo from '../DocInfo';

class meshLambertMaterial extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.MeshLambertMaterial](http://threejs.org/docs/#Reference/Materials/MeshLambertMaterial)';
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
      emissive: '',
      wireframe: '',
      wireframeLinewidth: '',
    };
  }
}

module.exports = meshLambertMaterial;
