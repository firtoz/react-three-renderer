import THREE from 'three';
import Object3DDescriptor from './Object3DDescriptor';

import ResourceReference from '../../Resources/ResourceReference';

import invariant from 'fbjs/lib/invariant';

class MeshDescriptor extends Object3DDescriptor {
  construct(props) {
    const geometry = props.hasOwnProperty('geometry') ? props.geometry : undefined;
    const material = props.hasOwnProperty('material') ? props.material : undefined;

    const mesh = new THREE.Mesh(geometry, material);

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

  _invalidChild = child => {
    const invalid = !(
      child instanceof THREE.Material ||
      child instanceof ResourceReference ||
      child instanceof THREE.Geometry ||
      child instanceof THREE.BufferGeometry
    );

    if (invalid) {
      debugger;
    }

    return invalid;
  };

  addChildren(self, children) {
    invariant(children.filter(this._invalidChild).length === 0, 'Mesh children can only be materials or geometries!');
  }

  moveChild() {
    // doesn't matter
  }
}

export default MeshDescriptor;
