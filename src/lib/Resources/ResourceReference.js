import * as THREE from 'three';

class ResourceReference {
  constructor(resourceId) {
    this.uuid = THREE.Math.generateUUID();

    this.resourceId = resourceId;
    this.userData = {};
  }
}

module.exports = ResourceReference;
