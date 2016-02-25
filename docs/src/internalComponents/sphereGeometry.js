import geometry from './geometry';

class sphereGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.SphereGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/SphereGeometry)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),

      radius: '',
      phiStart: '',
      phiLength: '',
      thetaStart: '',
      thetaLength: '',
      widthSegments: '',
      heightSegments: '',
    };
  }
}

module.exports = sphereGeometry;
