import geometry from './geometry';

class icosahedronGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.IcosahedronGeometry](https://threejs.org/docs/#api/geometries/IcosahedronGeometry)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),

      radius: '',
      detail: '',
    };
  }
}

module.exports = icosahedronGeometry;
