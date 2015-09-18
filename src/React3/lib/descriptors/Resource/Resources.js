import THREE from 'three';
import THREEElementDescriptor from './../THREEElementDescriptor';
import invariant from 'fbjs/lib/invariant';

import ResourceContainer from './../../Resources/Container';

class Resources extends THREEElementDescriptor {
  construct() {
    return new ResourceContainer();
  }

  unmount(self) {
    const parentMarkup = self.userData.parentMarkup;
    const parentEvents = parentMarkup.userData._events;

    self.resourceIds.forEach(id => {
      parentEvents.emit('resource.removed', {
        id,
      });
    });
  }

  addChildren(self, children) {
    // TODO
    children.forEach(child => {
      const resourceId = child.userData._resourceId;

      self.resourceIds.push(resourceId);

      self.resourceMap[resourceId] = child;

      const parentMarkup = self.userData.parentMarkup;
      if (parentMarkup) {
        parentMarkup.userData._events.emit('resource.added', {
          id: resourceId,
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
      parentMarkup.userData._events.emit('resource.removed', {
        id: resourceId,
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
        resource: self.resourceMap[id],
      });
    });
  }
}

export default Resources;
