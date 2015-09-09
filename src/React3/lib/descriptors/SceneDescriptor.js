import THREE from 'three';
import Object3DDescriptor from './Object3DDescriptor';

class SceneDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);
  }

  applyInitialProps(threeObject:THREE.Scene, props) {
    super.applyInitialProps(threeObject, props);

    threeObject.fov = props.fov;
  }

  construct() {
    return new THREE.Scene();
  }
}

export default SceneDescriptor;
