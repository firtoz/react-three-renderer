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

  construct() {
    invariant(false, 'Missing constructor!');
  }

  addChildren() {
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

  deleteProperty(threeObject, propKey) {
    invariant(false, 'Cannot delete property!');
  }

  updateProperty(threeObject, propKey, nextProp) {
    if (this.propUpdates.hasOwnProperty(propKey)) {
      this.propUpdates[propKey](threeObject, nextProp);
    } else {
      console.error('updating prop', propKey, nextProp, 'for', threeObject);
      debugger;
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
    };
  }

  construct() {
    return new THREE.Object3D();
  }

  applyInitialProps(self, props) {
    if (props.position) {
      self.position.copy(props.position);
    }
    if (props.scale) {
      self.scale.copy(props.scale);
    }

    return self;
  }

  _updatePosition = (threeObject, nextPosition) => {
    threeObject.position.copy(nextPosition);
  };

  _updateScale = (threeObject, nextScale) => {
    threeObject.scale.copy(nextScale);
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
    console.log('OBJECT3D MOVE CHILD?!');

    _arrayMove(self.children, lastIndex, toIndex);
  }

  setParent() {
    // yep that's allowed
  }

  unmount(self) {
    // i'll allow it too
  }
}

class PerspectiveCameraDescriptor extends THREEElementDescriptor {
  construct(props) {
    return new THREE.PerspectiveCamera(props.fov, props.aspectRatio, props.near, props.far);
  }
}

class MeshDescriptor extends Object3DDescriptor {
  construct(props) {
    const mesh = new THREE.Mesh();

    mesh.geometry.dispose();
    mesh.material.dispose();

    mesh.geometry = undefined;
    mesh.material = undefined;

    return this.applyInitialProps(mesh, props);
  }

  addChildren() {
    // i'll allow it

  }

  moveChild(self, childObject, toIndex, lastIndex) {
    // ignore!

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

/**
 * @type {Object.<string, THREEElementDescriptor>}
 */
const threeElementDescriptors = {
  object3D: new Object3DDescriptor(),
  perspectiveCamera: new PerspectiveCameraDescriptor(),
  mesh: new MeshDescriptor(),
  meshBasicMaterial: new MeshBasicMaterialDescriptor(),
  boxGeometry: new BoxGeometryDescriptor(),
};

export default threeElementDescriptors;
