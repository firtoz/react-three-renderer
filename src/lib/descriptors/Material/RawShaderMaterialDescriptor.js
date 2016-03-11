import THREE from 'three';
import ShaderMaterialDescriptor from './ShaderMaterialDescriptor';

class RawShaderMaterialDescriptor extends ShaderMaterialDescriptor {
  construct(props) {
    const materialDescription = this.getMaterialDescription(props);

    return new THREE.RawShaderMaterial(materialDescription);
  }
}

module.exports = RawShaderMaterialDescriptor;
