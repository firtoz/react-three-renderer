import DocInfo from '../DocInfo';

class lineBasicMaterial extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.LineBasicMaterial](http://threejs.org/docs/#Reference/Materials/LineBasicMaterial)';
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
      linewidth: '',
      linecap: '',
      linejoin: '',
      vertexColors: '',
      fog: '',
    };
  }
}

module.exports = lineBasicMaterial;
