import geometry from './geometry';

class circleGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.CircleGeometry]' +
      '(https://threejs.org/docs/#api/geometries/CircleGeometry)';
  }

  getDescription() {
    return `CircleGeometry is a simple shape of Euclidean geometry.

It is constructed from a number of triangular segments that are oriented
 around a central point and extend as far out as a given radius. It is
 built counter-clockwise from a start angle and a given central angle.
 It can also be used to create regular polygons, where the number of
 segments determines the number of sides.`;
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

module.exports = circleGeometry;
