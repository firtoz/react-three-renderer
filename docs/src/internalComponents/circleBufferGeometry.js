import geometry from './geometry';

class circleBufferGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.CircleBufferGeometry](https://threejs.org/docs/#api/geometries/CircleBufferGeometry)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),

      radius: 'Radius of the circle',
      segments: 'Number of segments (triangles), minimum = 3',
      thetaStart: 'Start angle for first segment, default = 0 (three o\'clock position).',
      thetaLength: 'The central angle, often called theta, of the circular sector.\n\n' +
      'The default is 2*Pi, which makes for a complete circle.',
    };
  }
}

module.exports = circleBufferGeometry;
