import THREE from 'three';
import THREEElementDescriptor from './THREEElementDescriptor';
import invariant from 'fbjs/lib/invariant';

class ResourceContainer extends THREE.Object3D {
  constructor() {
    this._resourceMap = {};
    this._resourceIds = [];
    this.userData = {};
  }
}

class Resources extends THREEElementDescriptor {
  construct() {
    return new ResourceContainer();
  }

  unmount(self) { // eslint-disable-line no-unused-vars
    // TODO
  }

  removeChild(self, child) {
    const resourceId = child.userData._resourceId;

    delete self._resourceIds[resourceId];

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

    self._resourceIds.forEach(id => {
      parentEvents.emit('resource.added', {
        id,
        resource: self._resourceMap[id],
      });
    });
  }
}

export default Resources;
