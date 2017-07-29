import geometry from './geometry';

class cylinderGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.CylinderGeometry](https://threejs.org/docs/#api/geometries/CylinderGeometry)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),

      radiusTop: '',
      radiusBottom: '',
      height: '',
      radialSegments: '',
      heightSegments: '',
      openEnded: '',
      thetaStart: '',
      thetaLength: '',
    };
  }
}

module.exports = cylinderGeometry;
