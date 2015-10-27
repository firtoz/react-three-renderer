import DocInfo from '../DocInfo';

class absEllipse extends DocInfo {
  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      x: '',
      y: '',
      xRadius: '',
      yRadius: '',
      startAngle: '',
      endAngle: '',
      rotation: '',
      clockwise: '',
    };
  }
}

export default absEllipse;
