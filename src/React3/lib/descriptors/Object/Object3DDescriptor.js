import THREE from 'three';

import THREEElementDescriptor from './../THREEElementDescriptor';

import invariant from 'fbjs/lib/invariant';

function _arrayMove(array, oldIndex, newIndex) {
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
}

class Object3DDescriptor extends THREEElementDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.propUpdates = {
      'position': this._updatePosition,
      'rotation': this._updateRotation,
      'quaternion': this._updateQuaternion,
      'lookAt': this._updateLookAt,
      'scale': this._updateScale,
      'name': this._updateName,
    };

    this.registerSimpleProperties([
      'castShadow',
      'receiveShadow',
      'frustumCulled',
      'visible',
      'renderOrder',
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

    if (props.quaternion) {
      threeObject.quaternion.copy(props.quaternion);
    }

    if (props.name) {
      threeObject.name = props.name;
    }

    if (props.lookAt) {
      threeObject.userData._lookAt = props.lookAt;
      threeObject.lookAt(props.lookAt);
    }
  }

  _updatePosition = (threeObject, nextPosition) => {
    threeObject.position.copy(nextPosition);

    if (threeObject.userData._lookAt) {
      threeObject.lookAt(threeObject.userData._lookAt);
    }
  };

  _updateRotation = (threeObject, nextRotation) => {
    threeObject.rotation.copy(nextRotation);
  };

  _updateQuaternion = (threeObject, nextQuaternion) => {
    threeObject.quaternion.copy(nextQuaternion);
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
    invariant(toIndex >= 0 && self.children.length > toIndex, 'Cannot move a child to that index!');
    _arrayMove(self.children, lastIndex, toIndex);
  }


  setParent(self, parentObject3d) {
    super.setParent(self, parentObject3d);
  }

  highlight(threeObject) {
    threeObject.userData.events.emit('highlight', {
      uuid: threeObject.uuid,
      boundingBoxFunc: () => {
        return this.getBoundingBoxes(threeObject);
      },
    });
  }

  getBoundingBoxes(threeObject) {
    const boundingBox = new THREE.Box3();

    boundingBox.setFromObject(threeObject);

    return [boundingBox];
  }

  hideHighlight(threeObject) {
    threeObject.userData.events.emit('hideHighlight');
  }
}

export default Object3DDescriptor;
