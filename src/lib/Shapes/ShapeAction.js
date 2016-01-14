import THREE from 'three';

/**
 * @abstract
 */
class ShapeAction {
  constructor() {
    this.uuid = THREE.Math.generateUUID();

    this.userData = {};
  }

  performAction(shape:THREE.Shape) { // eslint-disable-line no-unused-vars
    // to be done by subclasses
  }
}

module.exports = ShapeAction;
