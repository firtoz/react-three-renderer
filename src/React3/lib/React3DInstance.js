import THREE from 'three';
import invariant from 'fbjs/lib/invariant.js';
import ReactUpdates from 'react/lib/ReactUpdates';

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
    this._width = width;
    this._height = height;
    this._renderer.setSize(this._width, this._height);
    this._onAnimate = onAnimate;

    this._renderRequest = requestAnimationFrame(this._render);
    this._objectsByUUID = {};
    this._objectsByName = {};
  }

  _render = () => {
    this._renderRequest = requestAnimationFrame(this._render);

    if (this._onAnimate) {
      ReactUpdates.batchedUpdates(this._onAnimate);
    }

    let mainCamera = null;

    if (this._mainCameraName) {
      const objectsWithMainCameraName = this._objectsByName[this._mainCameraName];

      if (objectsWithMainCameraName) {
        invariant(objectsWithMainCameraName.length < 2, 'There are multiple objects with name ' + this._mainCameraName);

        if (objectsWithMainCameraName.length > 0) {
          mainCamera = objectsWithMainCameraName[0];
        }
      }
    }

    if (mainCamera) {
      this._renderer.autoClear = true;
      this._renderer.setViewport(0, 0, this._width, this._height);
      this._renderer.render(this._scene, mainCamera);
    } else if (this._viewports.length > 0) {
      this._renderer.autoClear = false;
      this._renderer.clear();
      this._viewports.forEach(viewport => {
        let viewportCamera = null;

        if (viewport.cameraName) {
          const objectsWithViewportCameraName = this._objectsByName[viewport.cameraName];

          if (objectsWithViewportCameraName) {
            invariant(objectsWithViewportCameraName.length < 2, 'There are multiple objects with name ' + viewport.cameraName);

            if (objectsWithViewportCameraName.length > 0) {
              viewportCamera = objectsWithViewportCameraName[0];
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
        this._renderer.render(this._scene, viewportCamera);
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
  }

  objectMounted(object) {
    invariant(!this._objectsByUUID[object.uuid], 'There already is an object with this uuid in the react 3d instance.');

    this._objectsByUUID[object.uuid] = object;

    object.userData.markup._rootInstance = this;

    this._addObjectWithName(object.name, object);
  }

  objectRenamed(object, oldName, nextName) {
    this._removeObjectWithName(oldName, object);
    this._addObjectWithName(nextName, object);
  }

  _addObjectWithName(objectName, object) {
    if (!this._objectsByName[objectName]) {
      this._objectsByName[objectName] = [];
    }

    this._objectsByName[objectName].push(object);
  }

  _removeObjectWithName(objectName, object) {
    const oldIndex = this._objectsByName[objectName].indexOf(object);

    invariant(oldIndex !== -1, 'The object\'s name changed somehow?\'');

    this._objectsByName[objectName].splice(oldIndex, 1);
    if (this._objectsByName[objectName].length === 0) {
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
