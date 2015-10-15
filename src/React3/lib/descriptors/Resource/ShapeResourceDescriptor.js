import ResourceDescriptorBase from './ResourceDescriptorBase';
import THREE from 'three';

import invariant from 'fbjs/lib/invariant';

class ShapeResourceDescriptor extends ResourceDescriptorBase {
  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    threeObject.userData._remountOnUpdate = true;
  }

  setParent(threeObject, parentObject3D) {
    invariant(parentObject3D instanceof THREE.ExtrudeGeometry
      || parentObject3D instanceof THREE.ExtrudeGeometry, 'Parent is not an extrude geometry');

    super.setParent(threeObject, parentObject3D);
  }


  applyToSlot(threeObject, parentObject, newResource) {
    debugger;
    //return super.applyToSlot(threeObject, parentObject, newResource);
  }
}

export default ShapeResourceDescriptor;
