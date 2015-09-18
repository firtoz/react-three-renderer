import THREE from 'three';

class ResourceReference {
  constructor(resourceId) {
    this.uuid = THREE.Math.generateUUID();

    this.resourceId = resourceId;
    this.userData = {};
  }
}

export default ResourceReference;
