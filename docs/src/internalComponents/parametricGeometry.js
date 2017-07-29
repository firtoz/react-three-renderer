import geometry from './geometry';

class parametricGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.ParametricGeometry](https://threejs.org/docs/#api/geometries/ParametricGeometry)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),

      slices: '',
      stacks: '',
      parametricFunction: '',
    };
  }
}

module.exports = parametricGeometry;
