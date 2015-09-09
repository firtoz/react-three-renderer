import THREE from 'three';
import MaterialDescriptorBase from './MaterialDescriptorBase';

class ShaderMaterial extends MaterialDescriptorBase {
  construct(props) {
    const materialDescription = {};

    if (props.hasOwnProperty('uniforms')) {
      materialDescription.uniforms = props.uniforms;
    }

    if (props.hasOwnProperty('vertexShader')) {
      materialDescription.vertexShader = props.vertexShader;
    }

    if (props.hasOwnProperty('fragmentShader')) {
      materialDescription.fragmentShader = props.fragmentShader;
    }

    return new THREE.ShaderMaterial(materialDescription);
  }
}

export default ShaderMaterial;
