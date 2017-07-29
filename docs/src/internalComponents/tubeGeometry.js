import geometry from './geometry';

class tubeGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.TubeGeometry](https://threejs.org/docs/#api/geometries/TubeGeometry)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),

      path: 'THREE.Curve - A path that inherits from the Curve base class.',
      segments: 'The number of segments that make up the tube, default is 64.',
      radius: 'The radius of the tube, default is 1.',
      radiusSegments: 'The number of segments that make up the cross-section, default is 8.',
      closed: 'Is the tube open or closed, default is false.',
    };
  }
}

module.exports = tubeGeometry;
