import geometry from './geometry';

class parametricGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.ParametricGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/ParametricGeometry)';
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
