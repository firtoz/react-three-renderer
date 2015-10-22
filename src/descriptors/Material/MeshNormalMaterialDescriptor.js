import THREE from 'three.js';
import MaterialDescriptorBase from './MaterialDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

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

export default MeshNormalMaterialDescriptor;
