import geometry from './geometry';

class boxGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.BoxGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/BoxGeometry)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),

      width: 'Width of the sides on the X axis.',
      height: 'Height of the sides on the Y axis.',
      depth: 'Depth of the sides on the Z axis.',
      widthSegments: 'Number of segmented faces along the width of the sides.\n\n' +
      'Optional.\n\n' +
      'Default is 1.',
      heightSegments: 'Number of segmented faces along the height of the sides.\n\n' +
      'Optional.\n\n' +
      'Default is 1.',
      depthSegments: 'Number of segmented faces along the depth of the sides.\n\n' +
      'Optional.\n\n' +
      'Default is 1.',
    };
  }
}

module.exports = boxGeometry;
