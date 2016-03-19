import DocInfo from '../DocInfo';

class splineThru extends DocInfo {
  getIntro() {
    return 'Calls [THREE.Path#splineThru](http://threejs.org/docs/#Reference/Extras.Core/Path.splineThru) on the parent shape';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      points: '',
    };
  }
}

module.exports = splineThru;
