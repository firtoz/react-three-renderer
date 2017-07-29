import geometry from './geometry';

class boxGeometry extends geometry {
  constructor() {
    super();

    this.propPriority = {
      widthSegments: 1,
      heightSegments: 1,
      depthSegments: 1,
    };
  }

  getIntro() {
    return 'Creates a [THREE.BoxGeometry](https://threejs.org/docs/#api/geometries/BoxGeometry)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),

      width: 'Width of the sides on the X axis.',
      height: 'Height of the sides on the Y axis.',
      depth: 'Depth of the sides on the Z axis.',
      widthSegments: 'Number of segmented faces along the width of the sides.',
      heightSegments: 'Number of segmented faces along the height of the sides.',
      depthSegments: 'Number of segmented faces along the depth of the sides.',
    };
  }
}

module.exports = boxGeometry;
