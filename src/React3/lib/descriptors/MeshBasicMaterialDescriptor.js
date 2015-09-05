import THREE from 'three';
import MaterialDescriptorBase from './MaterialDescriptorBase';

class MeshBasicMaterialDescriptor extends MaterialDescriptorBase {
  construct(props) {
    const materialDescription = {};

    if (props.hasOwnProperty('color')) {
      materialDescription.color = props.color;
    }

    if (props.hasOwnProperty('wireframe')) {
      materialDescription.wireframe = props.wireframe;
    }

    return new THREE.MeshBasicMaterial(materialDescription);
  }
}

export default MeshBasicMaterialDescriptor;
