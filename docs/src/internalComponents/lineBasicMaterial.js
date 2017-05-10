import MaterialInfo from './shared/MaterialInfo';

class lineBasicMaterial extends MaterialInfo {
  getIntro() {
    return 'Creates a [THREE.LineBasicMaterial](https://threejs.org/docs/#api/materials/LineBasicMaterial)';
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
      linecap: '',
      linejoin: '',
      vertexColors: '',
      fog: '',
    };
  }
}

module.exports = lineBasicMaterial;
