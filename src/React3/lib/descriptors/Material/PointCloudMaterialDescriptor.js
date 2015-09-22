import THREE from 'three';
import MaterialDescriptorBase from './MaterialDescriptorBase';

class PointCloudMaterialDescriptor extends MaterialDescriptorBase {
  construct(props) {
    const materialDescription = {};

    if (props.hasOwnProperty('color')) {
      materialDescription.color = props.color;
    }

    return new THREE.PointCloudMaterial(materialDescription);
  }
}

export default PointCloudMaterialDescriptor;
