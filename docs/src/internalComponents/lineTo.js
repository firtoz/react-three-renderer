import DocInfo from '../DocInfo';

class lineTo extends DocInfo {
  getIntro() {
    return 'Calls [THREE.Path#lineTo](https://threejs.org/docs/#api/extras/core/Path.lineTo) on the parent shape';
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

module.exports = lineTo;
