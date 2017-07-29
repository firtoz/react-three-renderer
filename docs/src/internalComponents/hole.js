import DocInfo from '../DocInfo';

class hole extends DocInfo {
  getIntro() {
    return 'Adds a hole into a parent shape, see [THREE.Shape#holes](https://threejs.org/docs/#api/extras/core/Shape.holes)';
  }

  getDescription() {
    return `It creates a path and accepts path actions e.g. [[moveTo]], [[lineTo]], and so on.

See [[shape#children]].`;
  }

  getAttributesText() {
    return {
      points: '',
    };
  }
}

module.exports = hole;
