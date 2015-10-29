import DocInfo from '../DocInfo';

class bezierCurveTo extends DocInfo {
  getIntro() {
    return 'Calls [THREE.Path#bezierCurveTo](http://threejs.org/docs/#Reference/Extras.Core/Path.bezierCurveTo) on the parent shape';
  }

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
