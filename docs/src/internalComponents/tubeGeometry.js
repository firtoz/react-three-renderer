import DocInfo from '../DocInfo';

class tubeGeometry extends DocInfo {
  getIntro() {
    return `Creates a [THREE.TubeGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/TubeGeometry)`;
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      dynamic: '',
      name: '',
      resourceId: '',
      path: 'THREE.Curve - A path that inherits from the Curve base class.',
      segments: 'The number of segments that make up the tube, default is 64.',
      radius: 'The radius of the tube, default is 1.',
      radiusSegments: 'The number of segments that make up the cross-section, default is 8.',
      closed: 'Is the tube open or closed, default is false.',
    };
  }
}

module.exports = tubeGeometry;
