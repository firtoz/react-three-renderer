import DocInfo from '../DocInfo';

class hole extends DocInfo {
  getIntro() {
    return `Adds a hole into a parent shape, see [THREE.Shape#holes](http://threejs.org/docs/#Reference/Extras.Core/Shape.holes)`;
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

export default hole;
