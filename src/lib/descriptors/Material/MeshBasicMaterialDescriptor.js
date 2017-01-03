import * as THREE from 'three';

import MaterialDescriptorBase from './MaterialDescriptorBase';

class MeshBasicMaterialDescriptor extends MaterialDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasColor();
    this.hasWireframe();
    this.hasMap();
  }

  construct(props) {
    const materialDescription = this.getMaterialDescription(props);

    if (props.hasOwnProperty('map')) {
      materialDescription.map = props.map;
    }

    return new THREE.MeshBasicMaterial(materialDescription);
  }
}

module.exports = MeshBasicMaterialDescriptor;
