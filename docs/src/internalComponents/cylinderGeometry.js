import DocInfo from '../DocInfo';

class cylinderGeometry extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.CylinderGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/CylinderGeometry)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      dynamic: '',
      name: '',
      resourceId: '',
      radiusTop: '',
      radiusBottom: '',
      height: '',
      radialSegments: '',
      heightSegments: '',
      openEnded: '',
      thetaStart: '',
      thetaLength: '',
    };
  }
}

export default cylinderGeometry;
