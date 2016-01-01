import THREE from 'three';
import MeshDescriptor from './MeshDescriptor';

class PointsDescriptor extends MeshDescriptor {
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
}


export default PointsDescriptor;
