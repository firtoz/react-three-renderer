import THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

import Object3DDescriptor from '../Object3DDescriptor';

class AxisHelperDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.hasProp('size', {
      type: PropTypes.number,
      update: this.triggerRemount,
      default: 1,
    });
  }

  applyInitialProps(threeObject: THREE.Object3D, props) {
    super.applyInitialProps(threeObject, props);
  }

  construct(props) {
    const {
      size,
    } = props;
    return new THREE.AxisHelper(size);
  }

  unmount(threeObject) {
    threeObject.geometry.dispose();
    threeObject.material.dispose();

    super.unmount(threeObject);
  }
}

module.exports = AxisHelperDescriptor;
