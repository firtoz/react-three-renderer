import THREE from 'three.js';

import ShapeAction from './ShapeAction';

class BezierCurveToAction extends ShapeAction {
  constructor(cp1X, cp1Y,
              cp2X, cp2Y,
              aX, aY) {
    super();

    this.cp1X = cp1X;
    this.cp1Y = cp1Y;
    this.cp2X = cp2X;
    this.cp2Y = cp2Y;
    this.aX = aX;
    this.aY = aY;
  }

  performAction(shape:THREE.Shape) {
    shape.bezierCurveTo(
      this.cp1X, this.cp1Y,
      this.cp2X, this.cp2Y,
      this.aX, this.aY
    );
  }
}

export default BezierCurveToAction;
