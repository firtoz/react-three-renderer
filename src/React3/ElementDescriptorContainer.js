import invariant from 'react/lib/invariant';
import THREE from 'three';

import events from 'events';

const {EventEmitter} = events;

class React3DInstance {
  constructor(props) {
    this._scene = null;
    this._mainCameraName = props.mainCamera;
    this._canvas = props.canvas;
    this._renderer = new THREE.WebGLRenderer({canvas: props.canvas});
    this._width = props.width;
    this._height = props.height;
    this._renderer.setSize(this._width, this._height);
  }

  setScene(scene) {
    this._scene = scene;

    const mainCamera = scene.getObjectByName(this._mainCameraName);

    if (!!mainCamera) {
      this.setCamera(mainCamera);
    }
  }

  setCamera(mainCamera) {
    if (this._mainCamera === mainCamera) {
      return;
    }

    mainCamera.userData.events.on('dispose', this._cameraDisposed);

    this._mainCamera = mainCamera;

    this._startRender();
  }

  _cameraDisposed = () => {
    this._mainCamera.userData.events.removeListener('dispose', this._cameraDisposed);

    this._mainCamera = null;

    this._renderer.clear();

    cancelAnimationFrame(this._renderRequest);
  };

  getMainCameraName() {
    return this._mainCameraName;
  }

  _startRender() {
    const render = () => {
      this._renderRequest = requestAnimationFrame(render);

      this._renderer.render(this._scene, this._mainCamera);
    };

    render();
  }

  updateWidth(newWidth) {
    this._width = newWidth;
    this._renderer.setSize(this._width, this._height);
  }

  updateHeight(newHeight) {
    this._height = newHeight;
    this._renderer.setSize(this._width, this._height);
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


/**
 * @abstract
 */
class THREEElementDescriptor {
  constructor(react3Instance) {
    /**
     * @protected
     */
    this._react3Instance = react3Instance;
    this.propUpdates = {};
  }

  applyInitialProps(self, props) { // eslint-disable-line no-unused-vars
    // do nothing for now
  }

  construct() {
    invariant(false, 'Missing constructor!');
  }

  // noinspection JSUnusedLocalSymbols
  addChildren(self, children) { // eslint-disable-line no-unused-vars
    invariant(false, 'Cannot add children to this type!');
  }

  moveChild() {
    invariant(false, 'Cannot add children to this type!');
  }

  removeChild() {
    invariant(false, 'Cannot add children to this type!');
  }

  setParent() {
    invariant(false, 'Cannot add parent to this type!');
  }

  unmount() {
    invariant(false, 'Cannot unmount this type!');
  }

  // noinspection JSUnusedLocalSymbols
  deleteProperty(threeObject, propKey) { // eslint-disable-line no-unused-vars
    invariant(false, 'Cannot delete property!');
  }

  updateProperty(threeObject, propKey, nextProp) {
    if (this.propUpdates.hasOwnProperty(propKey)) {
      this.propUpdates[propKey](threeObject, nextProp);
    } else {
      invariant(false, `updating prop ${propKey} ${nextProp} for ${threeObject}`);
    }
  }
}

class React3Descriptor extends THREEElementDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.propUpdates = {
      width: this._updateWidth,
      height: this._updateHeight,
    };
  }

  construct(props) {
    return new React3DInstance(props);
  }

  addChildren(self, children) {
    invariant(children.length === 1 && children[0] instanceof THREE.Scene, 'The react3 component should only have one scene as a child!');

    self.setScene(children[0]);
  }

  _updateWidth(self, newWidth) {
    self.updateWidth(newWidth);
  }

  _updateHeight(self, newHeight) {
    self.updateHeight(newHeight);
  }

  unmount(self) {
    self.unmount();
  }
}

function _arrayMove(array, oldIndex, newIndex) {
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
}

class Object3DDescriptor extends THREEElementDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.propUpdates = {
      'position': this._updatePosition,
      'rotation': this._updateRotation,
      'scale': this._updateScale,
      'name': this._updateName,
    };
  }

  construct() {
    return new THREE.Object3D();
  }

  /**
   * @param {THREE.Object3D} threeObject
   * @param props
   */
  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    if (props.position) {
      threeObject.position.copy(props.position);
    }

    if (props.scale) {
      threeObject.scale.copy(props.scale);
    }

    if (props.rotation) {
      threeObject.rotation.copy(props.rotation);
    }

    if (props.name) {
      threeObject.name = props.name;
    }
  }

  _updatePosition = (threeObject, nextPosition) => {
    threeObject.position.copy(nextPosition);
  };

  _updateRotation = (threeObject, nextRotation) => {
    threeObject.rotation.copy(nextRotation);
  };

  _updateScale = (threeObject, nextScale) => {
    threeObject.scale.copy(nextScale);
  };

  _updateName = (threeObject, nextName) => {
    threeObject.name = nextName;
  };

  /**
   * @param self
   * @param {Array} children
   */
  addChildren(self, children) {
    children.forEach(child => {
      self.add(child);
    });
  }

  /**
   *
   * @param {THREE.Object3D} self
   * @param child
   */
  removeChild(self, child) {
    self.remove(child);
  }

  moveChild(self, childObject, toIndex, lastIndex) {
    _arrayMove(self.children, lastIndex, toIndex);
  }

  setParent() {
    // yep that's allowed
  }

  unmount(self) { // eslint-disable-line no-unused-vars
    // i'll allow it too
  }
}

function getRoot(object) {
  const parentMarkup = object.userData.parentMarkup;
  if (parentMarkup) {
    return getRoot(parentMarkup.threeObject);
  }

  return object;
}

class CameraDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.propUpdates = {
      ...this.propUpdates,
      aspect: this._updateAspect,
    };
  }

  applyInitialProps(self, props) {
    super.applyInitialProps(self, props);

    self.userData.events = new EventEmitter();
  }

  setParent(camera, parentObject3D) {
    super.setParent(camera, parentObject3D);

    const root = getRoot(parentObject3D);

    const rootInstance = root && root.instance;

    if (rootInstance && rootInstance instanceof React3DInstance && rootInstance.getMainCameraName() === camera.name) {
      rootInstance.setCamera(camera);
    }
  }

  /**
   * @param {THREE.PerspectiveCamera} self
   * @param newAspect
   * @private
   */
  _updateAspect(self, newAspect) {
    self.aspect = newAspect;

    self.updateProjectionMatrix();
  }

  unmount(self) {
    self.userData.events.emit('dispose');
    self.userData.events.removeAllListeners();
    delete self.userData.events;
  }
}

class PerspectiveCameraDescriptor extends CameraDescriptor {
  constructor(react3Instance) {
    super(react3Instance);
  }

  construct(props) {
    return new THREE.PerspectiveCamera(props.fov, props.aspect, props.near, props.far);
  }
}

class OrthographicCameraDescriptor extends CameraDescriptor {
  constructor(react3Instance) {
    super(react3Instance);
  }

  construct(props) {
    return new THREE.OrthographicCamera(props.left, props.right, props.top, props.bottom, props.near, props.far);
  }
}

class MeshDescriptor extends Object3DDescriptor {
  construct() {
    const mesh = new THREE.Mesh();

    mesh.geometry.dispose();
    mesh.material.dispose();

    mesh.geometry = undefined;
    mesh.material = undefined;

    return mesh;
  }

  addChildren(self, children) {
    invariant(children.filter(child => !(child instanceof THREE.Material || child instanceof THREE.Geometry)).length === 0, 'Mesh children can only be materials ore geometries!');
  }

  moveChild() {
    // doesn't matter
  }
}

class MaterialDescriptor extends THREEElementDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.propUpdates = {
      'color': this._updateColor,
    };
  }

  _updateColor = (threeObject, nextColor) => {
    threeObject.color.set(nextColor);
  };

  construct() {
    return new THREE.Material({});
  }

  setParent(material, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Mesh, 'Parent is not a mesh');
    invariant(parentObject3D.material === undefined, 'Parent already has a material');

    parentObject3D.material = material;
  }

  unmount(material) {
    const parent = material.userData.parentMarkup.threeObject;

    if (parent.material === material) {
      parent.material = undefined;
    }

    material.dispose();
  }
}

class GeometryDescriptor extends THREEElementDescriptor {
  construct() {
    return new THREE.Geometry({});
  }

  setParent(geometry, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Mesh, 'Parent is not a mesh');
    invariant(parentObject3D.geometry === undefined, 'Parent already has a geometry');

    parentObject3D.geometry = geometry;
  }

  unmount(geometry) {
    const parent = geometry.userData.parentMarkup.threeObject;

    if (parent.geometry === geometry) {
      parent.geometry = undefined;
    }

    geometry.dispose();
  }
}

class MeshBasicMaterialDescriptor extends MaterialDescriptor {
  construct(props) {
    const materialDescription = {};

    if (props.hasOwnProperty('color')) {
      materialDescription.color = props.color;
    }

    return new THREE.MeshBasicMaterial(materialDescription);
  }
}

class BoxGeometryDescriptor extends GeometryDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.propUpdates = {
      ...this.propUpdates,
      'width': this._updateWidth,
      'height': this._updateHeight,
      'depth': this._updateDepth,
    };
  }

  construct(props) {
    return new THREE.BoxGeometry(props.width, props.height, props.depth);
  }

  _updateWidth = () => {
    invariant(false, 'Please do not modify the width property of the boxGeometry component.');
  };

  _updateHeight = () => {
    invariant(false, 'Please do not modify the height property of the boxGeometry component.');
  };

  _updateDepth = () => {
    invariant(false, 'Please do not modify the depth property of the boxGeometry component.');
  };
}

/*


 this._aspectRatio = this.props.width / this.props.height;
 this._camera = new THREE.PerspectiveCamera(75, this._aspectRatio, 0.1, 1000);

 this._camera.position.z = 5;

 this._renderer = new THREE.WebGLRenderer({canvas});

 this._renderer.setSize(this.props.width, this.props.height);
 const render = () => {
 requestAnimationFrame(render);

 // cube.rotation.x += 0.1;
 // cube.rotation.y += 0.1;

 this._renderer.render(this._scene, this._camera);
 };

 render();

 */


class SceneDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);
  }

  construct() {
    return new THREE.Scene();
  }
}

class ElementDescriptorContainer {
  constructor(react3Instance) {
    this.react3Instance = react3Instance;

    /**
     * @type {Object.<string, THREEElementDescriptor>}
     */
    this.descriptors = {
      react3: new React3Descriptor(react3Instance),
      scene: new SceneDescriptor(react3Instance),
      object3D: new Object3DDescriptor(react3Instance),
      orthographicCamera: new OrthographicCameraDescriptor(react3Instance),
      perspectiveCamera: new PerspectiveCameraDescriptor(react3Instance),
      mesh: new MeshDescriptor(react3Instance),
      meshBasicMaterial: new MeshBasicMaterialDescriptor(react3Instance),
      boxGeometry: new BoxGeometryDescriptor(react3Instance),
    };
  }
}

export default ElementDescriptorContainer;
