import object3D from './object3D';

class points extends object3D {
  getIntro() {
    return 'Creates a [THREE.Points](http://threejs.org/docs/#Reference/Objects/Points)';
  }

  getDescription() {
    return `This object can contain [[Materials]] and [[Geometries]].`;
  }
}

module.exports = points;
