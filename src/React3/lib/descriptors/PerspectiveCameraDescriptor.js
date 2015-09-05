import CameraDescriptorBase from './CameraDescriptorBase';
import THREE from 'three';

class PerspectiveCameraDescriptor extends CameraDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);
  }

  construct(props) {
    return new THREE.PerspectiveCamera(props.fov, props.aspect, props.near, props.far);
  }
}

export default PerspectiveCameraDescriptor;
