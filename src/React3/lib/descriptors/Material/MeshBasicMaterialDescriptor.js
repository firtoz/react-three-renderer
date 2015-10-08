import THREE from 'three';
import MaterialDescriptorBase from './MaterialDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class MeshBasicMaterialDescriptor extends MaterialDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasColor();
    this.hasWireframe();
  }

  construct(props) {
    const materialDescription = {};

    if (props.hasOwnProperty('color')) {
      materialDescription.color = props.color;
    }

    if (props.hasOwnProperty('wireframe')) {
      materialDescription.wireframe = props.wireframe;
    }

    if (props.hasOwnProperty('map')) {
      materialDescription.map = props.map;
    }

    return new THREE.MeshBasicMaterial(materialDescription);
  }
}

export default MeshBasicMaterialDescriptor;
