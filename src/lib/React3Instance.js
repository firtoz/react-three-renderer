import THREE from 'three';
import invariant from 'fbjs/lib/invariant';
import warning from 'fbjs/lib/warning';
import Viewport from './Viewport';
import React3Module from './Module';
import ResourceContainer from './Resources/ResourceContainer';
import ReactUpdates from 'react/lib/ReactUpdates';

import CameraUtils from './utils/CameraUtils';

import React3Renderer from './React3Renderer';

const rendererProperties = [
  'gammaInput',
  'gammaOutput',
];

class React3DInstance {
  constructor(props, rendererInstance:React3Renderer) {
    const {
      mainCamera,
      onAnimate,
      onRecreateCanvas,
      onRendererUpdated,
      onManualRenderTriggerCreated,
      forceManualRender,
    } = props;

    this._parameters = { ...props };

    this._rendererInstance = rendererInstance;

    this._mounted = false;
    this._willUnmount = false;
    this._scene = null;

    this._mainCameraName = mainCamera;
    this._viewports = [];
    /**
     * @type {Array.<React3Module>}
     */
    this._modules = [];

    this._resourceContainers = [];
    this._recreateCanvasCallback = onRecreateCanvas;
    this._rendererUpdatedCallback = onRendererUpdated;
    this._manualRenderTriggerCallback = onManualRenderTriggerCreated;
    this._forceManualRender = forceManualRender;

    this._warnedAboutManualRendering = false;

    this._canvas = null;

    this._onAnimate = onAnimate;
    this._objectsByUUID = {};
    this._materials = [];
    this._geometries = [];
    this._textures = [];
    this._objectsByName = {};

    this._lastRenderMode = null;

    this._renderTrigger = (renderThisFrame) => {
      if (renderThisFrame) {
        this._render();
      } else {
        if (this._renderRequest === null) {
          this._renderRequest = requestAnimationFrame(this._render);
        }
      }
    };

    this.uuid = THREE.Math.generateUUID();
    this.userData = {};

    if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_REACT_ADDON_HOOKS === 'true') {
      this._highlightScene = new THREE.Scene();

      this._highlightGeometry = new THREE.BoxGeometry(1, 1, 1);
      this._highlightMaterial = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        transparent: true,
        opacity: 0.4,
      });

      this._highlightObjectId = null;
      this._getHighlightBoundingBox = null;

      this._hideHighlight = () => {
        this._highlightObjectId = null;
        this._getHighlightBoundingBox = null;
      };

      this._objectHighlighted = (info) => {
        const { uuid, boundingBoxFunc } = info;

        let obj;

        if (this._highlightObjectId) {
          obj = this._objectsByUUID[this._highlightObjectId];

          obj.userData.events.removeListener('hideHighlight', this._hideHighlight);
        }

        this._highlightObjectId = uuid;
        this._getHighlightBoundingBox = boundingBoxFunc;

        obj = this._objectsByUUID[uuid];

        obj.userData.events.once('hideHighlight', this._hideHighlight);
      };
    }
  }

  _createRenderer() {
    if (!this._canvas) {
      return;
    }

    const parameters = this._parameters;

    this._renderer = new THREE.WebGLRenderer({
      canvas: this._canvas,
      precision: parameters.precision,
      alpha: parameters.alpha,
      premultipliedAlpha: parameters.premultipliedAlpha,
      antialias: parameters.antialias,
      stencil: parameters.stencil,
      preserveDrawingBuffer: parameters.preserveDrawingBuffer,
      depth: parameters.depth,
      logarithmicDepthBuffer: parameters.logarithmicDepthBuffer,
    });

    if (this._rendererUpdatedCallback) {
      this._rendererUpdatedCallback(this._renderer);
    }

    const renderer = this._renderer;

    if (parameters.hasOwnProperty('pixelRatio')) {
      renderer.setPixelRatio(parameters.pixelRatio);
    }

    if (parameters.hasOwnProperty('sortObjects')) {
      renderer.sortObjects = parameters.sortObjects;
    }

    const hasClearColor = parameters.hasOwnProperty('clearColor');
    const hasClearAlpha = parameters.hasOwnProperty('clearAlpha');

    if (hasClearColor || hasClearAlpha) {
      let clearColor;

      if (hasClearColor) {
        clearColor = parameters.clearColor;
      } else {
        clearColor = new THREE.Color(0x000000); // default clear color
      }

      if (hasClearAlpha) {
        if (process.env.NODE_ENV !== 'production') {
          warning(parameters.alpha === true, 'The `clearAlpha` property' +
            ' requires the `alpha` property to be `true`.');
        }

        renderer.setClearColor(clearColor, parameters.clearAlpha);
      } else {
        renderer.setClearColor(clearColor);
      }
    }

    if (parameters.hasOwnProperty('shadowMapEnabled')) {
      renderer.shadowMap.enabled = parameters.shadowMapEnabled;
    }

    if (parameters.hasOwnProperty('shadowMapType')) {
      renderer.shadowMap.type = parameters.shadowMapType;
    }

    if (parameters.hasOwnProperty('shadowMapCullFace')) {
      renderer.shadowMap.cullFace = parameters.shadowMapCullFace;
    }

    if (parameters.hasOwnProperty('shadowMapDebug')) {
      renderer.shadowMap.debug = parameters.shadowMapDebug;
    }

    rendererProperties.forEach(propertyName => {
      if (parameters.hasOwnProperty(propertyName)) {
        renderer[propertyName] = parameters[propertyName];
      }
    });

    renderer.setSize(parameters.width, parameters.height);
  }

  initialize() {
    this.userData.events.on('animate', this._callOnAnimate);

    if (this._forceManualRender) {
      if (process.env.NODE_ENV !== 'production') {
        if (!this._manualRenderTriggerCallback && !this._warnedAboutManualRendering) {
          this._warnedAboutManualRendering = true;

          warning(false,
            'The `forceManualRender` property requires the ' +
            '`onManualRenderTriggerCreated` property to be set.');
        }
      }

      this._renderRequest = null;
    } else {
      this._renderRequest = requestAnimationFrame(this._render);
    }

    if (this._manualRenderTriggerCallback) {
      this._manualRenderTriggerCallback(this._renderTrigger);
    }
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
    this.userData.events.on('animate', callback);
  }

  removeAnimateListener(callback) {
    this.userData.events.removeListener('animate', callback);
  }

  addBeforeRenderListener(callback) {
    this.userData.events.on('preRender', callback);
  }

  removeBeforeRenderListener(callback) {
    this.userData.events.removeListener('preRender', callback);
  }

  _callOnAnimate = () => {
    if (this._onAnimate) {
      ReactUpdates.batchedUpdates(this._onAnimate);
    }
  };

  addChildren(children) {
    for (let i = 0; i < children.length; ++i) {
      const child = children[i];

      if (child instanceof THREE.Scene) {
        this.setScene(child);
      } else if (child instanceof Viewport) {
        this.addViewport(child);
      } else if (child instanceof React3Module) {
        this.addModule(child);
      } else if (child instanceof ResourceContainer) {
        this.addResourceContainer(child);
      } else {
        invariant(false,
          'The react3 component should only contain ' +
          '<viewport/>s or <scene/>s or <resources/>.');
      }
    }
  }

  removeChild(child) {
    if (child instanceof THREE.Scene) {
      if (this._scene === child) {
        this.setScene(null);
      }
    } else if (child instanceof Viewport) {
      this.removeViewport(child);
    } else if (child instanceof React3Module) {
      this.removeModule(child);
    } else if (child instanceof ResourceContainer) {
      this.removeResourceContainer(child);
    } else {
      invariant(false,
        'The react3 component should only contain ' +
        '<viewport/>s or <scene/>s, <module/>s or <resources/>.');
    }
  }

  _render = () => {
    for (let i = 0; i < this._modules.length; ++i) {
      this._modules[i].update();
    }

    if (this._forceManualRender) {
      this._renderRequest = null;
    } else {
      this._renderRequest = requestAnimationFrame(this._render);
    }

    this.userData.events.emit('animate');

    // the scene can be destroyed within the 'animate' event
    if (!this._scene || !this._mounted || !this._renderer) {
      return;
    }

    let mainCamera = null;

    if (this._mainCameraName) {
      const objectsWithMainCameraName = this._objectsByName[this._mainCameraName];

      if (objectsWithMainCameraName) {
        if (process.env.NODE_ENV !== 'production') {
          warning(objectsWithMainCameraName.count < 2,
            `There are multiple objects with name ${this._mainCameraName}`);
        }

        if (objectsWithMainCameraName.count > 0) {
          const values = objectsWithMainCameraName.values;
          mainCamera = values[Object.keys(values)[0]];
        }
      }
    }

    if (mainCamera) {
      if (this._lastRenderMode !== 'camera') {
        this._renderer.autoClear = true;
        this._renderer.setViewport(0, 0, this._parameters.width, this._parameters.height);
        this._lastRenderMode = 'camera';
      }
      CameraUtils.current = mainCamera;
      this.userData.events.emit('preRender');
      this._renderScene(mainCamera);
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
            if (process.env.NODE_ENV !== 'production') {
              warning(objectsWithViewportCameraName.count < 2,
                `There are multiple objects with name ${viewport.cameraName}`);
            }

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
        this.userData.events.emit('preRender');
        this._renderScene(viewportCamera);
        CameraUtils.current = null;
      });
    }
  };

  _renderScene(camera) {
    this._renderer.render(this._scene, camera);

    if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_REACT_ADDON_HOOKS === 'true') {
      if (this._highlightObjectId !== null) {
        const boundingBoxes = this._getHighlightBoundingBox();

        const highlightScene = this._highlightScene;

        const diff = highlightScene.children.length - boundingBoxes.length;

        if (diff > 0) {
          for (let i = 0; i < diff; i++) {
            highlightScene.remove(highlightScene.children[0]);
          }
        } else if (diff < 0) {
          for (let i = 0; i < -diff; i++) {
            highlightScene.add(new THREE.Mesh(this._highlightGeometry, this._highlightMaterial));
          }
        }

        for (let i = 0; i < boundingBoxes.length; ++i) {
          const boundingBox = boundingBoxes[i];

          const center = boundingBox.min.clone().add(boundingBox.max).multiplyScalar(0.5);

          const size = boundingBox.max.clone().sub(boundingBox.min);

          const highlightCube = highlightScene.children[i];

          highlightCube.position.copy(center);
          highlightCube.scale.copy(size);
        }

        const autoClear = this._renderer.autoClear;
        this._renderer.autoClear = false;
        this._renderer.render(highlightScene, camera);
        this._renderer.autoClear = autoClear;
      }
    }
  }

  setScene(scene) {
    if (process.env.NODE_ENV !== 'production') {
      invariant(!(this._scene && scene), 'There can only be one scene in <react3/>');
    }

    this._scene = scene;
  }

  addViewport(viewport) {
    this._viewports.push(viewport);
  }

  removeViewport(viewport) {
    const index = this._viewports.indexOf(viewport);
    if (process.env.NODE_ENV !== 'production') {
      invariant(index !== -1,
        'A viewport has been removed from ' +
        '<react3/> but it was not present in it...');
    }

    this._viewports.splice(index, 1);
  }

  addResourceContainer(resourceContainer) {
    this._resourceContainers.push(resourceContainer);
  }

  removeResourceContainer(resourceContainer) {
    const index = this._resourceContainers.indexOf(resourceContainer);
    if (process.env.NODE_ENV !== 'production') {
      invariant(index !== -1,
        'A resource container has been removed ' +
        'from <react3/> but it was not present in it...');
    }

    this._resourceContainers.splice(index, 1);
  }

  addModule(module:React3Module) {
    this._modules.push(module);
  }

  removeModule(module:React3Module) {
    const index = this._modules.indexOf(module);

    if (process.env.NODE_ENV !== 'production') {
      invariant(index !== -1,
        'A module has been removed from ' +
        '<react3/> but it was not present in it...');
    }

    this._modules.splice(index, 1);
  }

  updateWidth(newWidth) {
    this._parameters.width = newWidth;
    if (!this._renderer) {
      return;
    }

    this._renderer.setSize(this._parameters.width, this._parameters.height);
  }

  updateOnRecreateCanvas(threeObject, callback) {
    this._recreateCanvasCallback = callback;
  }

  updateOnRendererUpdated(callback) {
    this._rendererUpdatedCallback = callback;
  }

  updateOnManualRenderTriggerCreated(callback) {
    this._manualRenderTriggerCallback = callback;

    if (callback) {
      this._manualRenderTriggerCallback(this._renderTrigger);
    }
  }

  updateForceManualRender(forceManualRender) {
    if (this._forceManualRender === forceManualRender) {
      return;
    }

    this._forceManualRender = forceManualRender;

    if (forceManualRender) {
      // was just set to be forced
      cancelAnimationFrame(this._renderRequest);
      this._renderRequest = null;
    } else {
      // was just restored

      this._renderRequest = requestAnimationFrame(this._render);
    }
  }

  updateHeight(newHeight) {
    this._parameters.height = newHeight;
    if (!this._renderer) {
      return;
    }

    this._renderer.setSize(this._parameters.width, this._parameters.height);
  }

  updatePixelRatio(newPixelRatio) {
    this._parameters.pixelRatio = newPixelRatio;
    if (!this._renderer) {
      return;
    }


    this._renderer.setPixelRatio(newPixelRatio);
    this._renderer.setSize(this._parameters.width, this._parameters.height);
  }

  updateSortObjects(sortObjects) {
    this._parameters.sortObjects = sortObjects;

    if (!this._renderer) {
      return;
    }

    this._renderer.sortObjects = sortObjects;
  }

  updateAntialias(antialias) {
    this._parameters.antialias = antialias;
    // no renderer, this only happens initially or we're about to recreate it anyway.
    // unless something broke, then we have bigger problems...
    if (!this._renderer) {
      return;
    }

    this.refreshRenderer();
  }

  updatePrecision(precision) {
    this._parameters.precision = precision;
    if (!this._renderer) {
      return;
    }

    this.refreshRenderer();
  }

  updateAlpha(alpha) {
    this._parameters.alpha = alpha;
    if (!this._renderer) {
      return;
    }

    this.refreshRenderer();
  }

  updatePremultipliedAlpha(premultipliedAlpha) {
    this._parameters.premultipliedAlpha = premultipliedAlpha;
    if (!this._renderer) {
      return;
    }

    this.refreshRenderer();
  }

  updateStencil(stencil) {
    this._parameters.stencil = stencil;
    if (!this._renderer) {
      return;
    }

    this.refreshRenderer();
  }

  updatePreserveDrawingBuffer(preserveDrawingBuffer) {
    this._parameters.preserveDrawingBuffer = preserveDrawingBuffer;
    if (!this._renderer) {
      return;
    }

    this.refreshRenderer();
  }

  updateDepth(depth) {
    this._parameters.depth = depth;
    if (!this._renderer) {
      return;
    }

    this.refreshRenderer();
  }

  updateLogarithmicDepthBuffer(logarithmicDepthBuffer) {
    this._parameters.logarithmicDepthBuffer = logarithmicDepthBuffer;
    if (!this._renderer) {
      return;
    }

    this.refreshRenderer();
  }

  updateShadowMapEnabled(shadowMapEnabled) {
    this._parameters.shadowMapEnabled = shadowMapEnabled;

    if (!this._renderer) {
      return;
    }

    this._renderer.shadowMap.enabled = shadowMapEnabled;
    this.allMaterialsNeedUpdate(true);
  }

  updateShadowMapType(shadowMapType) {
    this._parameters.shadowMapType = shadowMapType;

    if (!this._renderer) {
      return;
    }

    this._renderer.shadowMap.type = shadowMapType;
    this.allMaterialsNeedUpdate(true);
  }

  updateShadowMapCullFace(shadowMapCullFace) {
    this._parameters.shadowMapCullFace = shadowMapCullFace;

    if (!this._renderer) {
      return;
    }

    this._renderer.shadowMap.cullFace = shadowMapCullFace;
    this.allMaterialsNeedUpdate(true);
  }

  updateShadowMapDebug(shadowMapDebug) {
    this._parameters.shadowMapDebug = shadowMapDebug;

    if (!this._renderer) {
      return;
    }

    this._renderer.shadowMap.debug = shadowMapDebug;
    this.allMaterialsNeedUpdate(true);
  }

  updateCanvas(canvas) {
    this._canvas = canvas;

    if (this._renderer) {
      this.disposeResourcesAndRenderer();

      const contextLossExtension = this._renderer.extensions.get('WEBGL_lose_context');
      if (contextLossExtension) {
        // noinspection JSUnresolvedFunction
        contextLossExtension.loseContext();
      }
    }

    this._createRenderer();
  }

  updateGammaInput(gammaInput) {
    this._parameters.gammaInput = gammaInput;

    if (!this._renderer) {
      return;
    }

    this._renderer.gammaInput = gammaInput;
    this.allMaterialsNeedUpdate(true);
  }

  updateGammaOutput(gammaOutput) {
    this._parameters.gammaOutput = gammaOutput;

    if (!this._renderer) {
      return;
    }

    this._renderer.gammaOutput = gammaOutput;
    this.allMaterialsNeedUpdate(true);
  }

  updateContext(context) {
    this._parameters.context = context;
  }

  updateMainCamera(mainCamera) {
    this._parameters.mainCamera = mainCamera;

    this._mainCameraName = mainCamera;
  }

  updateOnAnimate(onAnimate) {
    this._parameters.onAnimate = onAnimate;

    this._onAnimate = onAnimate;
  }

  updateClearColor(clearColor) {
    this._parameters.clearColor = clearColor;

    if (!this._renderer) {
      return;
    }

    if (this._parameters.hasOwnProperty('clearAlpha')) {
      this._renderer.setClearColor(clearColor, this._parameters.clearAlpha);
    } else {
      this._renderer.setClearColor(clearColor);
    }
  }

  updateClearAlpha(clearAlpha) {
    const parameters = this._parameters;

    if (clearAlpha === undefined) {
      delete parameters.clearAlpha;
    } else {
      parameters.clearAlpha = clearAlpha;
    }

    if (!this._renderer) {
      return;
    }

    let clearColor;

    if (parameters.hasOwnProperty('clearColor')) {
      clearColor = parameters.clearColor;
    } else {
      clearColor = new THREE.Color(0x000000); // default clear color
    }

    if (clearAlpha !== undefined) {
      this._renderer.setClearColor(clearColor, clearAlpha);
    } else {
      this._renderer.setClearColor(clearColor);
    }
  }

  refreshRenderer() {
    this.disposeResourcesAndRenderer();

    const contextLossExtension = this._renderer.extensions.get('WEBGL_lose_context');

    delete this._renderer;
    if (this._rendererUpdatedCallback) {
      this._rendererUpdatedCallback(null);
    }

    this.userData.events.removeListener('animate', this._callOnAnimate);
    this.userData.events.removeAllListeners();

    if (this._renderRequest !== null) {
      cancelAnimationFrame(this._renderRequest);
      this._renderRequest = null;
    }

    if (contextLossExtension && this._canvas) {
      this._canvas.addEventListener('webglcontextlost', () => {
        // this should recreate the canvas
        this._recreateCanvasCallback();
      }, false);

      // noinspection JSUnresolvedFunction
      contextLossExtension.loseContext();
    } else {
      this._recreateCanvasCallback();
    }
  }

  disposeResourcesAndRenderer() {
    for (let i = 0; i < this._materials.length; ++i) {
      const material = this._materials[i];
      material.dispose();
    }

    for (let i = 0; i < this._geometries.length; ++i) {
      const geometry = this._geometries[i];
      geometry.dispose();
    }

    for (let i = 0; i < this._textures.length; ++i) {
      const texture = this._textures[i];
      texture.dispose();
    }

    this._renderer.dispose();
  }

  willUnmount() {
    this._willUnmount = true;
  }

  unmount() {
    this._mounted = false;

    if (this._renderRequest !== null) {
      cancelAnimationFrame(this._renderRequest);
      this._renderRequest = null;
    }

    this.userData.events.removeListener('animate', this._callOnAnimate);
    this.userData.events.removeAllListeners();
    delete this._rendererInstance;

    if (this._renderer) {
      const contextLossExtension = this._renderer.extensions.get('WEBGL_lose_context');

      if (contextLossExtension) {
        // noinspection JSUnresolvedFunction
        contextLossExtension.loseContext();
      }

      this.disposeResourcesAndRenderer();

      delete this._renderer;

      if (this._rendererUpdatedCallback) {
        this._rendererUpdatedCallback(null);
      }
    }

    delete this._parameters;

    invariant(Object.keys(this._objectsByUUID).length === 0,
      'Failed to cleanup some child objects for React3DInstance');

    delete this._objectsByUUID;
    delete this._viewports;
    delete this._scene;

    if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_REACT_ADDON_HOOKS === 'true') {
      delete this._highlightScene;
      delete this._highlightObjectId;
      delete this._getHighlightBoundingBox;
    }
  }

  objectMounted(object) {
    invariant(!this._objectsByUUID[object.uuid],
      'There already is an object with this uuid in the react 3d instance.');

    this._objectsByUUID[object.uuid] = object;

    object.userData.markup._rootInstance = this;

    this._addObjectWithName(object.name, object);

    if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_REACT_ADDON_HOOKS === 'true') {
      object.userData.events.on('highlight', this._objectHighlighted);
    }

    object.userData.events.emit('addedIntoRoot', object);

    const current:THREE.Object3D = object;

    const childrenMarkup = current.userData.markup.childrenMarkup;

    if (object instanceof THREE.Material) {
      this._materials.push(object);
    }

    if (object instanceof THREE.Geometry || object instanceof THREE.BufferGeometry) {
      this._geometries.push(object);
    }

    if (object instanceof THREE.Texture) {
      this._textures.push(object);
    }

    for (let i = 0; i < childrenMarkup.length; ++i) {
      const childMarkup = childrenMarkup[i];

      this.objectMounted(childMarkup.threeObject);
    }
  }

  allMaterialsNeedUpdate(dispose) {
    this._materials.forEach(material => {
      if (dispose) {
        material.dispose();
      } else {
        material.needsUpdate = true;
      }
    });
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
    invariant(this._objectsByName[objectName]
      && this._objectsByName[objectName].values[object.uuid] === object,
      'The object\'s name changed somehow?\'');

    delete this._objectsByName[objectName].values[object.uuid];
    this._objectsByName[objectName].count--;

    if (this._objectsByName[objectName].count === 0) {
      delete this._objectsByName[objectName];
    }
  }

  objectRemoved(object) {
    invariant(this._objectsByUUID[object.uuid] === object,
      'The removed object does not belong here!?');

    if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_REACT_ADDON_HOOKS === 'true') {
      if (this._highlightObjectId === object.uuid) {
        this._highlightObjectId = null;
      }

      object.userData.events.removeListener('highlight', this._objectHighlighted);
      object.userData.events.removeListener('hideHighlight', this._hideHighlight);
    }

    delete this._objectsByUUID[object.uuid];

    if (object instanceof THREE.Material) {
      this._materials.splice(this._materials.indexOf(object), 1);
    }
    if (object instanceof THREE.Geometry || object instanceof THREE.BufferGeometry) {
      this._geometries.splice(this._geometries.indexOf(object), 1);
    }
    if (object instanceof THREE.Texture) {
      this._textures.splice(this._textures.indexOf(object), 1);
    }

    this._removeObjectWithName(object.name, object);

    delete object.userData.markup._rootInstance;
  }

  mountedIntoRoot() {
    this._mounted = true;
    this.objectMounted(this);
  }
}

module.exports = React3DInstance;
