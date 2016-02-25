import geometry from './geometry';

class tetrahedronGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.TetrahedronGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/TetrahedronGeometry)';
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

module.exports = tetrahedronGeometry;
