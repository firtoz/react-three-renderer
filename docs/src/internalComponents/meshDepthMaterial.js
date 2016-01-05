import DocInfo from '../DocInfo';

class meshDepthMaterial extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.MeshDepthMaterial](http://threejs.org/docs/#Reference/Materials/MeshDepthMaterial)';
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
      wireframe: '',
      wireframeLinewidth: '',
    };
  }
}

module.exports = meshDepthMaterial;
