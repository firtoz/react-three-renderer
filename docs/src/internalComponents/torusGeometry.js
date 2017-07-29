import geometry from './geometry';

class torusGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.TorusGeometry](https://threejs.org/docs/#api/geometries/TorusGeometry)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),

      radius: '',
      tube: '',
      radialSegments: '',
      tubularSegments: '',
      arc: '',
    };
  }
}

module.exports = torusGeometry;
