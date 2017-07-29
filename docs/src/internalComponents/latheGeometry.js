import geometry from './geometry';

class latheGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.LatheGeometry](https://threejs.org/docs/#api/geometries/LatheGeometry)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),

      segments: '',
      phiStart: '',
      phiLength: '',
      points: '',
    };
  }
}

module.exports = latheGeometry;
