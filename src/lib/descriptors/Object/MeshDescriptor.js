import THREE from 'three';
import invariant from 'fbjs/lib/invariant';

import ResourceReference from '../../Resources/ResourceReference';
import Object3DDescriptor from './Object3DDescriptor';

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

    return invalid;
  };

  addChildren(threeObject, children) {
    if (process.env.NODE_ENV !== 'production') {
      invariant(children.filter(this._invalidChild).length === 0,
        'Mesh children can only be materials or geometries!');
    } else {
      invariant(children.filter(this._invalidChild).length === 0, false);
    }
  }

  addChild(threeObject, child) {
    this.addChildren(threeObject, [child]);
  }

  moveChild() {
    // doesn't matter
  }

  getBoundingBoxes(threeObject) {
    // recompute bounding box for highlighting from a fresh update
    if (threeObject.geometry && threeObject.geometry.computeBoundingBox) {
      threeObject.geometry.computeBoundingBox();
    }

    return super.getBoundingBoxes(threeObject);
  }
}

module.exports = MeshDescriptor;
