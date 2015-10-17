import THREE from 'three.js';

class UniformContainer {
  constructor() {
    this.userData = {};
    this.uniforms = {};
    this.uuid = THREE.Math.generateUUID();
  }
}

export default UniformContainer;
