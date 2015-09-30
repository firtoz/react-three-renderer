import THREE from 'three';
import Object3DDescriptor from './Object3DDescriptor';

import PropTypes from 'react/lib/ReactPropTypes';

class SceneDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.propTypes = {
      ...this.propTypes,

      fog: PropTypes.instanceOf(THREE.Fog),
    };
  }

  applyInitialProps(threeObject:THREE.Scene, props) {
    super.applyInitialProps(threeObject, props);

    threeObject.fog = props.fog;
  }

  construct() {
    return new THREE.Scene();
  }
}

export default SceneDescriptor;
