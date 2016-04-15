import MaterialInfo from './shared/MaterialInfo';

class lineDashedMaterial extends MaterialInfo {
  getIntro() {
    return 'Creates a [THREE.LineDashedMaterial](http://threejs.org/docs/#Reference/Materials/LineDashedMaterial)';
  }

  getDescription() {
    return '';
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

module.exports = lineDashedMaterial;
