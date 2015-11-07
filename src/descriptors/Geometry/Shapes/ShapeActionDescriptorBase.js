import THREE from 'three.js';
import THREEElementDescriptor from '../../THREEElementDescriptor';

import invariant from 'fbjs/lib/invariant';

import HoleAction from '../../../Shapes/HoleAction';

class ShapeActionDescriptorBase extends THREEElementDescriptor {
  setParent(threeObject, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Path
      || parentObject3D instanceof HoleAction,
      'Shape action commands (%s) can only be added to shapes, paths or holes.',
      this.constructor.name);

    super.setParent(threeObject, parentObject3D);
  }

  highlight(threeObject) {
    const parentObject = threeObject.userData.markup.parentMarkup.threeObject;

    parentObject.userData._descriptor.highlight(parentObject);
  }

  getBoundingBoxes(threeObject) {
    const parentObject = threeObject.userData.markup.parentMarkup.threeObject;

    return parentObject.userData._descriptor.getBoundingBoxes(parentObject);
  }
}

export default ShapeActionDescriptorBase;
