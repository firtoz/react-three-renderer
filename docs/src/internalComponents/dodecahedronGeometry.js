import geometry from './geometry';

class dodecahedronGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.DodecahedronGeometry]' +
      '(https://threejs.org/docs/#api/geometries/DodecahedronGeometry)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),

      radius: 'Radius of the dodecahedron.',
      detail: 'Setting this to a value greater than 0 adds vertices ' +
      'making it no longer a dodecahedron.',
    };
  }
}

module.exports = dodecahedronGeometry;
