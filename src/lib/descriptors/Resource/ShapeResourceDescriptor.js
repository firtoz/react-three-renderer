import ResourceDescriptorBase from './ResourceDescriptorBase';
import THREE from 'three.js';

import invariant from 'fbjs/lib/invariant';

import ShapeResourceReference from '../../Resources/ShapeResourceReference';

class ShapeResourceDescriptor extends ResourceDescriptorBase {
  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    threeObject.userData._remountOnUpdate = true;
  }

  construct(props) {
    return new ShapeResourceReference(props.resourceId);
  }

  setParent(threeObject, parentObject3D) {
    invariant(parentObject3D instanceof THREE.ExtrudeGeometry
      || parentObject3D instanceof THREE.BufferGeometry, 'Parent is not an extrude geometry');

    super.setParent(threeObject, parentObject3D);
  }

  applyToSlot(threeObject, parentObject, newResource) {
    threeObject.userData.events.emit('resource.set', newResource);
  }
}

module.exports = ShapeResourceDescriptor;
