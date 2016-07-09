import MaterialInfo from './shared/MaterialInfo';

class lineBasicMaterial extends MaterialInfo {
  getIntro() {
    return 'Creates a [THREE.LineBasicMaterial](http://threejs.org/docs/#Reference/Materials/LineBasicMaterial)';
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
      linecap: '',
      linejoin: '',
      vertexColors: '',
      fog: '',
    };
  }
}

module.exports = lineBasicMaterial;
