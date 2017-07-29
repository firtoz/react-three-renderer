import * as THREE from 'three';

import ShapeAction from './ShapeAction';

class QuadraticCurveToAction extends ShapeAction {
  constructor(cpX, cpY,
              x, y) {
    super();

    this.cpX = cpX;
    this.cpY = cpY;
    this.x = x;
    this.y = y;
  }

  performAction(shape: THREE.Shape) {
    shape.quadraticCurveTo(
      this.cpX,
      this.cpY,
      this.x,
      this.y,
    );
  }
}

module.exports = QuadraticCurveToAction;
