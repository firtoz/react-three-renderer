import THREE from 'three';
import ShaderMaterialDescriptor from './ShaderMaterialDescriptor';

class RawShaderMaterialDescriptor extends ShaderMaterialDescriptor {
  construct(props) {
    const materialDescription = this.getMaterialDescription(props);

    if (props.hasOwnProperty('vertexShader')) {
      materialDescription.vertexShader = props.vertexShader;
    }

    if (props.hasOwnProperty('fragmentShader')) {
      materialDescription.fragmentShader = props.fragmentShader;
    }

    return new THREE.RawShaderMaterial(materialDescription);
  }
}

module.exports = RawShaderMaterialDescriptor;
