import geometry from './geometry';

class lineSegments extends geometry {
  getIntro() {
    return 'Creates a [THREE.LineSegments](https://threejs.org/docs/#api/objects/LineSegments)';
  }

  getDescription() {
    return 'This object can contain [[Materials]] and [[Geometries]].';
  }
}

module.exports = lineSegments;
