import ResourceDescriptorBase from './ResourceDescriptorBase';
import THREE from 'three';

import invariant from 'fbjs/lib/invariant';

class TextureResourceDescriptor extends ResourceDescriptorBase {
  applyInitialProps(self, props) {
    super.applyInitialProps(self, props);

    self.userData._propertySlot = 'map';
  }

  setParent(self, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Material, 'Parent is not a material');

    super.setParent(self, parentObject3D);
  }
}

export default TextureResourceDescriptor;
