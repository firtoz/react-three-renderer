import DocInfo from '../DocInfo';

class shape extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.Shape](http://threejs.org/docs/#Reference/Extras.Core/Shape)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      points: '',
      resourceId: '',
    };
  }
}

module.exports = shape;
