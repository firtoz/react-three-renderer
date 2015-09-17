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
