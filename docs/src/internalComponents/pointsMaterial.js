import MaterialInfo from './shared/MaterialInfo';

class pointsMaterial extends MaterialInfo {
  getIntro() {
    return 'Creates a [THREE.PointsMaterial](https://threejs.org/docs/#api/materials/PointsMaterial)';
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
      size: '',
      sizeAttenuation: '',
      fog: '',
      vertexColors: '',
    };
  }
}

module.exports = pointsMaterial;
