import THREE from 'three';
import MeshDescriptor from './MeshDescriptor';

class PointsDescriptor extends MeshDescriptor {
  construct() {
    const points = new THREE.Points();

    points.geometry.dispose();
    points.material.dispose();

    points.geometry = undefined;
    points.material = undefined;

    return points;
  }
}


module.exports = PointsDescriptor;
