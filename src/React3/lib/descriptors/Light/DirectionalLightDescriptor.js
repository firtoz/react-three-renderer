import THREE from 'three';
import LightDescriptorBase from './LightDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class DirectionalLightDescriptor extends LightDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    this.registerSimpleProperties([
      'intensity',
      'shadowMapWidth',
      'shadowMapHeight',
      'shadowCameraLeft',
      'shadowCameraRight',
      'shadowCameraTop',
      'shadowCameraBottom',
      'shadowCameraFar',
      'shadowDarkness',
    ]);

    this.hasColor();

    this.propTypes = {
      ...this.propTypes,

      color: PropTypes.number,
      intensity: PropTypes.number,
      shadowMapWidth: PropTypes.number,
      shadowMapHeight: PropTypes.number,
      shadowCameraLeft: PropTypes.number,
      shadowCameraRight: PropTypes.number,
      shadowCameraTop: PropTypes.number,
      shadowCameraBottom: PropTypes.number,
      shadowCameraFar: PropTypes.number,
      shadowDarkness: PropTypes.number,
      castShadow: PropTypes.bool,
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
    const color = props.hasOwnProperty('color') ? props.color : undefined;
    const intensity = props.hasOwnProperty('intensity') ? props.intensity : undefined;

    return new THREE.DirectionalLight(color, intensity);
  }
}

export default DirectionalLightDescriptor;
