import DocInfo from '../DocInfo';

class boxGeometry extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.BoxGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/BoxGeometry)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      dynamic: '',
      name: '',
      resourceId: '',
      width: '',
      height: '',
      depth: '',
      widthSegments: '',
      heightSegments: '',
      depthSegments: '',
    };
  }
}

export default boxGeometry;
