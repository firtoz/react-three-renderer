eimport
THREE
from
'three';

import ShapeAction from './ShapeAction';

class AbsEllipseAction extends ShapeAction {
  constructor(x,
              y,
              xRadius,
              yRadius,
              startAngle,
              endAngle,
              clockwise) {
    super();

    this.x = x;
    this.y = y;
    this.xRadius = xRadius;
    this.yRadius = yRadius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.clockwise = clockwise;
  }

  performAction(shape:THREE.Shape) {
    shape.absarc(
      this.x, this.y,
      this.radius, this.startAngle,
      this.endAngle, this.clockwise
    );
  }
}
export default AbsEllipseAction;
