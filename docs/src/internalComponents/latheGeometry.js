import DocInfo from '../DocInfo';

class latheGeometry extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.LatheGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/LatheGeometry)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      dynamic: '',
      name: '',
      resourceId: '',
      segments: '',
      phiStart: '',
      phiLength: '',
      points: '',
    };
  }
}

export default latheGeometry;
