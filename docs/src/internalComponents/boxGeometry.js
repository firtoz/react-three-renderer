import DocInfo from '../DocInfo';

class boxGeometry extends DocInfo {
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
