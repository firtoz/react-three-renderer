import object3D from './object3D';

class line extends object3D {
  getIntro() {
    return 'Creates a [THREE.Line](http://threejs.org/docs/#Reference/Objects/Line)';
  }

  getDescription() {
    return `This object can contain [[Materials]] and [[Geometries]].`;
  }
}

module.exports = line;
