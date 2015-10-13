import THREE from 'three';

/**
 * @abstract
 */
class ShapeAction {
  constructor() {
    this.uuid = THREE.Math.generateUUID();
  }

  performAction(shape:THREE.Shape) {
    // to be done by subclasses
  }
}

export default ShapeAction;
