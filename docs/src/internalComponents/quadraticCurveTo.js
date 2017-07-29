import DocInfo from '../DocInfo';

class quadraticCurveTo extends DocInfo {
  getIntro() {
    return 'Calls [THREE.Path#quadraticCurveTo](https://threejs.org/docs/#api/extras/core/Path.quadraticCurveTo) on the parent shape';
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
