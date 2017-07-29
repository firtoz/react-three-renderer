import DocInfo from '../DocInfo';

class bezierCurveTo extends DocInfo {
  getIntro() {
    return 'Calls ' +
      '[THREE.Path#bezierCurveTo]' +
      '(https://threejs.org/docs/#api/extras/core/Path.bezierCurveTo) on the parent shape';
  }

  getDescription() {
    return `This creates a bezier curve from the last offset to x and y with
cp1X, cp1Y and cp1X, cp1Y as control points and updates the offset to x and y.`;
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

module.exports = bezierCurveTo;
