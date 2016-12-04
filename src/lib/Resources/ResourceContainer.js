import * as THREE from 'three';

class ResourceContainer extends THREE.Object3D {
  constructor() {
    super();

    this.visible = false;

    this.resourceMap = {};
    this.resourceIds = [];
  }
}

module.exports = ResourceContainer;
