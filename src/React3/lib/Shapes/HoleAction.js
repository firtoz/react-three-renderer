import THREE from 'three';

import ShapeAction from './ShapeAction';

class HoleAction extends ShapeAction {
  constructor() {
    super();

    this.path = new THREE.Path();
  }

  performAction(shape:THREE.Shape) {
    shape.holes.push(this.path);
  }
}

export default HoleAction;
