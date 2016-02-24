import DocInfo from '../DocInfo';

class dodecahedronGeometry extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.DodecahedronGeometry]' +
      '(http://threejs.org/docs/index.html#Reference/Extras.Geometries/DodecahedronGeometry)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      dynamic: '',
      name: '',
      resourceId: '',
      radius: 'Radius of the dodecahedron. Default is 1.',
      detail: 'Setting this to a value greater than 0 adds vertices ' +
      'making it no longer a dodecahedron. Default is 0.',
    };
  }
}

module.exports = dodecahedronGeometry;
