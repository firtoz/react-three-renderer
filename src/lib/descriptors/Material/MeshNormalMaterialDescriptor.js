import * as THREE from 'three';

import MaterialDescriptorBase from './MaterialDescriptorBase';

class MeshNormalMaterialDescriptor extends MaterialDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasWireframe();
  }

  construct(props) {
    const materialDescription = this.getMaterialDescription(props);

    return new THREE.MeshNormalMaterial(materialDescription);
  }
}

module.exports = MeshNormalMaterialDescriptor;
