import DocInfo from '../DocInfo';

class quadraticCurveTo extends DocInfo {
  getIntro() {
    return 'Calls [THREE.Path#quadraticCurveTo](http://threejs.org/docs/#Reference/Extras.Core/Path.quadraticCurveTo) on the parent shape';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      cpX: '',
      cpY: '',
      x: '',
      y: '',
    };
  }
}

module.exports = quadraticCurveTo;
