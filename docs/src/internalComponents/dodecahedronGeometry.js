import DocInfo from '../DocInfo';

class dodecahedronGeometry extends DocInfo {
  getDescription() {
    return 'Creates a [THREE.DodecahedronGeometry]' +
      '(http://threejs.org/docs/index.html#Reference/Extras.Geometries/DodecahedronGeometry)';
  }

  getAttributesText() {
    return {
      dynamic: '',
      name: '',
      resourceId: '',
      radius: 'Radius of the dodecahedron. Default is 1.',
      detail: 'Default is 0. Setting this to a value greater than 0 adds vertices ' +
        'making it no longer a dodecahedron.',
    };
  }
}

module.exports = dodecahedronGeometry;
