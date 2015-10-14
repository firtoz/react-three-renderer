import THREE from 'three';
import THREEElementDescriptor from '../../THREEElementDescriptor';

import invariant from 'fbjs/lib/invariant';

import MoveToAction from '../../../Shapes/MoveToAction';

class ShapeActionDescriptorBase extends THREEElementDescriptor {
  setParent(threeObject, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Path, 'Shape action commands (%s) can only be added to shapes or paths.',
      this.constructor.name);

    super.setParent(threeObject, parentObject3D);
  }
}

export default ShapeActionDescriptorBase;
