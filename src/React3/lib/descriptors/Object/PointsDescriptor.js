import THREE from 'three';
import Object3DDescriptor from './Object3DDescriptor';
import invariant from 'fbjs/lib/invariant';

class PointsDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);
  }

  construct() {
    const points = new THREE.Points();

    points.geometry.dispose();
    points.material.dispose();

    points.geometry = undefined;
    points.material = undefined;

    return points;
  }

  addChildren(self, children) {
    invariant(children.filter(child => !(child instanceof THREE.Material || child instanceof THREE.Geometry)).length === 0, 'Mesh children can only be materials ore geometries!');
  }

  moveChild() {
    // doesn't matter
  }
}


export default PointsDescriptor;
