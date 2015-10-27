import DocInfo from '../DocInfo';

class absArc extends DocInfo {
  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      x: '',
      y: '',
      radius: '',
      startAngle: '',
      endAngle: '',
      clockwise: '',
    };
  }
}

export default absArc;
