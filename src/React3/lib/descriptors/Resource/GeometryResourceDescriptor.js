import ResourceDescriptorBase from './ResourceDescriptorBase';
import THREE from 'three';

import invariant from 'fbjs/lib/invariant';

class GeometryResourceDescriptor extends ResourceDescriptorBase {
  applyInitialProps(self, props) {
    super.applyInitialProps(self, props);

    self.userData._propertySlot = 'geometry';
  }

  setParent(self, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Mesh || parentObject3D instanceof THREE.PointCloud, 'Parent is not a mesh');

    super.setParent(self, parentObject3D);
  }


  resourceUpdated(self, newResource, oldResource) {
    let fixedResource;
    if (newResource && newResource.clone) {
      fixedResource = newResource.clone();

      fixedResource.userData = {
        ... newResource.userData,
        _isClone: true,
      };
    } else {
      fixedResource = newResource;
    }

    if (oldResource && oldResource.userData._isClone) {
      oldResource.dispose();
    }

    return super.resourceUpdated(self, fixedResource, oldResource);
  }
}

export default GeometryResourceDescriptor;
