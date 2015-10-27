import DocInfo from '../DocInfo';

class cylinderGeometry extends DocInfo {
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
