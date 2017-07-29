import DocInfo from '../DocInfo';

class moveTo extends DocInfo {
  getIntro() {
    return 'Calls [THREE.Path#moveTo](https://threejs.org/docs/#api/extras/core/Path.moveTo) on the parent shape';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      x: '',
      y: '',
    };
  }
}

module.exports = moveTo;
