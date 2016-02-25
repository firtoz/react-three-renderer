import geometry from './geometry';

class octahedronGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.OctahedronGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/OctahedronGeometry)';
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

module.exports = octahedronGeometry;
