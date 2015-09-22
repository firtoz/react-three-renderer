import THREE from 'three';
import Object3DDescriptor from './Object3DDescriptor';
import invariant from 'fbjs/lib/invariant';

class PointCloudDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);
  }

  construct() {
    const pointCloud = new THREE.PointCloud();

    pointCloud.geometry.dispose();
    pointCloud.material.dispose();

    pointCloud.geometry = undefined;
    pointCloud.material = undefined;

    return pointCloud;
  }

  addChildren(self, children) {
    invariant(children.filter(child => !(child instanceof THREE.Material || child instanceof THREE.Geometry)).length === 0, 'Mesh children can only be materials ore geometries!');
  }

  moveChild() {
    // doesn't matter
  }
}


export default PointCloudDescriptor;
