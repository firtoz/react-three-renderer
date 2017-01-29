import * as THREE from 'three';
import PropTypes from 'react/lib/ReactPropTypes';

import Object3DDescriptor from './Object3DDescriptor';
import propTypeInstanceOf from '../../utils/propTypeInstanceOf';

class SceneDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.hasProp('fog', {
      type: PropTypes.oneOfType([
        propTypeInstanceOf(THREE.Fog),
        propTypeInstanceOf(THREE.FogExp2),
      ]),
      simple: true,
      default: undefined,
    });
  }

  applyInitialProps(threeObject: THREE.Scene, props) {
    super.applyInitialProps(threeObject, props);
  }

  construct() {
    return new THREE.Scene();
  }
}

module.exports = SceneDescriptor;
