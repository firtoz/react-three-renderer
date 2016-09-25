import object3D from './object3D';

class gridHelper extends object3D {
  getDescription() {
    return 'Creates a [THREE.AxisHelper](https://threejs.org/docs/index.html#Reference/Extras.Helpers/GridHelper)';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
      size: 'The size of the grid',
      step: 'The size of the step between 2 lines',
      colorCenterLine: 'The color of the centerline.',
      colorGrid: 'The color of the lines of the grid.',
    };
  }
}

module.exports = gridHelper;
