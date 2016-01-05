import DocInfo from '../DocInfo';

class parametricGeometry extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.ParametricGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/ParametricGeometry)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      dynamic: '',
      name: '',
      resourceId: '',
      slices: '',
      stacks: '',
      parametricFunction: '',
    };
  }
}

module.exports = parametricGeometry;
