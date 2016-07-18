import React3 from '../../../../';
import THREE from 'three';
import ReactUpdates from 'react/lib/ReactUpdates';

import SyntheticMouseEvent from 'react/lib/SyntheticMouseEvent';

import Module from '../../../../lib/Module';

import PropTypes from 'react/lib/ReactPropTypes';

const tempVector2 = new THREE.Vector2();

const listenerCallbackNames = {
  mousedown: 'onMouseDown',
  mouseup: 'onMouseUp',
};

const mouseEvents = [
  'onMouseEnter',
  'onMouseLeave',
  'onMouseDown',
  'onMouseUp',
  'onClick',
];

const boolProps = {
  ignorePointerEvents: false,
};

class MouseInput extends Module {
  constructor() {
    super();

    this._isReady = false;
    this._active = true;
    this._restrictIntersections = false;
    this._objectsToIntersect = null;

    this._restrictedIntersectionRecursive = false;

    this._patchedDescriptors = [];
  }

  // noinspection JSUnusedGlobalSymbols
  setup(react3RendererInstance) {
    super.setup(react3RendererInstance);

    const Object3DDescriptor = react3RendererInstance.threeElementDescriptors.object3D.constructor;

    Object.values(react3RendererInstance.threeElementDescriptors).forEach(elementDescriptor => {
      if (elementDescriptor instanceof Object3DDescriptor) {
        mouseEvents.forEach(eventName => {
          elementDescriptor.hasEvent(eventName);
        });

        Object.keys(boolProps).forEach(propName => {
          elementDescriptor.hasProp(propName, {
            type: PropTypes.bool,
            update(threeObject, value, hasProp) {
              if (hasProp) {
                threeObject.userData[propName] = value;
              } else {
                threeObject.userData[propName] = boolProps[propName];
              }
            },
            default: boolProps[propName],
          });
        });

        this._patchedDescriptors.push(elementDescriptor);
      }
    });
  }

  isReady() {
    return this._isReady;
  }

  setActive(active) {
    this._active = active;
  }

  restrictIntersections(objects, recursive = false) {
    this._restrictIntersections = true;
    this._objectsToIntersect = objects;

    this._restrictedIntersectionRecursive = recursive;
  }

  ready(scene, container, camera) {
    this._isReady = true;

    this._scene = scene;
    this._container = container;
    this._camera = camera;

    this._raycaster = new THREE.Raycaster();
    this._mouse = new THREE.Vector2();

    this._onMouseMove = (event) => {
      this._mouse.set(event.clientX, event.clientY);

      if (!this._active) {
        this._updateEnterLeave();
      }
    };

    this._containerRect = this._container.getBoundingClientRect();

    this._hoverObjectMap = {};

    document.addEventListener('mousemove', this._onMouseMove, false);

    this._intersectionsForClick = null;

    this._caughtListenersCleanupFunctions = [];

    Object.keys(listenerCallbackNames).forEach(eventName => {
      let boundListener;

      const listenerCallbackName = listenerCallbackNames[eventName];
      switch (eventName) {
        case 'mousedown':
          boundListener = this._onMouseDown.bind(this, listenerCallbackName);
          break;
        case 'mouseup':
          boundListener = this._onMouseUp.bind(this, listenerCallbackName);
          break;
        default:
          break;
      }

      if (boundListener) {
        container.addEventListener(eventName, boundListener, true);

        this._caughtListenersCleanupFunctions.push(() => {
          container.removeEventListener(eventName, boundListener, true);
        });
      }
    });
  }

  _onMouseDown = (callbackName, mouseEvent) => {
    ReactUpdates.batchedUpdates(() => {
      const {
        event,
        intersections,
      } = this._intersectAndDispatch(callbackName, mouseEvent);

      if (event.isDefaultPrevented() || event.isPropagationStopped()) {
        this._intersectionsForClick = null;
      } else {
        this._intersectionsForClick = intersections;
      }
    });
  };

  _onMouseUp = (callbackName, mouseEvent) => {
    ReactUpdates.batchedUpdates(() => {
      const {
        event,
        intersections,
      } = this._intersectAndDispatch(callbackName, mouseEvent);

      if (!(event.isDefaultPrevented() || event.isPropagationStopped())) {
        if (this._intersectionsForClick === null) {
          return;
        }

        // intersect current intersections with the intersections for click
        //   call xzibit ASAP we have a good one son
        //     it wasn't that good

        const intersectionUUIDMap = this._intersectionsForClick.reduce((map, intersection) => {
          map[intersection.object.uuid] = intersection;

          return map;
        }, {});

        for (let i = 0; i < intersections.length; ++i) {
          if (event.isDefaultPrevented() || event.isPropagationStopped()) {
            return;
          }

          const intersection = intersections[i];

          const object = intersection.object;

          const uuid = object.uuid;

          if (intersectionUUIDMap[uuid]) {
            // oh boy oh boy here we go, we got a clicker

            React3.eventDispatcher
              .dispatchEvent(object, 'onClick',
                this._createSyntheticMouseEvent('click', event), intersection);
          }
        }
      }
    });

    this._intersectionsForClick = null;
  };

  _createSyntheticMouseEvent(eventType, prototype) {
    return SyntheticMouseEvent.getPooled(null, null,
      new MouseEvent(eventType, prototype), prototype.target);
  }

