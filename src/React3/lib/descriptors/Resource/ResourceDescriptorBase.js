import THREEElementDescriptor from './../THREEElementDescriptor';
import invariant from 'fbjs/lib/invariant';
import THREE from 'three';
import ResourceContainer from './../../Resources/ResourceReference';

class ResourceDescriptorBase extends THREEElementDescriptor {
  constructor(react3RendererInstance:React3Renderer) {
    super(react3RendererInstance);
  }

  construct(props) {
    invariant(props.hasOwnProperty('resourceId'), 'A resource type must have a property named "resourceId"!');

    return new ResourceContainer(props.resourceId);
  }

  applyInitialProps(self, props) {
    super.applyInitialProps(self, props);

    self.userData.resourceMap = [];
    self.userData._eventCleanupQueue = [];
    self.userData._chosenResource = undefined;
    self.userData._debug = props.debug || false;
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

  setParent(self, parentObject3D) {
    super.setParent(self, parentObject3D);

    invariant(parentObject3D[self.userData._propertySlot] === undefined, 'Parent already has a ' + self.userData._propertySlot + ' defined');

    invariant(self.userData._eventCleanupQueue.length === 0, 'Changing parents?');

    let currentParentMarkup = parentObject3D.userData.markup;

    const onResourceAdded = this._onResourceAdded.bind(this, self);
    const onResourceRemoved = this._onResourceRemoved.bind(this, self);

    const parentEvents = currentParentMarkup.userData.events;
    parentEvents.on('resource.added', onResourceAdded);
    parentEvents.on('resource.removed', onResourceRemoved);

    self.userData._eventCleanupQueue.push(() => {
      parentEvents.removeListener('resource.added', onResourceAdded);
      parentEvents.removeListener('resource.removed', onResourceRemoved);
    });

    let distance = 0;

    while (currentParentMarkup) {
      const parentResources = currentParentMarkup.userData._resources;

      if (parentResources) {
        if (self.userData._debug) {
          debugger;
        }

        const resourceId = self.resourceId;
        const resourceInParent = parentResources.resourceIds[resourceId];

        if (resourceInParent) {
          this._addResource(self, {
            id: resourceId,
            distance,
            resource: resourceInParent,
          });
        }
      }

      distance++;
      currentParentMarkup = currentParentMarkup.userData.parentMarkup;
    }

    this._updateResource(self);
  }

  _onResourceAdded(self, resourceInfo) {
    if (self.resourceId !== resourceInfo.id) {
      return;
    }

    if (self.userData._debug) {
      debugger;
    }

    this._addResource(self, resourceInfo);

    this._updateResource(self);
  }

  _addResource(self, resourceInfo) {
    const resourceMap = self.userData.resourceMap;

    let i;

    for (i = 0; i < resourceMap.length; ++i) {
      if (resourceMap[i].distance > resourceInfo.distance) {
        break;
      }
    }

    resourceMap.splice(i, 0, {
      distance: resourceInfo.distance,
      resource: resourceInfo.resource,
    });
  }

  _onResourceRemoved(self, resourceInfo) {
    if (self.resourceId !== resourceInfo.id) {
      return;
    }

    if (self.userData._debug) {
      debugger;
    }

    const resourceMap = self.userData.resourceMap;

    for (let i = 0; i < resourceMap.length; ++i) {
      if (resourceMap[i].distance === resourceInfo.distance) {
        resourceMap.splice(i, 1);

        this._updateResource(self);
        return;
      }
    }

    invariant(false, 'This resource was not in this map?');
  }

  resourceUpdated(self, newResource, oldResource) {
    const parentObject = self.userData.parentMarkup && self.userData.parentMarkup.threeObject || undefined;

    if (self.userData._debug) {
      debugger;
    }

    if (parentObject) {
      const propertySlot = self.userData._propertySlot;
      parentObject[propertySlot] = newResource;

      if (newResource === null) {
        // invariant(false, 'Could not find resource named ' + self.resourceId);
      } else {
        newResource.userData._references.push(parentObject);
      }

      if (oldResource) {
        const removalIndex = oldResource.userData._references.indexOf(parentObject);

        invariant(removalIndex !== -1, 'Bad reference count for resource');

        oldResource.userData._references.splice(removalIndex, 1);
      }
    }
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
