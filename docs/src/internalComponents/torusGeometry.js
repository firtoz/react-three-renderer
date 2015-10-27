import DocInfo from '../DocInfo';

class torusGeometry extends DocInfo {
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

export default torusGeometry;
