import Object3DDescriptor from '../Object3DDescriptor';
import THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

class CubeCameraDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.propTypes = {
      ...this.propTypes,

      near: PropTypes.number,
      far: PropTypes.number,
      cubeResolution: PropTypes.number.isRequired,
    };
  }

  construct(props) {
    return new THREE.CubeCamera(props.near, props.far, props.cubeResolution);
  }
}

export default CubeCameraDescriptor;
