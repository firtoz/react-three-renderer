import DocInfo from '../DocInfo';

class bezierCurveTo extends DocInfo {
  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      cp1X: '',
      cp1Y: '',
      cp2X: '',
      cp2Y: '',
      aX: '',
      aY: '',
    };
  }
}

export default bezierCurveTo;
