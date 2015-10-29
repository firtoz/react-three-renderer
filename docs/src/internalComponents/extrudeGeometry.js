import DocInfo from '../DocInfo';

class extrudeGeometry extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.ExtrudeGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/ExtrudeGeometry)';
  }

  getDescription() {
    return `It then wraps this with a [THREE.BufferGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/BufferGeometry). This is to prevent having to remount the component every time anything changes.`;
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
