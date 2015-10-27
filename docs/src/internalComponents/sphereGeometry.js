import DocInfo from '../DocInfo';

class sphereGeometry extends DocInfo {
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

export default sphereGeometry;
