import THREE from 'three';
import MaterialDescriptorBase from './MaterialDescriptorBase';

import UniformContainer from '../UniformContainer';

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

  invalidChildInternal(child) {
    const invalid = !(child instanceof UniformContainer || super.invalidChildInternal(child) );

    if (invalid) {
      debugger;
    }

    return invalid;
  }

  applyInitialProps(self, props) {
    super.applyInitialProps(self, props);

    if (!props.hasOwnProperty('uniforms')) {
      self.uniforms = undefined;
    }
  }
}

export default ShaderMaterial;
