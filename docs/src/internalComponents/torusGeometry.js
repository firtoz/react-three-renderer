import geometry from './geometry';

class torusGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.TorusGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/TorusGeometry)';
  }

  getDescription() {
    return ``;
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
