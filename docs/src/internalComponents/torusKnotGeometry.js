import DocInfo from '../DocInfo';

class torusKnotGeometry extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.TorusKnotGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/TorusKnotGeometry)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      dynamic: '',
      name: '',
      resourceId: '',
      radius: '',
      tube: '',
      radialSegments: '',
      tubularSegments: '',
      p: '',
      q: '',
      heightScale: '',
    };
  }
}

export default torusKnotGeometry;
