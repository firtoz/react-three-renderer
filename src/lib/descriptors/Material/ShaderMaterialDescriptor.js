import THREE from 'three';
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

    this.hasProp('uniforms', {
      type: PropTypes.any,
      simple: true,
      default: undefined,
    });

    this.hasWireframe();
  }

  getMaterialDescription(props) {
    const materialDescription = super.getMaterialDescription(props);

    if (props.hasOwnProperty('uniforms')) {
      materialDescription.uniforms = props.uniforms;
    }

    if (props.hasOwnProperty('vertexShader')) {
      materialDescription.vertexShader = props.vertexShader;
    }

    if (props.hasOwnProperty('fragmentShader')) {
      materialDescription.fragmentShader = props.fragmentShader;
    }

    return materialDescription;
  }

  construct(props) {
    const materialDescription = this.getMaterialDescription(props);

    return new THREE.ShaderMaterial(materialDescription);
  }

  invalidChildInternal(child) {
    const invalid = !(child instanceof UniformContainer || super.invalidChildInternal(child));

    return invalid;
  }

  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    if (!props.hasOwnProperty('uniforms')) {
      threeObject.uniforms = undefined;
    }
  }
}

module.exports = ShaderMaterialDescriptor;
