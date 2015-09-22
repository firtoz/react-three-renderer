import THREE from 'three';
import Object3DDescriptor from './../Object3DDescriptor';

class ArrowHelperDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);
  }

  applyInitialProps(threeObject:THREE.Object3D, props) {
    super.applyInitialProps(threeObject, props);

    // threeObject.fog = props.fog;
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


  unmount(self) {
    self.geometry.dispose();
    self.material.dispose();

    super.unmount(self);
  }
}

export default ArrowHelperDescriptor;
