import THREE from 'three';
import MaterialDescriptorBase from './MaterialDescriptorBase';

class MeshPhongMaterialDescriptor extends MaterialDescriptorBase {
  construct(props) {
    const materialDescription = {};

    if (props.hasOwnProperty('color')) {
      materialDescription.color = props.color;
    }

    if (props.hasOwnProperty('alphaTest')) {
      materialDescription.alphaTest = props.alphaTest;
    }

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

    if (props.hasOwnProperty('side')) {
      materialDescription.side = props.side;
    }

    return new THREE.MeshPhongMaterial(materialDescription);
  }


  applyInitialProps(self, props) {
    super.applyInitialProps(self, props);

    if (!props.hasOwnProperty('map')) {
      self.map = undefined;
    }
  }
}

export default MeshPhongMaterialDescriptor;
