import DocInfo from '../DocInfo';

class moveTo extends DocInfo {
  getIntro() {
    return 'Calls [THREE.Path#moveTo](http://threejs.org/docs/#Reference/Extras.Core/Path.moveTo) on the parent shape';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      x: '',
      y: '',
    };
  }
}

module.exports = moveTo;
