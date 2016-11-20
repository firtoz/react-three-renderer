import * as THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

import Object3DDescriptor from '../Object3DDescriptor';
import propTypeInstanceOf from '../../../utils/propTypeInstanceOf';

class ArrowHelperDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.hasProp('origin', {
      type: propTypeInstanceOf(THREE.Vector3).isRequired,
      update(threeObject, origin) {
        threeObject.position.copy(origin);
      },
      default: undefined,
    });

    this.hasProp('dir', {
      type: propTypeInstanceOf(THREE.Vector3).isRequired,
      update(threeObject, newDir) {
        threeObject.setDirection(newDir);
      },
      default: undefined,
    });

    this.hasProp('color', {
      type: PropTypes.oneOfType([
        propTypeInstanceOf(THREE.Color),
        PropTypes.number,
        PropTypes.string,
      ]),
      update(threeObject, newColor) {
        threeObject.setColor(newColor);
      },
      default: 0xffff00,
    });

    this.hasProp('length', {
      type: PropTypes.number,
      update(threeObject, length) {
        threeObject.userData.lengthProps.length = length;

        threeObject.userData.lengthsChanged = true;
      },
      default: 1,
    });

    this.hasProp('headLength', {
      type: PropTypes.number,
      update: (threeObject, headLength) => {
        threeObject.userData.lengthProps.headLength = headLength;

        threeObject.userData.lengthsChanged = true;
      },
      default: undefined,
    });

    this.hasProp('headWidth', {
      type: PropTypes.number,
      update: (threeObject, headWidth) => {
        threeObject.userData.lengthProps.headWidth = headWidth;

        threeObject.userData.lengthsChanged = true;
      },
      default: undefined,
    });
  }

  beginPropertyUpdates(threeObject) {
    threeObject.userData.lengthsChanged = false;
  }

  completePropertyUpdates(threeObject) {
    if (threeObject.userData.lengthsChanged) {
      threeObject.userData.lengthsChanged = false;

      const {
        length,
      } = threeObject.userData.lengthProps;

      let {
        headLength,
        headWidth,
      } = threeObject.userData.lengthProps;

      if (headLength === undefined) {
        headLength = 0.2 * length;
      }

      if (headWidth === undefined) {
        headWidth = 0.2 * headLength;
      }

      threeObject.setLength(length, headLength, headWidth);
    }
  }

  applyInitialProps(threeObject: THREE.Object3D, props) {
    super.applyInitialProps(threeObject, props);

    const {
      length,
      headLength,
      headWidth,
    } = props;

    threeObject.userData.lengthProps = {
      length,
      headLength,
      headWidth,
    };
  }

  construct(props) {
    const {
      dir,
      origin,
      length,
      color,
      headLength,
      headWidth,
    } = props;

    return new THREE.ArrowHelper(dir, origin, length, color, headLength, headWidth);
  }

  unmount(threeObject) {
    if (threeObject.line) {
      threeObject.line.geometry.dispose();
      threeObject.line.material.dispose();
    }

    if (threeObject.cone) {
      threeObject.cone.geometry.dispose();
      threeObject.cone.material.dispose();
    }

    super.unmount(threeObject);
  }
}

module.exports = ArrowHelperDescriptor;
