import THREE from 'three.js';

import THREEElementDescriptor from '../THREEElementDescriptor';

import invariant from 'fbjs/lib/invariant';
import PropTypes from 'react/lib/ReactPropTypes';

function _arrayMove(array, oldIndex, newIndex) {
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
}

class Object3DDescriptor extends THREEElementDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    function copyUpdate(propName) {
      return (threeObject, value) => {
        threeObject[propName].copy(value);
      };
    }

    this.hasProp('quaternion', {
      type: PropTypes.instanceOf(THREE.Quaternion),
      update: copyUpdate('quaternion'),
      default: new THREE.Quaternion(),
    });

    this.hasProp('scale', {
      type: PropTypes.instanceOf(THREE.Vector3),
      update: copyUpdate('scale'),
      default: new THREE.Vector3(1, 1, 1),
    });

    this.hasProp('lookAt', {
      type: PropTypes.instanceOf(THREE.Vector3),
      update(threeObject, lookAt) {
        threeObject.userData._lookAt = lookAt;

        if (!!lookAt) {
          threeObject.lookAt(lookAt);
        }
      },
      default: undefined,
    });

    [
      'frustumCulled',
      'visible',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.bool,
        simple: true,
        default: true,
      });
    });

    this.hasProp('renderOrder', {
      type: PropTypes.number,
      simple: true,
    });

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

  moveChild(threeObject, childObject, toIndex, lastIndex) { // eslint-disable-line no-unused-vars
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
