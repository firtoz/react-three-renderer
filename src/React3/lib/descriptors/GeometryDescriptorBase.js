import THREE from 'three';
import THREEElementDescriptor from './THREEElementDescriptor';

import invariant from 'fbjs/lib/invariant';

class GeometryDescriptorBase extends THREEElementDescriptor {
  setParent(geometry, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Mesh || parentObject3D instanceof THREE.PointCloud, 'Parent is not a mesh');
    invariant(parentObject3D.geometry === undefined, 'Parent already has a geometry');

    parentObject3D.geometry = geometry;
  }

  unmount(geometry) {
    const parent = geometry.userData.parentMarkup.threeObject;

    if (parent.geometry === geometry) {
      parent.geometry = undefined;
    }

    geometry.dispose();
  }
}

export default GeometryDescriptorBase;
