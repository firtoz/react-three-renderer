import DocInfo from '../DocInfo';

class torusKnotGeometry extends DocInfo {
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
      p: '',
      q: '',
      heightScale: '',
    };
  }
}

export default torusKnotGeometry;
