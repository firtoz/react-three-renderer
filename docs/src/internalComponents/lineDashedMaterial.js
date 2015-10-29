import DocInfo from '../DocInfo';

class lineDashedMaterial extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.LineDashedMaterial](http://threejs.org/docs/#Reference/Materials/LineDashedMaterial)';
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
      scale: '',
      gapSize: '',
      dashSize: '',
      linecap: '',
      linejoin: '',
      vertexColors: '',
      fog: '',
    };
  }
}

export default lineDashedMaterial;
