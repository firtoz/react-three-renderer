import DocInfo from '../DocInfo';

class sphereGeometry extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.SphereGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/SphereGeometry)';
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
      phiStart: '',
      phiLength: '',
      thetaStart: '',
      thetaLength: '',
      widthSegments: '',
      heightSegments: '',
    };
  }
}

module.exports = sphereGeometry;
