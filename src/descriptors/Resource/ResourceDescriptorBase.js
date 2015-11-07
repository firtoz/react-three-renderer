import THREEElementDescriptor from '../THREEElementDescriptor';
import invariant from 'fbjs/lib/invariant';
import ResourceReference from '../../Resources/ResourceReference';

import React3Renderer from '../../React3Renderer';

import PropTypes from 'react/lib/ReactPropTypes';

class ResourceDescriptorBase extends THREEElementDescriptor {
  constructor(react3RendererInstance:React3Renderer) {
    super(react3RendererInstance);

    this.hasProp('resourceId', {
      type: PropTypes.string.isRequired,
      update: this.triggerRemount,
      default: '',
    });
  }

  construct(props) {
    invariant(props.hasOwnProperty('resourceId'), 'A resource type must have a property named "resourceId"!');

    return new ResourceReference(props.resourceId);
  }

  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    threeObject.userData.resourceMap = [];
    threeObject.userData._eventCleanupQueue = [];
    threeObject.userData._chosenResource = undefined;
    threeObject.userData._debug = props.debug || false;

    threeObject.userData.events.once('addedIntoRoot', this._addedIntoRoot);
  }

  _addedIntoRoot = (threeObject) => {
    let currentParentMarkup = threeObject.userData.parentMarkup;

    let distance = 0;

    while (currentParentMarkup) {
      const parentResources = currentParentMarkup.threeObject.userData._resources;

      if (parentResources) {
        const resourceId = threeObject.resourceId;
        const resourceInParent = parentResources.resourceMap[resourceId];

        if (resourceInParent) {
          this._addResource(threeObject, {
            id: resourceId,
            distance,
            resource: resourceInParent,
          });
        }
      }

      distance++;
      currentParentMarkup = currentParentMarkup.threeObject.userData.parentMarkup;
    }

    this._updateResource(threeObject);
  };

  unmount(threeObject) {
    threeObject.userData._eventCleanupQueue.forEach(cleanup => {
      cleanup();
    });

    delete threeObject.userData._eventCleanupQueue;
    delete threeObject.userData.resourceMap;

    this.updateChosenResource(threeObject, null);

    super.unmount(threeObject);
  }

  updateChosenResource(threeObject, chosenResource) {
    const oldResource = threeObject.userData._chosenResource;
    if (oldResource !== chosenResource) {
      threeObject.userData._chosenResource = chosenResource;

      this.resourceUpdated(threeObject, chosenResource, oldResource);
    }
  }

  setParent(threeObject, parentObject3D) {
    const existingValueInSlot = parentObject3D[threeObject.userData._propertySlot];
    invariant(existingValueInSlot === undefined || existingValueInSlot === null, 'Parent already has a ' + threeObject.userData._propertySlot + ' defined');
    invariant(threeObject.userData._eventCleanupQueue.length === 0, 'Changing parents?');

    super.setParent(threeObject, parentObject3D);

    const currentParentMarkup = parentObject3D.userData.markup;

    const onResourceAdded = this._onResourceAdded.bind(this, threeObject);
    const onResourceRemoved = this._onResourceRemoved.bind(this, threeObject);

    const parentEvents = currentParentMarkup.threeObject.userData.events;
    parentEvents.on('resource.added', onResourceAdded);
    parentEvents.on('resource.removed', onResourceRemoved);

    threeObject.userData._eventCleanupQueue.push(() => {
      parentEvents.removeListener('resource.added', onResourceAdded);
      parentEvents.removeListener('resource.removed', onResourceRemoved);
    });
  }

  _onResourceAdded(threeObject, resourceInfo) {
    if (threeObject.resourceId !== resourceInfo.id) {
      return;
    }

    this._addResource(threeObject, resourceInfo);

    this._updateResource(threeObject);
  }

  _addResource(threeObject, resourceInfo) {
    const resourceMap = threeObject.userData.resourceMap;

    let i;

    for (i = 0; i < resourceMap.length; ++i) {
      if (resourceMap[i].distance === resourceInfo.distance) {
        if (resourceMap[i].resource !== resourceInfo.resource) {
          resourceMap[i].resource = resourceInfo.resource;
        }

        return;
      }

      if (resourceMap[i].distance > resourceInfo.distance) {
        break;
      }
    }

    resourceMap.splice(i, 0, {
      distance: resourceInfo.distance,
      resource: resourceInfo.resource,
    });
  }

  _onResourceRemoved(threeObject, resourceInfo) {
    if (threeObject.resourceId !== resourceInfo.id) {
      return;
    }

    const resourceMap = threeObject.userData.resourceMap;

    for (let i = 0; i < resourceMap.length; ++i) {
      if (resourceMap[i].distance === resourceInfo.distance) {
        if (resourceMap[i].resource === resourceInfo.resource) {
          resourceMap.splice(i, 1);

          this._updateResource(threeObject);
        }
        return;
      }
    }

    invariant(false, 'This resource was not in this map?');
  }

  applyToSlot(threeObject, parentObject, newResource) {
    const propertySlot = threeObject.userData._propertySlot;
    parentObject[propertySlot] = newResource;
  }

  resourceUpdated(threeObject, newResource, oldResource) {
    const parentObject = threeObject.userData.parentMarkup && threeObject.userData.parentMarkup.threeObject || undefined;

    if (parentObject) {
      this.applyToSlot(threeObject, parentObject, newResource);

      if (newResource === null) {
        // invariant(false, 'Could not find resource named ' + threeObject.resourceId);
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

  _updateResource(threeObject) {
    const resourceMap = threeObject.userData.resourceMap;

    let chosenResource = null;

    if (resourceMap.length > 0) {
      chosenResource = resourceMap[0].resource;
    }

    this.updateChosenResource(threeObject, chosenResource);
  }

  highlight(threeObject) {
    const ownerObject = threeObject.userData.parentMarkup.threeObject;
    ownerObject.userData._descriptor.highlight(ownerObject);
  }

  hideHighlight(threeObject) {
    const ownerObject = threeObject.userData.parentMarkup.threeObject;
    ownerObject.userData._descriptor.hideHighlight(ownerObject);
  }
}

export default ResourceDescriptorBase;
