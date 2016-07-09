import DocInfo from '../DocInfo';

class textureResource extends DocInfo {
  getIntro() {
    return 'Reference to a texture resource';
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

module.exports = textureResource;
