import DocInfo from '../DocInfo';

class ringGeometry extends DocInfo {
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
