import geometry from './geometry';

class polyhedronGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.PolyhedronGeometry](https://threejs.org/docs/#api/geometries/PolyhedronGeometry)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),

      radius: '',
      detail: '',
      vertices: '',
      indices: '',
    };
  }
}

module.exports = polyhedronGeometry;
