import THREE from 'three';
import Object3DDescriptor from './Object3DDescriptor';

class AxisHelperDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);
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

  unmount(self) {
    self.geometry.dispose();
    self.material.dispose();

    super.unmount(self);
  }
}

export default AxisHelperDescriptor;
