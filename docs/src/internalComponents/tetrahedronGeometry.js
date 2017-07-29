import geometry from './geometry';

class tetrahedronGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.TetrahedronGeometry](https://threejs.org/docs/#api/geometries/TetrahedronGeometry)';
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

module.exports = tetrahedronGeometry;
