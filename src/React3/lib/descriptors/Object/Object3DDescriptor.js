import THREE from 'three';

import THREEElementDescriptor from '../THREEElementDescriptor';

import invariant from 'fbjs/lib/invariant';
import PropTypes from 'react/lib/ReactPropTypes';

function _arrayMove(array, oldIndex, newIndex) {
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
}

class Object3DDescriptor extends THREEElementDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.propTypes = {
      ...this.propTypes,

      'quaternion': PropTypes.instanceOf(THREE.Quaternion),
      'lookAt': PropTypes.instanceOf(THREE.Vector3),
      'scale': PropTypes.instanceOf(THREE.Vector3),
      frustumCulled: PropTypes.bool,
      visible: PropTypes.bool,
      renderOrder: PropTypes.number,
    };

    this.propUpdates = {
      ...this.propUpdates,

      'quaternion': this._updateQuaternion,
      'lookAt': this._updateLookAt,
      'scale': this._updateScale,
    };

    this.registerSimpleProperties([
      'frustumCulled',
      'visible',
      'renderOrder',
    ]);

    this.hasProp('castShadow', {
      type: PropTypes.bool,
      simple: true,
      default: false,
    });

    this.hasProp('receiveShadow', {
      type: PropTypes.bool,
      updateInitial: true,
      update(threeObject, receiveShadow) {
        threeObject.receiveShadow = receiveShadow;

        if (threeObject.material) {
          threeObject.material.needsUpdate = true;
        }
      },
      default: false,
    });

    this.hasProp('position', {
      type: PropTypes.instanceOf(THREE.Vector3),
      update(threeObject, position) {
        threeObject.position.copy(position);

        if (threeObject.userData._lookAt) {
          threeObject.lookAt(threeObject.userData._lookAt);
        }
      },
      default: new THREE.Vector3(),
    });

    this.hasProp('rotation', {
      type: PropTypes.instanceOf(THREE.Euler),
      update(threeObject, rotation) {
        threeObject.rotation.copy(rotation);
      },
      default: new THREE.Euler(),
    });

    this.hasName();
  }

  construct() {
    return new THREE.Object3D();
  }

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

    if (props.lookAt) {
      threeObject.userData._lookAt = props.lookAt;
      threeObject.lookAt(props.lookAt);
    }
  }

  _updateQuaternion = (threeObject, nextQuaternion) => {
    threeObject.quaternion.copy(nextQuaternion);
  };

  _updateScale = (threeObject, nextScale) => {
    threeObject.scale.copy(nextScale);
  };

  _updateLookAt = (threeObject, lookAt) => {
    threeObject.userData._lookAt = lookAt;

    if (!!lookAt) {
      threeObject.lookAt(lookAt);
    }
  };

  /**
   * @param threeObject
   * @param {Array} children
   */
  addChildren(threeObject, children) {
    children.forEach(child => {
      threeObject.add(child);
    });
  }

  addChild(threeObject, child, mountIndex) {
    threeObject.add(child);

    this.moveChild(threeObject, child, mountIndex, threeObject.children.length - 1);
  }

  /**
   * @param {THREE.Object3D} threeObject
   * @param child
   */
  removeChild(threeObject, child) {
    threeObject.remove(child);
  }

  moveChild(threeObject, childObject, toIndex, lastIndex) {
    if (process.env.NODE_ENV !== 'production') {
      invariant(toIndex >= 0 && threeObject.children.length > toIndex, 'Cannot move a child to that index');
    }
    _arrayMove(threeObject.children, threeObject.children.indexOf(childObject), toIndex);
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
