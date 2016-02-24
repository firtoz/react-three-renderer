import DocInfo from '../DocInfo';

class textGeometry extends DocInfo {
  getIntro() {
    return `Creates a [THREE.TextGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/TextGeometry)`;
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      dynamic: '',
      name: '',
      resourceId: '',
      text: 'The text that needs to be shown.',
      font: 'The font for the text.',
      size: 'The size of the text.',
      height: 'The thickness to extrude text. Default is 50.',
      curveSegments: 'The number of points on the curves. Default is 12.',
      bevelEnabled: 'Turn on bevel. Default is false.',
      bevelThickness: 'How deep into text bevel goes. Default is 10.',
      bevelSize: 'How far from text outline is bevel. Default is 8.',
    };
  }
}

module.exports = textGeometry;
