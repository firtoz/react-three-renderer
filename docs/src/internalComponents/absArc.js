import DocInfo from '../DocInfo';

class absArc extends DocInfo {
  getIntro() {
    return 'Calls [THREE.Path#absArc](http://threejs.org/docs/#Reference/Extras.Core/Path.absArc) on the parent shape';
  }

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
