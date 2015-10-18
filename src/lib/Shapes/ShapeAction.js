import THREE from 'three.js';

/**
 * @abstract
 */
class ShapeAction {
  constructor() {
    this.uuid = THREE.Math.generateUUID();

    this.userData = {};
  }

  performAction(shape:THREE.Shape) {
    // to be done by subclasses
  }
}

export default ShapeAction;
