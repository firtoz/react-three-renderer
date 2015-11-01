import geometry from './geometry';

class circleBufferGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.CircleBufferGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/CircleBufferGeometry)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
      radius: 'Radius of the circle, default = 50.',
      segments: 'Number of segments (triangles), minimum = 3, default = 8.',
      thetaStart: 'Start angle for first segment, default = 0 (three o\'clock position).',
      thetaLength: 'The central angle, often called theta, of the circular sector.\n\n' +
      'The default is 2*Pi, which makes for a complete circle.',
    };
  }
}

export default circleBufferGeometry;
