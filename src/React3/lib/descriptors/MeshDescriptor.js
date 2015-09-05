import THREE from 'three';
import Object3DDescriptor from './Object3DDescriptor';
import invariant from 'fbjs/lib/invariant';

class MeshDescriptor extends Object3DDescriptor {
  construct() {
    const mesh = new THREE.Mesh();

    mesh.geometry.dispose();
    mesh.material.dispose();

    mesh.geometry = undefined;
    mesh.material = undefined;

    return mesh;
  }

  addChildren(self, children) {
    invariant(children.filter(child => !(child instanceof THREE.Material || child instanceof THREE.Geometry)).length === 0, 'Mesh children can only be materials ore geometries!');
  }

  moveChild() {
    // doesn't matter
  }
}

export default MeshDescriptor;
