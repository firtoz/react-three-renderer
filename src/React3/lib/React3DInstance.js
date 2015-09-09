import THREE from 'three';
import invariant from 'fbjs/lib/invariant.js';
import Viewport from './Viewport';
import ReactUpdates from 'react/lib/ReactUpdates';

import events from 'events';

const {EventEmitter} = events;

import CameraUtils from './utils/Camera';

const rendererProperties = [
  'gammaInput',
  'gammaOutput',
  'shadowMapEnabled',
];

class React3DInstance {
  constructor(props) {
    const {
      mainCamera,
      viewports,
      canvas,
      width,
      height,
      onAnimate,
      antialias,
      } = props;

    this._scene = null;
    this._mainCameraName = mainCamera;
    this._viewports = viewports || [];
    this._canvas = canvas;
    this._renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: antialias});

    if (props.hasOwnProperty('pixelRatio')) {
      this._renderer.setPixelRatio(props.pixelRatio);
    }

    if (props.hasOwnProperty('clearColor')) {
      this._renderer.setClearColor(props.clearColor);
    }

    rendererProperties.forEach(propertyName => {
      if (props.hasOwnProperty(propertyName)) {
        this._renderer[propertyName] = props[propertyName];
      }
    });

    this._width = width;
    this._height = height;
    this._renderer.setSize(this._width, this._height);
    this._onAnimate = onAnimate;
    this._objectsByUUID = {};
    this._objectsByName = {};

    this._lastRenderMode = null;

    this._events = new EventEmitter();

    this._events.on('animate', this._callOnAnimate);

    this._renderRequest = requestAnimationFrame(this._render);
  }

  getObjectsByName(objectName) {
    const objectsByName = this._objectsByName[objectName];

    let result;

    if (objectsByName) {
      const idToObjectMap = objectsByName.values;
      result = Object.keys(idToObjectMap)
        .map((name) => idToObjectMap[name]);
    } else {
      result = [];
    }

    return result;
  }

  addAnimateListener(callback) {
    this._events.on('animate', callback);
  }

  removeAnimateListener(callback) {
    this._events.removeListener('animate', callback);
  }

  addBeforeRenderListener(callback) {
    this._events.on('preRender', callback);
  }

  removeBeforeRenderListener(callback) {
    this._events.removeListener('preRender', callback);
  }

  _callOnAnimate = () => {
    if (this._onAnimate) {
      ReactUpdates.batchedUpdates(this._onAnimate);
    }
  };

  addViewport(viewport) {
    this._viewports.push(viewport);
  }

  addChildren(children) {
    children.forEach(child => {
      if (child instanceof THREE.Scene) {
        this.setScene(child);
      } else if (child instanceof Viewport) {
        this.addViewport(child);
      } else {
        invariant(false, 'The react3 component should only contain viewports or scenes.');
      }
    });
    // const scenes = children.filter()
    // invariant(children.length === 1 && children[0] instanceof THREE.Scene, 'The react3 component should only have one scene as a child!');

    // self.setScene(children[0]);
  }

  _render = () => {
    this._renderRequest = requestAnimationFrame(this._render);

    if (!this._scene) {
      return;
    }

    this._events.emit('animate');

    let mainCamera = null;

    if (this._mainCameraName) {
      const objectsWithMainCameraName = this._objectsByName[this._mainCameraName];

      if (objectsWithMainCameraName) {
        invariant(objectsWithMainCameraName.count < 2, 'There are multiple objects with name ' + this._mainCameraName);

        if (objectsWithMainCameraName.count > 0) {
          const values = objectsWithMainCameraName.values;
          mainCamera = values[Object.keys(values)[0]];
        }
      }
    }

    if (mainCamera) {
      if (this._lastRenderMode !== 'camera') {
        this._renderer.autoClear = true;
        this._renderer.setViewport(0, 0, this._width, this._height);
        this._lastRenderMode = 'camera';
      }
      CameraUtils.current = mainCamera;
      this._events.emit('preRender');
      this._renderer.render(this._scene, mainCamera);
      CameraUtils.current = null;
    } else if (this._viewports.length > 0) {
      if (this._lastRenderMode !== 'viewport') {
        this._renderer.autoClear = false;
        this._lastRenderMode = 'viewport';
      }

      this._renderer.clear();
      this._viewports.forEach(viewport => {
        let viewportCamera = null;

        if (viewport.cameraName) {
          const objectsWithViewportCameraName = this._objectsByName[viewport.cameraName];

          if (objectsWithViewportCameraName) {
            invariant(objectsWithViewportCameraName.count < 2, 'There are multiple objects with name ' + viewport.cameraName);

            if (objectsWithViewportCameraName.count > 0) {
              const values = objectsWithViewportCameraName.values;
              viewportCamera = values[Object.keys(values)[0]];
            }
          }
        }

        if (!viewportCamera) {
          return;
        }

        if (viewport.onBeforeRender) {
          ReactUpdates.batchedUpdates(viewport.onBeforeRender);
        }

        this._renderer.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);
        CameraUtils.current = viewportCamera;
        this._events.emit('preRender');
        this._renderer.render(this._scene, viewportCamera);
        CameraUtils.current = null;
      });
    }
  };

  setScene(scene) {
    this._scene = scene;
  }

  updateWidth(newWidth) {
    this._width = newWidth;
    this._renderer.setSize(this._width, this._height);
  }

  updateHeight(newHeight) {
    this._height = newHeight;
    this._renderer.setSize(this._width, this._height);
  }

  updateViewports(newViewports) {
    this._viewports = newViewports || [];
  }

  unmount() {
    this._events.removeListener('animate', this._callOnAnimate);
    this._events.removeAllListeners();
    delete this._events;

    cancelAnimationFrame(this._renderRequest);

    try {
      this._renderer.forceContextLoss();
    } finally {
      delete this._renderer;
    }

    delete this._canvas;
    delete this._canvasDisposed;

    invariant(Object.keys(this._objectsByUUID).length === 0, 'Failed to cleanup some child objects for React3DInstance');

    delete this._objectsByUUID;
    delete this._viewports;
    delete this._scene;
  }

  objectMounted(object) {
    invariant(!this._objectsByUUID[object.uuid], 'There already is an object with this uuid in the react 3d instance.');

    this._objectsByUUID[object.uuid] = object;

    object.userData.markup._rootInstance = this;

    this._addObjectWithName(object.name, object);

    object.userData.events.emit('addedIntoRoot');
  }

  objectRenamed(object, oldName, nextName) {
    this._removeObjectWithName(oldName, object);
    this._addObjectWithName(nextName, object);
  }

  _addObjectWithName(objectName, object) {
    if (!this._objectsByName[objectName]) {
      this._objectsByName[objectName] = {
        count: 0,
        values: {},
      };
    }

    this._objectsByName[objectName].values[object.uuid] = object;
    this._objectsByName[objectName].count++;
  }

  _removeObjectWithName(objectName, object) {
    invariant(this._objectsByName[objectName] && this._objectsByName[objectName].values[object.uuid] === object, 'The object\'s name changed somehow?\'');

    delete this._objectsByName[objectName].values[object.uuid];
    this._objectsByName[objectName].count--;

    if (this._objectsByName[objectName].count === 0) {
      delete this._objectsByName[objectName];
    }
  }

  objectRemoved(object) {
    invariant(this._objectsByUUID[object.uuid] === object, 'The removed object does not belong here!?');

    delete this._objectsByUUID[object.uuid];

    this._removeObjectWithName(object.name, object);
  }

  mountedIntoRoot() {
    const scene = this._scene;

    const allChildren = [scene];

    while (allChildren.length > 0) {
      const current:THREE.Object3D = allChildren.pop();

      this.objectMounted(current);

      for (let i = 0; i < current.children.length; ++i) {
        const child = current.children[i];

        allChildren.push(child);
      }
    }
  }
}

export default React3DInstance;
