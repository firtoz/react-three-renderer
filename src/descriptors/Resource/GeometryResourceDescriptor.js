import ResourceDescriptorBase from './ResourceDescriptorBase';
import THREE from 'three.js';

import invariant from 'fbjs/lib/invariant';

class GeometryResourceDescriptor extends ResourceDescriptorBase {
  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    threeObject.userData._propertySlot = 'geometry';
  }

  setParent(threeObject, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Mesh
      || parentObject3D instanceof THREE.Points
      || parentObject3D instanceof THREE.Line, 'Parent is not a mesh');

    super.setParent(threeObject, parentObject3D);
  }
}

module.exports = GeometryResourceDescriptor;
