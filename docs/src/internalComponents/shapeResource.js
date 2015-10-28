import DocInfo from '../DocInfo';

class shapeResource extends DocInfo {
  getIntro() {
    return 'Reference to a shape resource';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      resourceId: '',
    };
  }
}

export default shapeResource;
