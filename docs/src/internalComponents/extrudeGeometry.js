import DocInfo from '../DocInfo';

class extrudeGeometry extends DocInfo {
  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      dynamic: '',
      name: '',
      resourceId: '',
      shapes: '',
      settings: '',
      amount: '',
      bevelThickness: '',
      bevelSize: '',
      bevelSegments: '',
      bevelEnabled: '',
      curveSegments: '',
      steps: '',
      extrudePath: '',
      UVGenerator: '',
      frames: '',
    };
  }
}

export default extrudeGeometry;
