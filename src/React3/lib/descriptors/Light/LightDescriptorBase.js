import THREE from 'three';
import Object3DDescriptor from '../Object/Object3DDescriptor';

import PropTypes from 'react/lib/ReactPropTypes'

class LightDescriptorBase extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.propTypes = {
      ...this.propTypes,

      color: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(THREE.Color)]),
    };

    this.propUpdates = {
      ...this.propUpdates,

      color: this._updateColor,
    };
  }

  _updateColor(self, newColor) {
    self.color.set(newColor);
  }
}

export default LightDescriptorBase;
