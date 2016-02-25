import geometry from './geometry';

class polyhedronGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.PolyhedronGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/PolyhedronGeometry)';
  }

  getDescription() {
    return ``;
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
