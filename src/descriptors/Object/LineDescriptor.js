import THREE from 'three.js';
import Object3DDescriptor from './Object3DDescriptor';

import ResourceReference from '../../Resources/ResourceReference';

import invariant from 'fbjs/lib/invariant';

import MeshDescriptor from './MeshDescriptor';

class LineDescriptor extends MeshDescriptor {
  construct(props) {
    const geometry = props.hasOwnProperty('geometry') ? props.geometry : undefined;
    const material = props.hasOwnProperty('material') ? props.material : undefined;

    const mesh = new THREE.Line(geometry, material);

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

module.exports = LineDescriptor;
