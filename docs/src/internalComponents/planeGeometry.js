import DocInfo from '../DocInfo';

class planeGeometry extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.PlaneGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/PlaneGeometry)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      dynamic: '',
      name: '',
      resourceId: '',
      width: '',
      height: '',
      widthSegments: '',
      heightSegments: '',
    };
  }
}

module.exports = planeGeometry;
