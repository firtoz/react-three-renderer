import THREE from 'three.js';
import Object3DDescriptor from './Object3DDescriptor';

import PropTypes from 'react/lib/ReactPropTypes';

class SceneDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.hasProp('fog', {
      type: PropTypes.instanceOf(THREE.Fog),
      simple: true,
      default: undefined,
    });
  }

  applyInitialProps(threeObject:THREE.Scene, props) {
    super.applyInitialProps(threeObject, props);
  }

  construct() {
    return new THREE.Scene();
  }
}

export default SceneDescriptor;
