import ResourceDescriptorBase from './ResourceDescriptorBase';
import THREE from 'three';

import invariant from 'fbjs/lib/invariant';

class GeometryResourceDescriptor extends ResourceDescriptorBase {
  applyInitialProps(self, props) {
    super.applyInitialProps(self, props);

    self.userData._propertySlot = 'geometry';
  }

  setParent(self, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Mesh || parentObject3D instanceof THREE.Points, 'Parent is not a mesh');

    super.setParent(self, parentObject3D);
  }

  resourceUpdated(self, newResource, oldResource) {
    if (self.userData.parentMarkup.threeObject.__webglInit) {
      // pretend the object has been removed so that the context can be reinitialized
      self.userData.parentMarkup.threeObject.dispatchEvent({type: 'removed'});
    }

    return super.resourceUpdated(self, newResource, oldResource);
  }
}

export default GeometryResourceDescriptor;
