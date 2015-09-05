import CameraDescriptorBase from './CameraDescriptorBase';
import THREE from 'three';

class OrthographicCameraDescriptor extends CameraDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);
  }

  construct(props) {
    return new THREE.OrthographicCamera(props.left, props.right, props.top, props.bottom, props.near, props.far);
  }
}

export default OrthographicCameraDescriptor;
