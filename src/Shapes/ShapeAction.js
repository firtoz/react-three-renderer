import THREE from 'three';

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
