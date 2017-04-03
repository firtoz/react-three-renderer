import geometry from './geometry';

class edgesGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.EdgesGeometry](https://threejs.org/docs/#Reference/Geometries/EdgesGeometry)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),

      geometry: 'Any geometry object.',
      thresholdAngle: 'An edge is only rendered if the angle (in degrees) ' +
      'between the face normals of the adjoining faces exceeds this value. default = 1 degree.',
    };
  }
}

module.exports = edgesGeometry;
