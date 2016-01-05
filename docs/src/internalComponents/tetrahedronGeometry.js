import DocInfo from '../DocInfo';

class tetrahedronGeometry extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.TetrahedronGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/TetrahedronGeometry)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      dynamic: '',
      name: '',
      resourceId: '',
      radius: '',
      detail: '',
    };
  }
}

module.exports = tetrahedronGeometry;
