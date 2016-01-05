import THREE from 'three.js';

import Object3DDescriptor from './Object3DDescriptor';

class GroupDescriptor extends Object3DDescriptor {
  construct() {
    return new THREE.Group();
  }
}

module.exports = GroupDescriptor;
