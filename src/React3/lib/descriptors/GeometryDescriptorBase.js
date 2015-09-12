import THREE from 'three';
import THREEElementDescriptor from './THREEElementDescriptor';

import invariant from 'fbjs/lib/invariant';

class GeometryDescriptorBase extends THREEElementDescriptor {
  setParent(geometry, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Mesh || parentObject3D instanceof THREE.PointCloud, 'Parent is not a mesh');
    invariant(parentObject3D.geometry === undefined, 'Parent already has a geometry');

    parentObject3D.geometry = geometry;

    const parentMarkup = parentObject3D.userData.markup;

    if (parentMarkup && parentMarkup._rootInstance) {
      parentMarkup._rootInstance.objectMounted(self);
    }
  }


  applyInitialProps(self, props) {
    self.userData = {
      ...self.userData,
    };

    super.applyInitialProps(self, props);
  }

  unmount(geometry) {
    const parent = geometry.userData.parentMarkup.threeObject;

    if (parent.geometry === geometry) {
      parent.geometry = undefined;
    }

    geometry.dispose();
  }

  highlight(threeObject) {
    const ownerMesh = threeObject.userData.parentMarkup.threeObject;
    threeObject.userData.events.emit('highlight', {
      uuid: threeObject.uuid,
      boundingBoxFunc: () => {
        const boundingBox = new THREE.Box3();

        boundingBox.setFromObject(ownerMesh);

        return boundingBox;
      },
    });
  }

  hideHighlight(threeObject) {
    threeObject.userData.events.emit('hideHighlight');
  }
}

export default GeometryDescriptorBase;
