import THREE from 'three';
import Object3DDescriptor from './Object3DDescriptor';

import PropTypes from 'react/lib/ReactPropTypes';
import propTypeInstanceOf from '../../utils/propTypeInstanceOf';

class SceneDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.hasProp('fog', {
      type: propTypeInstanceOf(THREE.Fog),
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
