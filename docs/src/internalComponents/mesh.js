import object3D from './object3D';

class mesh extends object3D {
  getIntro() {
    return 'Creates a [THREE.Mesh](http://threejs.org/docs/#Reference/Objects/Mesh)';
  }

  getDescription() {
    return `This object can contain [[Materials]] and [[Geometries]].`;
  }
}

export default mesh;
