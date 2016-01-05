import DocInfo from '../DocInfo';

class torusGeometry extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.TorusGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/TorusGeometry)';
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
      tube: '',
      radialSegments: '',
      tubularSegments: '',
      arc: '',
    };
  }
}

module.exports = torusGeometry;
