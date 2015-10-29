import DocInfo from '../DocInfo';

class meshNormalMaterial extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.MeshNormalMaterial](http://threejs.org/docs/#Reference/Materials/MeshNormalMaterial)';
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

export default meshNormalMaterial;
