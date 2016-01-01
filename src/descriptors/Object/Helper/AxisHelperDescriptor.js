import THREE from 'three';
import Object3DDescriptor from '../Object3DDescriptor';

import PropTypes from 'react/lib/ReactPropTypes';

class AxisHelperDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.propTypes = {
      ...this.propTypes,

      size: PropTypes.number,
    };
  }

  applyInitialProps(threeObject:THREE.Object3D, props) {
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

export default AxisHelperDescriptor;
