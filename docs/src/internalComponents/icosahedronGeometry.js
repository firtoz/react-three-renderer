import geometry from './geometry';

class icosahedronGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.IcosahedronGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/IcosahedronGeometry)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),

      radius: '',
      detail: '',
    };
  }
}

module.exports = icosahedronGeometry;