  _intersectAndDispatch(callbackName, mouseEvent) {
    const event = SyntheticMouseEvent.getPooled(null, null, mouseEvent, mouseEvent.target);

    const intersections = this._getIntersections(tempVector2.set(event.clientX, event.clientY));

    ReactUpdates.batchedUpdates(() => {
      for (let i = 0; i < intersections.length; ++i) {
        const intersection = intersections[i];

        if (event.isDefaultPrevented() || event.isPropagationStopped()) {
          return;
        }

        const object = intersection.object;

        React3.eventDispatcher.dispatchEvent(object, callbackName, event, intersection);
      }
    });

    return {
      event,
      intersections,
    };
  }

  _getIntersections(mouseCoords) {
    const relativeMouseCoords = this._getRelativeMouseCoords(mouseCoords);

    this._raycaster.setFromCamera(relativeMouseCoords, this._camera);

    if (this._restrictIntersections) {
      return this._raycaster.intersectObjects(this._objectsToIntersect,
        this._restrictedIntersectionRecursive);
    }

    return this._raycaster.intersectObject(this._scene, true);
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   *
   * @param {THREE.Vector2} mouseCoords usually an event's clientX and clientY
   * @returns {THREE.Ray}
   */
  getCameraRay(mouseCoords) {
    const relativeMouseCoords = this._getRelativeMouseCoords(mouseCoords);

    const originalRay = this._raycaster.ray.clone();

    this._raycaster.setFromCamera(relativeMouseCoords, this._camera);

    const resultRay = this._raycaster.ray.clone();

    this._raycaster.ray.copy(originalRay);

    return resultRay;
  }

  // noinspection JSUnusedGlobalSymbols
  intersectObject(mouseCoords, object, recursive = false) {
    const relativeMouseCoords = this._getRelativeMouseCoords(mouseCoords);

    const originalRay = this._raycaster.ray.clone();

    this._raycaster.setFromCamera(relativeMouseCoords, this._camera);

    const intersections = this._raycaster.intersectObject(object, recursive);

    this._raycaster.ray.copy(originalRay);

    return intersections;
  }

  containerResized() {
    this._containerRect = this._container.getBoundingClientRect();
  }

  update() {
    if (!this._isReady) {
      return;
    }

    if (this._active) {
      this._updateEnterLeave();
    }
  }

  _updateEnterLeave() {
    const intersections = this._getIntersections(this._mouse);

    const hoverMapToUpdate = {
      ...this._hoverObjectMap,
    };

    const mouseEnterEvent = this._createSyntheticMouseEvent('mouseEnter', {
      target: this._container,
      clientX: this._mouse.x,
      clientY: this._mouse.y,
    });

    // find first intersection that does not ignore pointer events
    for (let depth = 0; depth < intersections.length; ++depth) {
      const intersection = intersections[depth];
      const object = intersection.object;

      if (object.userData && object.userData.ignorePointerEvents) {
        continue;
      }

      const uuid = object.uuid;

      if (this._hoverObjectMap[uuid]) {
        delete hoverMapToUpdate[uuid];

        // just update that intersection
        this._hoverObjectMap[uuid].intersection = intersection;
      } else {
        this._hoverObjectMap[uuid] = {
          object,
          intersection,
        };

        if (!(mouseEnterEvent.isDefaultPrevented() || mouseEnterEvent.isPropagationStopped())) {
          React3.eventDispatcher.dispatchEvent(object, 'onMouseEnter',
            mouseEnterEvent, intersection, depth);
        }
      }

      // we have found the first solid intersection, don't go further
      break;
    }

    const mouseLeaveEvent = this._createSyntheticMouseEvent('mouseLeave', {
      target: this._container,
      clientX: this._mouse.x,
      clientY: this._mouse.y,
    });

    // delete all unseen uuids in hover map
    const unseenUUIDs = Object.keys(hoverMapToUpdate);

    for (let i = 0; i < unseenUUIDs.length; ++i) {
      const uuid = unseenUUIDs[i];

      if (!(mouseLeaveEvent.isDefaultPrevented() || mouseLeaveEvent.isPropagationStopped())) {
        React3.eventDispatcher.dispatchEvent(this._hoverObjectMap[uuid].object,
          'onMouseLeave', mouseLeaveEvent);
      }

      delete this._hoverObjectMap[uuid];
    }
  }

  _getRelativeMouseCoords(screenMouseCoords) {
    const containerRect = this._containerRect;

    const relativeMouseCoords = screenMouseCoords.clone()
      .sub(tempVector2.set(containerRect.left, containerRect.top))
      .divide(tempVector2.set(containerRect.width, containerRect.height));

    // mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    // mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    relativeMouseCoords.x = relativeMouseCoords.x * 2 - 1;
    relativeMouseCoords.y = -relativeMouseCoords.y * 2 + 1;

    return relativeMouseCoords;
  }

  // noinspection JSUnusedGlobalSymbols
  dispose() {
    document.removeEventListener('mousemove', this._onMouseMove, false);

    this._caughtListenersCleanupFunctions.forEach(cleanupFunction => cleanupFunction());
    delete this._caughtListenersCleanupFunctions;

    delete this._onMouseMove;

    this._patchedDescriptors.forEach(elementDescriptor => {
      const allProps = Object.keys(boolProps)
        .concat(mouseEvents);

      allProps.forEach(propName => {
        elementDescriptor.removeProp(propName);
      });
    });
  }
}

export default MouseInput;
