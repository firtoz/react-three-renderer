import THREE from 'three';
import THREEElementDescriptor from '../THREEElementDescriptor';
import invariant from 'fbjs/lib/invariant';

import ResourceContainer from '../../Resources/ResourceContainer';

class ResourcesDescriptor extends THREEElementDescriptor {
  construct() {
    return new ResourceContainer();
  }

  unmount(threeObject) {
    const parentMarkup = threeObject.userData.markup.parentMarkup;
    const parentEvents = parentMarkup.threeObject.userData.events;

    threeObject.resourceIds.forEach(id => {
      parentEvents.emit('resource.removed', {
        id,
        distance: 0,
        resource: threeObject.resourceMap[id],
      });
    });

    super.unmount(threeObject);
  }

  addChildren(threeObject, children) {
    children.forEach(child => {
      const resourceId = child.userData._resourceId;

      if (process.env.NODE_ENV !== 'production') {
        invariant(!!resourceId, 'Resource container can only hold resources. ' +
          'Found children without `resourceId` properties:' +
          ` ${children.filter(currentChild => !currentChild.userData._resourceId)
            .map(currentChild =>
              `<${currentChild.userData.react3internalComponent._elementType}/>`)
            .join(', ')}.`);
      } else {
        invariant(!!resourceId);
      }

      threeObject.resourceIds.push(resourceId);

      threeObject.resourceMap[resourceId] = child;

      const parentMarkup = threeObject.userData.markup.parentMarkup;
      if (parentMarkup) {
        parentMarkup.threeObject.userData.events.emit('resource.added', {
          id: resourceId,
          distance: 0,
          resource: child,
        });
      }
    });
  }

  addChild(threeObject, child) {
    this.addChildren(threeObject, [child]);
  }

  removeChild(threeObject, child) {
    const resourceId = child.userData._resourceId;

    delete threeObject.resourceIds[resourceId];

    const parentMarkup = threeObject.userData.markup.parentMarkup;
    if (parentMarkup) {
      parentMarkup.threeObject.userData.events.emit('resource.removed', {
        id: resourceId,
        distance: 0,
        resource: child,
      });
    }
  }

  setParent(threeObject, parentObject) {
    super.setParent(threeObject, parentObject);

    const parentEvents = parentObject.userData.events;

    parentObject.userData._resources = threeObject;

    threeObject.resourceIds.forEach(id => {
      parentEvents.emit('resource.added', {
        id,
        distance: 0,
        resource: threeObject.resourceMap[id],
      });
    });
  }

  highlight(threeObject) {
    const ownerObject = threeObject.userData.markup.parentMarkup.threeObject;

    if (!(ownerObject.updateMatrixWorld && ownerObject.traverse)) {
      return;
    }

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

  moveChild() {
    // child order doesn't matter
  }
}

module.exports = ResourcesDescriptor;
