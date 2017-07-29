import DocInfo from '../DocInfo';

class splineThru extends DocInfo {
  getIntro() {
    return 'Calls [THREE.Path#splineThru](https://threejs.org/docs/#api/extras/core/Path.splineThru) on the parent shape';
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
