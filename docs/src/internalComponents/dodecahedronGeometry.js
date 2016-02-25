import geometry from './geometry';

class dodecahedronGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.DodecahedronGeometry]' +
      '(http://threejs.org/docs/index.html#Reference/Extras.Geometries/DodecahedronGeometry)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),

      radius: 'Radius of the dodecahedron. Default is 1.',
      detail: 'Setting this to a value greater than 0 adds vertices ' +
      'making it no longer a dodecahedron. Default is 0.',
    };
  }
}

module.exports = dodecahedronGeometry;
