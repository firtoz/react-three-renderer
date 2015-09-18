import THREE from 'three';

import THREEElementDescriptor from './THREEElementDescriptor';

function _arrayMove(array, oldIndex, newIndex) {
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
}

class Object3DDescriptor extends THREEElementDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this._simpleProperties = [];

    this.propUpdates = {
      'position': this._updatePosition,
      'rotation': this._updateRotation,
      'lookAt': this._updateLookAt,
      'scale': this._updateScale,
      'name': this._updateName,
    };

    this.registerSimpleProperties([
      'castShadow',
      'receiveShadow',
      'visible',
    ]);
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
      threeObject.userData._lookAt = props.lookAt;
      threeObject.lookAt(props.lookAt);
    }

    this._simpleProperties.forEach(propertyName => {
      if (props.hasOwnProperty(propertyName)) {
        threeObject[propertyName] = props[propertyName];
      }
    });
  }

  _updatePosition = (threeObject, nextPosition) => {
    threeObject.position.copy(nextPosition);

    if (threeObject.userData._lookAt) {
      threeObject.lookAt(threeObject.userData._lookAt);
    }
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
    const oldName = threeObject.name;

    threeObject.name = nextName;

    threeObject.userData.events.emit('rename', {
      oldName,
      nextName,
    });

    const markup = threeObject.userData.markup;

    if (markup._rootInstance) {
      markup._rootInstance.objectRenamed(self, oldName, nextName);
    }
  };

  _updateLookAt = (threeObject, lookAt) => {
    threeObject.userData._lookAt = lookAt;

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
   * @param {THREE.Object3D} self
   * @param child
   */
  removeChild(self, child) {
    self.remove(child);
  }

  moveChild(self, childObject, toIndex, lastIndex) {
    invariant(toIndex >= 0 && self.children.length > toIndex, "Cannot move a child to that index!");
    _arrayMove(self.children, lastIndex, toIndex);
  }


  setParent(self, parentObject3d) {
    super.setParent(self, parentObject3d);
  }

  unmount(self) {
    const markup = self.userData.markup;

    if (markup._rootInstance) {
      markup._rootInstance.objectRemoved(self);
    }

    super.unmount(self);
  }

  registerSimpleProperties(propertyNames) {
    this._simpleProperties = this._simpleProperties.concat(propertyNames);

    propertyNames.forEach(propertyName => {
      this.propUpdates[propertyName] = (threeObject, nextValue) => {
        threeObject[propertyName] = nextValue;
      };
    });
  }

  highlight(threeObject) {
    threeObject.userData.events.emit('highlight', {
      uuid: threeObject.uuid,
      boundingBoxFunc: () => {
        const boundingBox = new THREE.Box3();

        boundingBox.setFromObject(threeObject);

        return [boundingBox];
      },
    });
  }

  hideHighlight(threeObject) {
    threeObject.userData.events.emit('hideHighlight');
  }
}

export default Object3DDescriptor;
