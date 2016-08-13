import THREE from 'three';

import ShaderMaterialDescriptor from './ShaderMaterialDescriptor';

class RawShaderMaterialDescriptor extends ShaderMaterialDescriptor {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    [
      'alphaTest',
    ].forEach(propName => {
      this.removeProp(propName);
    });
  }

  construct(props) {
    const materialDescription = this.getMaterialDescription(props);

    return new THREE.RawShaderMaterial(materialDescription);
  }
}

module.exports = RawShaderMaterialDescriptor;
