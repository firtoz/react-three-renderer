import THREE from 'three';
import THREEElementDescriptor from '../../descriptors/THREEElementDescriptor';

import UniformContainer from '../../UniformContainer';

import PropTypes from 'react/lib/ReactPropTypes';

class RawShaderMaterialDescriptor extends THREEElementDescriptor {
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

    return new THREE.RawShaderMaterial(materialDescription);
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

module.exports = RawShaderMaterialDescriptor;
