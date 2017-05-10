import geometry from './geometry';

class octahedronGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.OctahedronGeometry](https://threejs.org/docs/#api/geometries/OctahedronGeometry)';
  }

  getDescription() {
    return '';
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
