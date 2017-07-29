import geometry from './geometry';

class ringGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.RingGeometry](https://threejs.org/docs/#api/geometries/RingGeometry)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),

      innerRadius: '',
      outerRadius: '',
      thetaSegments: '',
      phiSegments: '',
      thetaStart: '',
      thetaLength: '',
    };
  }
}

module.exports = ringGeometry;
