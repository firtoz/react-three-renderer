import geometry from './geometry';

class textGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.TextGeometry](https://threejs.org/docs/#api/geometries/TextGeometry)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),

      text: 'The text that needs to be shown.',
      font: 'The font for the text.',
      size: 'The size of the text.',
      height: 'The thickness to extrude text.',
      curveSegments: 'The number of points on the curves.',
      bevelEnabled: 'Turn on bevel.',
      bevelThickness: 'How deep into text bevel goes.',
      bevelSize: 'How far from text outline is bevel.',
    };
  }
}

module.exports = textGeometry;
