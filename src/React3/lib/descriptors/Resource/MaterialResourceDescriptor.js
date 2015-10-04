import ResourceDescriptorBase from './ResourceDescriptorBase';
import THREE from 'three';

import invariant from 'fbjs/lib/invariant';

class MaterialResourceDescriptor extends ResourceDescriptorBase {
  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    if (props.hasOwnProperty('slot')) {
      threeObject.userData._propertySlot = props.slot;
    } else {
      threeObject.userData._propertySlot = 'material';
    }
  }

  setParent(threeObject, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Mesh || parentObject3D instanceof THREE.Points, 'Parent is not a mesh');

    super.setParent(threeObject, parentObject3D);
  }
}

export default MaterialResourceDescriptor;
