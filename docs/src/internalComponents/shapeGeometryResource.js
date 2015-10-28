import DocInfo from '../DocInfo';

class shapeGeometryResource extends DocInfo {
  getIntro() {
    return 'Reference to a material created from a shape resource';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      resourceId: '',
      type: '',
      divisions: '',
    };
  }
}

export default shapeGeometryResource;
