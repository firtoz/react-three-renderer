import object3D from './object3D';

class gridHelper extends object3D {
  getIntro() {
    return 'Creates a [THREE.GridHelper](https://threejs.org/docs/#api/helpers/GridHelper)';
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
