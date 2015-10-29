import DocInfo from '../DocInfo';

class ringGeometry extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.RingGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/RingGeometry)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      dynamic: '',
      name: '',
      resourceId: '',
      innerRadius: '',
      outerRadius: '',
      thetaSegments: '',
      phiSegments: '',
      thetaStart: '',
      thetaLength: '',
    };
  }
}

export default ringGeometry;
