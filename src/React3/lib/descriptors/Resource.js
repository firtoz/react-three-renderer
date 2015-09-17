import THREE from 'three';
import THREEElementDescriptor from './THREEElementDescriptor';
import invariant from 'fbjs/lib/invariant';

class Resource extends THREEElementDescriptor {
  constructor(react3RendererInstance:React3Renderer, type) {
    super(react3RendererInstance);
  }

  applyInitialProps(self, props) {
    super.applyInitialProps(self, props);

    invariant(props.hasOwnProperty('resourceId'), 'A resource type must have a property named "resourceId"!');

    self.userData._resourceId = props._resourceId;
    self.userData._resourceMap = [];
    self.userData._chosenResource = null;
  }

  unmount(self) {
    self.userData._eventCleanupQueue.forEach(cleanup => {
      cleanup();
    });

    delete self.userData._eventCleanupQueue;
    delete self.userData._resourceMap;
    self.userData._chosenResource = null;
  }

  setParent(self, parentObject) {
    super.setParent(self, parentObject);

    let currentParentMarkup = parentObject.userData.markup;

    let distance = 1;

    while (currentParentMarkup) {
      const onResourceAdded = this._onResourceAdded.bind(this, self, distance);
      const onResourceRemoved = this._onResourceRemoved.bind(this, self, distance);

      const parentEvents = currentParentMarkup.userData._events;

      self.userData._eventCleanupQueue.push(() => {
        parentEvents.removeListener('resource.added', onResourceAdded);
        parentEvents.removeListener('resource.removed', onResourceRemoved);
      });

      const parentResources = currentParentMarkup.userData._resources;

      if (parentResources) {
        const resourceId = self.userData._resourceId;
        const resourceInParent = parentResources._resourceIds[resourceId];

        if (resourceInParent) {
          this._addResource(self, distance, {
            id: resourceId,
            resource: resourceInParent,
          });
        }
      }

      parentEvents.on('resource.added', onResourceAdded);
      parentEvents.on('resource.removed', onResourceRemoved);

      currentParentMarkup = currentParentMarkup.userData.parentMarkup;
      distance++;
    }

    this._updateResource(self);
  }

  _onResourceAdded(self, distance, resourceInfo) {
    if (self.userData._resourceId !== resourceInfo.id) {
      return;
    }

    this._addResource(self, distance, resourceInfo);

    this._updateResource(self);
  }

  _addResource(self, distance, resourceInfo) {
    const resourceMap = self.userData._resourceMap;

    let i;

    for (i = 0; i < resourceMap.length; ++i) {
      if (resourceMap[i].distance > distance) {
        break;
      }
    }

    resourceMap.splice(i, 0, {
      distance,
      resource: resourceInfo.resource,
    });
  }

  _onResourceRemoved(self, distance, resourceInfo) {
    if (self.userData._resourceId !== resourceInfo.id) {
      return;
    }

    const resourceMap = self.userData._resourceMap;

    for (let i = 0; i < resourceMap.length; ++i) {
      if (resourceMap[i].distance === distance) {
        resourceMap.splice(i, 1);

        this._updateResource(self);
        return;
      }
    }

    invariant(false, 'This resource was not in this map?');
  }

  resourceUpdated(self) { // eslint-disable-line no-unused-vars
    // needs to be handled by children!
  }

  _updateResource(self) {
    const resourceMap = self.userData._resourceMap;

    let chosenResource = null;

    if (resourceMap.length > 0) {
      chosenResource = resourceMap[0];
    }

    if (self.userData._chosenResource !== chosenResource) {
      self.userData._chosenResource = chosenResource;

      this.resourceUpdated(self);
    }
  }
}

export default Resource;
