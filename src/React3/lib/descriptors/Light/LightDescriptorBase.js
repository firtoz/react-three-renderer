import THREE from 'three';
import Object3DDescriptor from '../Object/Object3DDescriptor';

import PropTypes from 'react/lib/ReactPropTypes'

class LightDescriptorBase extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this._hasColor = false;
  }

  hasColor() {
    this._hasColor = true;

    this.hasProp('color', {
      type: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(THREE.Color)]),
      update(threeObject, newColor) {
        threeObject.color.set(newColor);
      },
      default: 0xffffff,
    });
  }
}

export default LightDescriptorBase;
