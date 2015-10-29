import DocInfo from '../DocInfo';

class uniform extends DocInfo {
  getIntro() {
    return 'A single uniform value for a shader material';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      type: '',
      value: '',
      name: '',
    };
  }
}

export default uniform;
