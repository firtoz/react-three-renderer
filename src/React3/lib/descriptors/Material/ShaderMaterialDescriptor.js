import THREE from 'three.js';
import MaterialDescriptorBase from './MaterialDescriptorBase';

import UniformContainer from '../../UniformContainer';

import PropTypes from 'react/lib/ReactPropTypes';

class ShaderMaterialDescriptor extends MaterialDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    [
      'vertexShader',
      'fragmentShader',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.string.isRequired,
        update: this.triggerRemount,
      });
    });

    this.hasWireframe();
  }

  construct(props) {
    const materialDescription = this.getMaterialDescription(props);

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

  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    if (!props.hasOwnProperty('uniforms')) {
      threeObject.uniforms = undefined;
    }
  }
}

export default ShaderMaterialDescriptor;
