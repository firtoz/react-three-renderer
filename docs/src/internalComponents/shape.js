import DocInfo from '../DocInfo';

class shape extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.Shape](http://threejs.org/docs/#Reference/Extras.Core/Shape)';
  }

  getDescription() {
    return `Place this within [[&lt;extrudeGeometry&gt;|extrudeGeometry]],
    [[&lt;shapeGeometry&gt;|shapeGeometry]],
    or [&lt;resources&gt;](resources).`;
  }

  getAttributesText() {
    return {
      points: '',
    };
  }
}

module.exports = shape;
