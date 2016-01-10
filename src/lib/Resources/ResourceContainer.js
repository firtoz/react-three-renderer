import THREE from 'three.js';

class ResourceContainer extends THREE.Object3D {
  constructor() {
    super();

    this.visible = false;

    this.resourceMap = {};
    this.resourceIds = [];
  }
}

module.exports = ResourceContainer;
