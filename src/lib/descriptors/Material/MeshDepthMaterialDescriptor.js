import * as THREE from 'three';

import MaterialDescriptorBase from './MaterialDescriptorBase';

class MeshDepthMaterialDescriptor extends MaterialDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasWireframe();
    this.hasMap();
    this.hasMap('alphaMap');
    this.hasMap('displacementMap');
  }

  construct(props) {
    const materialDescription = this.getMaterialDescription(props);

    return new THREE.MeshDepthMaterial(materialDescription);
  }
}

module.exports = MeshDepthMaterialDescriptor;
