import MaterialInfo from './shared/MaterialInfo';

class lineDashedMaterial extends MaterialInfo {
  getIntro() {
    return 'Creates a [THREE.LineDashedMaterial](https://threejs.org/docs/#api/materials/LineDashedMaterial)';
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
