import DocInfo from '../DocInfo';

class absEllipse extends DocInfo {
  getIntro() {
    return 'Calls [THREE.Path#absEllipse](http://threejs.org/docs/#Reference/Extras.Core/Path.absEllipse) on the parent shape';
  }

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
