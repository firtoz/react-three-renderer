import DocInfo from '../DocInfo';

class meshBasicMaterial extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.MeshBasicMaterial](http://threejs.org/docs/#Reference/Materials/MeshBasicMaterial)';
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
      wireframe: '',
      wireframeLinewidth: '',
    };
  }
}

export default meshBasicMaterial;
