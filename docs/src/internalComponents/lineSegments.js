import geometry from './geometry';

class lineSegments extends geometry {
  getIntro() {
    return 'Creates a [THREE.LineSegments](http://threejs.org/docs/#Reference/Objects/LineSegments)';
  }

  getDescription() {
    return 'This object can contain [[Materials]] and [[Geometries]].';
  }
}

module.exports = lineSegments;
