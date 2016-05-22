import THREE from 'three';

import MeshDescriptor from './MeshDescriptor';

class LineSegmentDescriptor extends MeshDescriptor {
  construct(props) {
    const geometry = props.hasOwnProperty('geometry') ? props.geometry : undefined;
    const material = props.hasOwnProperty('material') ? props.material : undefined;

    const mesh = new THREE.LineSegments(geometry, material);

    if (!geometry) {
      mesh.geometry.dispose();
      mesh.geometry = undefined;
    }

    if (!material) {
      mesh.material.dispose();
      mesh.material = undefined;
    }

    return mesh;
  }
}

module.exports = LineSegmentDescriptor;
