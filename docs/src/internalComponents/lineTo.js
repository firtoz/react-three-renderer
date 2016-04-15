import DocInfo from '../DocInfo';

class lineTo extends DocInfo {
  getIntro() {
    return 'Calls [THREE.Path#lineTo](http://threejs.org/docs/#Reference/Extras.Core/Path.lineTo) on the parent shape';
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
