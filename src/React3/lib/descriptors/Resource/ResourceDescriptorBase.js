import THREEElementDescriptor from './../THREEElementDescriptor';
import invariant from 'fbjs/lib/invariant';
import THREE from 'three';

class ResourceDescriptorBase extends THREEElementDescriptor {
  constructor(react3RendererInstance:React3Renderer) {
    super(react3RendererInstance);
  }

  applyInitialProps(self, props) {
    super.applyInitialProps(self, props);

    self.userData.resourceMap = [];
    self.userData._eventCleanupQueue = [];
    self.userData._chosenResource = undefined;
  }

  unmount(self) {
    self.userData._eventCleanupQueue.forEach(cleanup => {
      cleanup();
    });

    delete self.userData._eventCleanupQueue;
    delete self.userData.resourceMap;
    self.userData._chosenResource = null;

    const chosenResource = null;
    const oldResource = self.userData._chosenResource;
    if (oldResource !== chosenResource) {
      self.userData._chosenResource = chosenResource;

      this.resourceUpdated(self, chosenResource, oldResource);
    }

    super.unmount(self);
  }

  setParent(self, parentObject) {
    super.setParent(self, parentObject);

    invariant(self.userData._eventCleanupQueue.length === 0, "Changing parents?");

    let currentParentMarkup = parentObject.userData.markup;

    let distance = 1;

    while (currentParentMarkup) {
      const onResourceAdded = this._onResourceAdded.bind(this, self, distance);
      const onResourceRemoved = this._onResourceRemoved.bind(this, self, distance);

      const parentEvents = currentParentMarkup.userData.events;

      self.userData._eventCleanupQueue.push(() => {
        parentEvents.removeListener('resource.added', onResourceAdded);
        parentEvents.removeListener('resource.removed', onResourceRemoved);
      });

      const parentResources = currentParentMarkup.userData._resources;

      if (parentResources) {
        const resourceId = self.resourceId;
        const resourceInParent = parentResources.resourceIds[resourceId];

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
    if (self.resourceId !== resourceInfo.id) {
      return;
    }

    this._addResource(self, resourceInfo.distance, resourceInfo);

    this._updateResource(self);
  }

  _addResource(self, distance, resourceInfo) {
    const resourceMap = self.userData.resourceMap;

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
    if (self.resourceId !== resourceInfo.id) {
      return;
    }

    const resourceMap = self.userData.resourceMap;

    for (let i = 0; i < resourceMap.length; ++i) {
      if (resourceMap[i].distance === distance) {
        resourceMap.splice(i, 1);

        this._updateResource(self);
        return;
      }
    }

    invariant(false, 'This resource was not in this map?');
  }

  resourceUpdated(self, newResource, oldResource) { // eslint-disable-line no-unused-vars
    // needs to be handled by children!
  }

  _updateResource(self) {
    const resourceMap = self.userData.resourceMap;

    let chosenResource = null;

    if (resourceMap.length > 0) {
      chosenResource = resourceMap[0].resource;
    }

    const oldResource = self.userData._chosenResource;
    if (oldResource !== chosenResource) {
      self.userData._chosenResource = chosenResource;

      this.resourceUpdated(self, chosenResource, oldResource);
    }
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

export default ResourceDescriptorBase;
