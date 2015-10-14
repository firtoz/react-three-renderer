import THREE from 'three';

import ShapeAction from './ShapeAction';

class AbsEllipseAction extends ShapeAction {
  constructor(x,
              y,
              xRadius,
              yRadius,
              startAngle,
              endAngle,
              clockwise,
              rotation) {
    super();

    this.x = x;
    this.y = y;
    this.xRadius = xRadius;
    this.yRadius = yRadius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.clockwise = clockwise;
    this.rotation = rotation;
  }

  performAction(shape:THREE.Shape) {
    shape.absellipse(
      this.x, this.y,
      this.xRadius, this.yRadius,
      this.startAngle, this.endAngle,
      this.clockwise,
      this.rotation
    );
  }
}
export default AbsEllipseAction;
