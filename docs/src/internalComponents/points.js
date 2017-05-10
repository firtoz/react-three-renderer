import object3D from './object3D';

class points extends object3D {
  getIntro() {
    return 'Creates a [THREE.Points](https://threejs.org/docs/#api/objects/Points)';
  }

  getDescription() {
    return 'This object can contain [[Materials]] and [[Geometries]].';
  }
}

module.exports = points;
