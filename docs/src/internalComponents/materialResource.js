import DocInfo from '../DocInfo';

class materialResource extends DocInfo {
  getIntro() {
    return 'Reference to a material resource';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      resourceId: '',
    };
  }
}

module.exports = materialResource;
