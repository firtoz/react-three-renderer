import THREE from 'three';
import MaterialDescriptorBase from './MaterialDescriptorBase';

class PointsMaterialDescriptor extends MaterialDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasColor();
  }

  construct(props) {
    const materialDescription = this.getMaterialDescription(props);

    return new THREE.PointsMaterial(materialDescription);
  }
}

export default PointsMaterialDescriptor;
