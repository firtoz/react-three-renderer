import ResourceDescriptorBase from './ResourceDescriptorBase';
import THREE from 'three.js';

import invariant from 'fbjs/lib/invariant';

import Uniform from '../../Uniform';

class TextureResourceDescriptor extends ResourceDescriptorBase {
  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    threeObject.userData._propertySlot = 'map';
  }

  applyToSlot(threeObject, parentObject3D, newResource) {
    if (parentObject3D instanceof THREE.Material) {
      super.applyToSlot(threeObject, parentObject3D, newResource);
      parentObject3D.dispose();
    } else if (parentObject3D instanceof Uniform) {
      parentObject3D.setValue(newResource);
    } else {
      invariant(false, 'Parent is not a material or a uniform');
    }
  }

  setParent(threeObject, parentObject3D) {
    if (parentObject3D instanceof THREE.Material) {
      super.setParent(threeObject, parentObject3D);
    } else if (parentObject3D instanceof Uniform) {
      threeObject.userData._propertySlot = 'value';
      super.setParent(threeObject, parentObject3D);
    } else {
      invariant(false, 'Parent is not a material or a uniform');
    }
  }
}

export default TextureResourceDescriptor;
