import DocInfo from '../DocInfo';

class absEllipse extends DocInfo {
  getIntro() {
    return 'Calls [THREE.Path#absEllipse]' +
      '(http://threejs.org/docs/#Reference/Extras.Core/Path.absellipse) on the parent shape';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      x: 'The absolute center x of the ellipse',
      y: 'The absolute center y of the ellipse',
      xRadius: 'The radius of the ellipse in the x axis',
      yRadius: 'The radius of the ellipse in the y axis',
      startAngle: 'The start angle in radians',
      endAngle: 'The end angle in radians',
      clockwise: 'Sweep the ellipse clockwise.\n\n' +
      'Defaults to false',
      rotation: 'The rotation angle of the ellipse in radians, counterclockwise from the' +
      ' positive X axis.\n\n' +
      'Optional, defaults to 0',
    };
  }
}

module.exports = absEllipse;
