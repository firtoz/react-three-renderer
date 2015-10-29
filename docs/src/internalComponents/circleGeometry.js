import DocInfo from '../DocInfo';

class circleGeometry extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.CircleGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/CircleGeometry)';
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
      segments: '',
      thetaStart: '',
      thetaLength: '',
    };
  }
}

export default circleGeometry;
