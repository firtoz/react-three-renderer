import THREE from 'three';
import Object3DDescriptor from './../Object/Object3DDescriptor';

import PropTypes from 'react/lib/ReactPropTypes'

class AmbientLightDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.propTypes = {
      ...this.propTypes,

      color: PropTypes.number,
    };

    this.propUpdates = {
      ...this.propUpdates,

      color: this._updateColor,
    };
  }

  _updateColor(self, newColor) {
    self.color.set(newColor);
  }

  construct(props) {
    const color = props.hasOwnProperty('color') ? props.color : 0xffffff;

    return new THREE.AmbientLight(color);
  }
}

export default AmbientLightDescriptor;
