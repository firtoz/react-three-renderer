import DocInfo from '../DocInfo';

class absArc extends DocInfo {
  getIntro() {
    return 'Calls [THREE.Path#absArc](http://threejs.org/docs/#Reference/Extras.Core/Path.absarc) on the parent shape';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      x: 'The absolute center x of the arc',
      y: 'The absolute center y of the arc',
      radius: 'The radius of the arc',
      startAngle: 'The start angle in radians',
      endAngle: 'The end angle in radians',
      clockwise: 'Sweep the arc clockwise.\n\n' +
      'Defaults to false',
    };
  }
}

export default absArc;
