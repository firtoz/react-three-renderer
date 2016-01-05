import THREE from 'three.js';

import ShapeAction from './ShapeAction';

class MoveToAction extends ShapeAction {
  constructor(x, y) {
    super();

    this.x = x;
    this.y = y;
  }

  performAction(shape:THREE.Shape) {
    shape.moveTo(this.x, this.y);
  }
}

module.exports = MoveToAction;
