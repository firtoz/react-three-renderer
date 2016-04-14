import THREE from 'three';
import Object3DDescriptor from '../Object3DDescriptor';

import PropTypes from 'react/lib/ReactPropTypes';
import propTypeInstanceOf from '../../../utils/propTypeInstanceOf';

class ArrowHelperDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    [
      'dir',
      'origin',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: propTypeInstanceOf(THREE.Vector3),
        update: this.triggerRemount,
        default: undefined,
      });
    });

    [
      'length',
      'color',
      'headLength',
      'headWidth',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number,
        update: this.triggerRemount,
        default: undefined,
      });
    });
  }

  applyInitialProps(threeObject:THREE.Object3D, props) {
    super.applyInitialProps(threeObject, props);
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
