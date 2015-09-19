import THREE from 'three';
import THREEElementDescriptor from './../THREEElementDescriptor';
import invariant from 'fbjs/lib/invariant';

import ResourceContainer from './../../Resources/Container';

class ResourcesDescriptor extends THREEElementDescriptor {
  construct() {
    return new ResourceContainer();
  }

  unmount(self) {
    const parentMarkup = self.userData.parentMarkup;
    const parentEvents = parentMarkup.userData.events;

    self.resourceIds.forEach(id => {
      parentEvents.emit('resource.removed', {
        id,
        distance: 0,
      });
    });

    super.unmount(self);
  }

  addChildren(self, children) {
    children.forEach(child => {
      const resourceId = child.userData._resourceId;

      self.resourceIds.push(resourceId);

      self.resourceMap[resourceId] = child;

      const parentMarkup = self.userData.parentMarkup;
      if (parentMarkup) {
        parentMarkup.userData.events.emit('resource.added', {
          id: resourceId,
          distance: 0,
          resource: child,
        });
      }
    });
  }

  removeChild(self, child) {
    const resourceId = child.userData._resourceId;

    delete self.resourceIds[resourceId];

    const parentMarkup = self.userData.parentMarkup;
    if (parentMarkup) {
      parentMarkup.userData.events.emit('resource.removed', {
        id: resourceId,
        distance: 0,
      });
    }
  }

  setParent(self, parentObject) {
    super.setParent(self, parentObject);

    const parentEvents = parentObject.userData.events;

    parentObject.userData._resources = self;

    self.resourceIds.forEach(id => {
      parentEvents.emit('resource.added', {
        id,
        distance: 0,
        resource: self.resourceMap[id],
      });
    });
  }

  highlight(threeObject) {
    const ownerObject = threeObject.userData.parentMarkup.threeObject;
    threeObject.userData.events.emit('highlight', {
      uuid: threeObject.uuid,
      boundingBoxFunc: () => {
        const boundingBox = new THREE.Box3();

        boundingBox.setFromObject(ownerObject);

        return [boundingBox];
      },
    });
  }

  hideHighlight(threeObject) {
    threeObject.userData.events.emit('hideHighlight');
  }
}

export default ResourcesDescriptor;
