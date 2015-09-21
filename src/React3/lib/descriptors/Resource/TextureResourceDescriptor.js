import ResourceDescriptorBase from './ResourceDescriptorBase';
import THREE from 'three';

import invariant from 'fbjs/lib/invariant';

import Uniform from '../../Uniform';

class TextureResourceDescriptor extends ResourceDescriptorBase {
  applyInitialProps(self, props) {
    super.applyInitialProps(self, props);

    self.userData._propertySlot = 'map';
  }

  applyToSlot(self, parentObject3D, newResource) {
    if (parentObject3D instanceof THREE.Material) {
      super.applyToSlot(self, parentObject3D, newResource);
    } else if (parentObject3D instanceof Uniform) {
      debugger;
      parentObject3D.setValue(newResource);
    } else {
      invariant(false, 'Parent is not a material or a uniform');
    }
  }

  setParent(self, parentObject3D) {
    if (parentObject3D instanceof THREE.Material) {
      super.setParent(self, parentObject3D);
    } else if (parentObject3D instanceof Uniform) {
      self.userData._propertySlot = 'value';
      super.setParent(self, parentObject3D);
    } else {
      invariant(false, 'Parent is not a material or a uniform');
    }
  }
}

export default TextureResourceDescriptor;
