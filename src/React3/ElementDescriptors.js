import ReactReconciler from 'react/lib/ReactReconciler';
import warning from 'react/lib/warning.js';
import DOMProperty from 'react/lib/DOMProperty';
import invariant from 'react/lib/invariant';
import THREE from 'three';
import ReactMultiChild from 'react/lib/ReactMultiChild';

const ID_ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;

/**
 * @abstract
 */
class THREEElementDescriptor {
  constructor() {
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

function _arrayMove(array, oldIndex, newIndex) {
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
}

class Object3DDescriptor extends THREEElementDescriptor {
  constructor() {
    super();

    this.propUpdates = {
      'position': this._updatePosition,
      'scale': this._updateScale,
      'name': this._updateName,
    };
  }

  construct() {
    return new THREE.Object3D();
  }

  applyInitialProps(self, props) {
    super.applyInitialProps(self, props);

    if (props.position) {
      self.position.copy(props.position);
    }

    if (props.scale) {
      self.scale.copy(props.scale);
    }

    if (props.name) {
      self.name = props.name;
    }
  }

  _updatePosition = (threeObject, nextPosition) => {
    threeObject.position.copy(nextPosition);
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

class CameraDescriptor extends Object3DDescriptor {
}

class PerspectiveCameraDescriptor extends CameraDescriptor {
  constructor() {
    super();

    this.propUpdates = {
      ...this.propUpdates,
      aspect: this._updateAspect,
    };
  }

  construct(props) {
    return new THREE.PerspectiveCamera(props.fov, props.aspect, props.near, props.far);
  }

  setParent(camera, parentObject3D) {
    super.setParent(camera, parentObject3D);
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

  unmount() {
    // return super.unmount();
  }
}

class MeshDescriptor extends Object3DDescriptor {
  construct(props) {
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

  moveChild(self, childObject, toIndex, lastIndex) {
    // doesn't matter
  }
}

class MaterialDescriptor extends THREEElementDescriptor {
  constructor() {
    super();

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
  constructor() {
    super();

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

  _updateWidth = (threeObject, newWidth) => {
    invariant(false, "Please do not modify the width property of the boxGeometry component.");
  };

  _updateHeight = (threeObject, newHeight) => {
    invariant(false, "Please do not modify the height property of the boxGeometry component.");
  };

  _updateDepth = (threeObject, newDepth) => {
    invariant(false, "Please do not modify the depth property of the boxGeometry component.");
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
class React3DInstance {
  constructor(props) {
    this._scene = null;
    this._mainCameraName = props.mainCamera;
    this._renderer = new THREE.WebGLRenderer({canvas: props.canvas});
    this._width = props.width;
    this._height = props.height;
    this._renderer.setSize(this._width, this._height);
  }

  setScene(scene) {
    this._scene = scene;

    const mainCamera = scene.getObjectByName(this._mainCameraName);

    invariant(!!mainCamera, 'Scene has no main camera!');

    this._mainCamera = mainCamera;

    this._startRender();
  }

  _startRender() {
    console.log('starting to render!');
    const render = () => {
      requestAnimationFrame(render);

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
}

class React3Descriptor extends THREEElementDescriptor {
  constructor() {
    super();

    this.propUpdates = {
      width: this._updateWidth,
      height: this._updateHeight,
    };
  }

  construct(props) {
    return new React3DInstance(props);
  }

  addChildren(self, children) {
    invariant(children.length === 1 && children[0] instanceof THREE.Scene, "The react3 component should only have one scene as a child!");

    self.setScene(children[0]);
  }

  _updateWidth(self, newWidth) {
    self.updateWidth(newWidth);
  }

;

  _updateHeight(self, newHeight) {
    self.updateHeight(newHeight);
  }

;
}

class SceneDescriptor extends Object3DDescriptor {
  construct() {
    return new THREE.Scene();
  }
}

/**
 * @type {Object.<string, THREEElementDescriptor>}
 */
const threeElementDescriptors = {
  react3: new React3Descriptor(),
  scene: new SceneDescriptor(),
  object3D: new Object3DDescriptor(),
  perspectiveCamera: new PerspectiveCameraDescriptor(),
  mesh: new MeshDescriptor(),
  meshBasicMaterial: new MeshBasicMaterialDescriptor(),
  boxGeometry: new BoxGeometryDescriptor(),
};

export default threeElementDescriptors;
