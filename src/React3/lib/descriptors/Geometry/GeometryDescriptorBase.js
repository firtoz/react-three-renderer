import THREE from 'three';
import THREEElementDescriptor from './../THREEElementDescriptor';

import invariant from 'fbjs/lib/invariant';

import resource from './../decorators/resource';

@resource class GeometryDescriptorBase extends THREEElementDescriptor {
  setParent(geometry, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Mesh || parentObject3D instanceof THREE.PointCloud, 'Parent is not a mesh');
    invariant(parentObject3D.geometry === undefined, 'Parent already has a geometry');

    super.setParent(geometry, parentObject3D);

    if (parentObject3D.__webglInit) {
      // pretend the object has been removed so that the context can be reinitialized
      parentObject3D.dispatchEvent({type: 'removed'});
    }

    parentObject3D.geometry = geometry;
  }


  applyInitialProps(self, props) {
    self.userData = {
      ...self.userData,
    };

    super.applyInitialProps(self, props);
  }

  unmount(geometry) {
    const parent = geometry.userData.parentMarkup.threeObject;

    // could either be a resource description or an actual geometry
    if (parent instanceof THREE.Mesh || parent instanceof THREE.PointCloud) {
      if (parent.geometry === geometry) {
        parent.geometry = undefined;
      }
    }

    geometry.dispose();

    super.unmount(geometry);
  }

  highlight(threeObject) {
    const ownerMesh = threeObject.userData.parentMarkup.threeObject;
    threeObject.userData.events.emit('highlight', {
      uuid: threeObject.uuid,
      boundingBoxFunc: () => {
        const boundingBox = new THREE.Box3();

        boundingBox.setFromObject(ownerMesh);

        return [boundingBox];
      },
    });
  }

  hideHighlight(threeObject) {
    threeObject.userData.events.emit('hideHighlight');
  }
}

export default GeometryDescriptorBase;
