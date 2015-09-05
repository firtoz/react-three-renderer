import THREE from 'three';
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
    this._mainCamera = null;
    this._viewports = viewports || [];
    this._canvas = canvas;
    this._renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: antialias});
    this._width = width;
    this._height = height;
    this._renderer.setSize(this._width, this._height);
    this._onAnimate = onAnimate;

    const render = () => {
      this._renderRequest = requestAnimationFrame(render);

      if (this._onAnimate) {
        ReactUpdates.batchedUpdates(this._onAnimate);
      }

      if (this._mainCamera) {
        this._renderer.autoClear = true;
        this._renderer.setViewport(0, 0, this._width, this._height);
        this._renderer.render(this._scene, this._mainCamera);
      } else if (this._viewports.length > 0) {
        this._renderer.autoClear = false;
        this._renderer.clear();
        this._viewports.forEach(viewport => {
          if (!viewport.camera) {
            return;
          }

          if (viewport.onBeforeRender) {
            ReactUpdates.batchedUpdates(viewport.onBeforeRender);
          }

          this._renderer.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);
          this._renderer.render(this._scene, viewport.camera);
        });
      }
    };

    this._renderRequest = requestAnimationFrame(render);
  }

  setScene(scene) {
    this._scene = scene;

    if (this._mainCameraName) {
      const mainCamera = scene.getObjectByName(this._mainCameraName);

      this.setCamera(mainCamera);
    }
  }

  setCamera(mainCamera) {
    if (this._mainCamera === mainCamera) {
      return;
    }

    if (mainCamera) {
      mainCamera.userData.events.on('dispose', this._cameraDisposed);
    }

    if (!!this._mainCamera) {
      // already have a main camera, remove the dispose listener
      this._mainCamera.userData.events.removeListener('dispose', this._cameraDisposed);
    }

    this._mainCamera = mainCamera;
  }

  _cameraDisposed = () => {
    this._mainCamera.userData.events.removeListener('dispose', this._cameraDisposed);

    this._mainCamera = null;
  };

  getMainCameraName() {
    return this._mainCameraName;
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

    if (this._mainCamera) {
      this._mainCamera.userData.events.removeListener('dispose', this._cameraDisposed);
    }

    try {
      this._renderer.forceContextLoss();
    } finally {
      delete this._renderer;
    }

    delete this._mainCamera;
    delete this._canvas;
    delete this._canvasDisposed;
  }
}

export default React3DInstance;
