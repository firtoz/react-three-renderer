import ResourceDescriptorBase from './ResourceDescriptorBase';
import THREE from 'three';

import invariant from 'fbjs/lib/invariant';

class MaterialResourceDescriptor extends ResourceDescriptorBase {
  applyInitialProps(self, props) {
    super.applyInitialProps(self, props);

    if (props.hasOwnProperty('slot')) {
      self.userData._propertySlot = props.slot;
    } else {
      self.userData._propertySlot = 'material';
    }
  }

  setParent(self, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Mesh || parentObject3D instanceof THREE.PointCloud, 'Parent is not a mesh');

    super.setParent(self, parentObject3D);
  }
}

export default MaterialResourceDescriptor;
