import THREE from 'three.js';

import ShapeAction from './ShapeAction';

class AbsArcAction extends ShapeAction {
  constructor(x,
              y,
              radius,
              startAngle,
              endAngle,
              clockwise) {
    super();

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.clockwise = clockwise;
  }

  performAction(shape:THREE.Shape) {
    shape.absarc(
      this.x, this.y,
      this.radius,
      this.startAngle, this.endAngle,
      this.clockwise
    );
  }
}

export default AbsArcAction;
