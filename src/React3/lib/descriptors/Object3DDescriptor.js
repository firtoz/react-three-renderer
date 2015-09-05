import THREE from 'three';

import THREEElementDescriptor from './THREEElementDescriptor';

function _arrayMove(array, oldIndex, newIndex) {
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
}

class Object3DDescriptor extends THREEElementDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.propUpdates = {
      'position': this._updatePosition,
      'rotation': this._updateRotation,
      'lookAt': this._updateLookAt,
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

    if (props.lookAt) {
      threeObject.lookAt(props.lookAt);
    }
  }

  _updatePosition = (threeObject, nextPosition) => {
    threeObject.position.copy(nextPosition);
  };

  _updateRotation = (threeObject, nextRotation) => {
    const {x, y, z} = threeObject.rotation;

    if (x !== nextRotation.x || y !== nextRotation.y || z !== nextRotation.z) {
      threeObject.rotation.copy(nextRotation);
    }
  };

  _updateScale = (threeObject, nextScale) => {
    threeObject.scale.copy(nextScale);
  };

  _updateName = (threeObject, nextName) => {
    threeObject.name = nextName;
  };

  _updateLookAt = (threeObject, lookAt) => {
    if (!!lookAt) {
      threeObject.lookAt(lookAt);
    }
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

export default Object3DDescriptor;
