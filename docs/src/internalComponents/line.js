import object3D from './object3D';

class line extends object3D {
  getIntro() {
    return 'Creates a [THREE.Line](https://threejs.org/docs/#api/objects/Line)';
  }

  getDescription() {
    return 'This object can contain [[Materials]] and [[Geometries]].';
  }
}

module.exports = line;
