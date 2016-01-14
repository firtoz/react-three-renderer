import THREE from 'three';
import Object3DDescriptor from '../Object3DDescriptor';

import PropTypes from 'react/lib/ReactPropTypes';
import propTypeInstanceOf from '../../../utils/propTypeInstanceOf';

class ArrowHelperDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.propTypes = {
      ...this.propTypes,

      dir: propTypeInstanceOf(THREE.Vector3),
      origin: propTypeInstanceOf(THREE.Vector3),
      length: PropTypes.number,
      color: PropTypes.number,
      headLength: PropTypes.number,
      headWidth: PropTypes.number,
    };
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
