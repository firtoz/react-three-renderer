import * as THREE from 'three';
import PropTypes from 'prop-types';

import THREEElementDescriptor from '../THREEElementDescriptor';

class InterleavedBufferAttributeDescriptor extends THREEElementDescriptor {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);
    const self = this;
    this.hasProp('key', {
      type: PropTypes.string,
      update(threeObject, key) {
        self.key = key;
      },
      updateInitial: true,
      default: '',
    });
    this.hasProp('size', {
      type: PropTypes.number,
      update(threeObject, size) {
        self.size = size;
      },
      updateInitial: true,
      default: 1,
    });
  }

  construct() {
    console.debug('construct buffer attribute');
    return {};
  }

  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);
    this.key = props.key;
    this.size = props.size;
  }

}

module.exports = InterleavedBufferAttributeDescriptor;

