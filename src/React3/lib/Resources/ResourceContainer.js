import THREE from 'three';

class ResourceContainer extends THREE.Object3D {
  constructor() {
    super();

    this.resourceMap = {};
    this.resourceIds = [];
    this.userData = {};
  }
}

export default ResourceContainer;
