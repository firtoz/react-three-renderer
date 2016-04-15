import geometry from './geometry';

class ringGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.RingGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/RingGeometry)';
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
