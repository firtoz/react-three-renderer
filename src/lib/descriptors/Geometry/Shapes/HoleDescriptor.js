import PathDescriptorBase from './PathDescriptorBase';

import HoleAction from '../../../Shapes/HoleAction';

import invariant from 'fbjs/lib/invariant';

import THREE from 'three';

class HoleDescriptor extends PathDescriptorBase {
  construct() {
    return new HoleAction();
  }

  performChildAction(threeObject, child) {
    child.performAction(threeObject.path);
  }

  setParent(threeObject, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Shape, 'Holes can only be added to shapes.');

    return super.setParent(threeObject, parentObject3D);
  }
}

module.exports = HoleDescriptor;
