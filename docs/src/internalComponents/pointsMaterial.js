import DocInfo from '../DocInfo';

class pointsMaterial extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.PointsMaterial](http://threejs.org/docs/#Reference/Materials/PointsMaterial)';
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
      size: '',
      sizeAttenuation: '',
      fog: '',
      vertexColors: '',
    };
  }
}

module.exports = pointsMaterial;
