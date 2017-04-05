import * as THREE from 'three';

import invariant from 'fbjs/lib/invariant';
import warning from 'fbjs/lib/warning';
import PropTypes from 'prop-types';

import THREEElementDescriptor from '../THREEElementDescriptor';
import propTypeInstanceOf from '../../utils/propTypeInstanceOf';

function _arrayMove(array, oldIndex, newIndex) {
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
}

function validateMatrixProp(nextProps, threeObject) {
  if (nextProps && nextProps.hasOwnProperty('matrix')) {
    [
      'position',
      'rotation',
      'quaternion',
      'scale',
      'lookAt',
    ].find((unwantedProp) => {
      if (nextProps.hasOwnProperty(unwantedProp)) {
        warning(false, `The ${threeObject.type} should not have a` +
          ` '${unwantedProp}' property if it has a 'matrix' property.`);

        return true;
      }

      return false;
    });
  }
}

class Object3DDescriptor extends THREEElementDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.hasName();

    function copyUpdate(propName) {
      return (threeObject, value) => {
        threeObject[propName].copy(value);
      };
    }

    this.hasProp('position', {
      type: propTypeInstanceOf(THREE.Vector3),
      update(threeObject, position) {
        threeObject.position.copy(position);

        if (threeObject.userData._lookAt) {
          threeObject.lookAt(threeObject.userData._lookAt);
        }
      },
      default: new THREE.Vector3(),
    });

    this.hasProp('up', {
      type: propTypeInstanceOf(THREE.Vector3),
      update(threeObject, up) {
        threeObject.up.copy(up);
      },
      default: new THREE.Vector3(),
    });

    this.hasProp('rotation', {
      type: propTypeInstanceOf(THREE.Euler),
      update(threeObject, rotation) {
        threeObject.rotation.copy(rotation);
      },
      default: new THREE.Euler(),
    });

    this.hasProp('quaternion', {
      type: propTypeInstanceOf(THREE.Quaternion),
      update: copyUpdate('quaternion'),
      default: new THREE.Quaternion(),
    });

    this.hasProp('scale', {
      type: propTypeInstanceOf(THREE.Vector3),
      update: copyUpdate('scale'),
      default: new THREE.Vector3(1, 1, 1),
    });

    this.hasProp('lookAt', {
      type: propTypeInstanceOf(THREE.Vector3),
      update(threeObject, lookAt) {
        threeObject.userData._lookAt = lookAt;

        if (lookAt) {
          threeObject.lookAt(lookAt);
        }
      },
      default: undefined,
    });

    this.hasProp('matrix', {
      type: propTypeInstanceOf(THREE.Matrix4),
      update(threeObject, matrix) {
        threeObject.matrix.copy(matrix);

        threeObject.matrix.decompose(
          threeObject.position,
          threeObject.quaternion,
          threeObject.scale);
      },
      default: new THREE.Matrix4(),
    });

    [
      'frustumCulled',
      'visible',
    ].forEach((propName) => {
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

    this.hasProp('layers', {
      type: PropTypes.number,
      update(threeObject, layers) {
        threeObject.layers.mask = layers;
      },
      default: 1,
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
  }

  beginPropertyUpdates(threeObject, nextProps) {
    if (process.env.NODE_ENV !== 'production') {
      validateMatrixProp(nextProps, threeObject);
    }
  }

  construct() {
    return new THREE.Object3D();
  }

  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    if (process.env.NODE_ENV !== 'production') {
      validateMatrixProp(props, threeObject);
    }

    if (props.matrix) {
      threeObject.matrix.copy(props.matrix);

      threeObject.matrix.decompose(
        threeObject.position,
        threeObject.quaternion,
        threeObject.scale);
    } else {
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
        threeObject.lookAt(props.lookAt);
      }
    }

    if (props.up) {
      threeObject.up.copy(props.up);
    }

    if (props.lookAt) {
      threeObject.userData._lookAt = props.lookAt;
    }

    if (props.layers !== undefined) {
      threeObject.layers.mask = props.layers;
    }
  }

  /**
   * @param threeObject
   * @param {Array} children
   */
  addChildren(threeObject, children) {
    children.forEach((child) => {
      threeObject.add(child);
    });
  }

  addChild(threeObject, child, mountIndex) {
    threeObject.add(child);

    this.moveChild(threeObject, child, mountIndex,
      threeObject.children.length - 1);
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
      invariant(toIndex >= 0 && threeObject.children.length > toIndex,
        'Cannot move a child to that index');
    }
    _arrayMove(threeObject.children, threeObject.children.indexOf(childObject), toIndex);
  }

  highlight(threeObject) {
    threeObject.userData.events.emit('highlight', {
      uuid: threeObject.uuid,
      boundingBoxFunc: () => this.getBoundingBoxes(threeObject),
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

module.exports = Object3DDescriptor;
