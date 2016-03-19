import geometry from './geometry';

class latheGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.LatheGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/LatheGeometry)';
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
