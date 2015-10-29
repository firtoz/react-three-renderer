import DocInfo from '../DocInfo';

class geometry extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.Geometry](http://threejs.org/docs/#Reference/Extras.Geometries/Geometry)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      dynamic: '',
      name: '',
      resourceId: '',
      vertices: '',
      colors: '',
      faces: '',
    };
  }
}

export default geometry;
