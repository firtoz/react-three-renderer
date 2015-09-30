import THREE from 'three';
import MaterialDescriptorBase from './MaterialDescriptorBase';

class MeshLambertMaterialDescriptor extends MaterialDescriptorBase {
  construct(props) {
    const materialDescription = this.getMaterialDescription(props);

    return new THREE.MeshLambertMaterial(materialDescription);
  }

  getMaterialDescription(props) {
    const materialDescription = super.getMaterialDescription(props);

    if (props.hasOwnProperty('specular')) {
      materialDescription.specular = props.specular;
    }

    if (props.hasOwnProperty('emissive')) {
      materialDescription.emissive = props.emissive;
    }

    if (props.hasOwnProperty('shininess')) {
      materialDescription.shininess = props.shininess;
    }

    if (props.hasOwnProperty('map')) {
      materialDescription.map = props.map;
    }

    return materialDescription;
  }

  applyInitialProps(self, props) {
    super.applyInitialProps(self, props);

    if (!props.hasOwnProperty('map')) {
      self.map = undefined;
    }
  }
}

export default MeshLambertMaterialDescriptor;
