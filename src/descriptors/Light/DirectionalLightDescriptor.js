import THREE from 'three.js';
import LightDescriptorBase from './LightDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class DirectionalLightDescriptor extends LightDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    this.hasProp('intensity', {
      type: PropTypes.number,
      simple: true,
      'default': 1,
    });

    [
      'shadowCameraLeft',
      'shadowCameraBottom',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number,
        updateInitial: true,
        update(threeObject, value, hasProp) {
          if (hasProp) {
            threeObject[propName] = value;
          }
          // threeObject.shadow.camera.updateProjectionMatrix();
        },
        'default': -500,
      });
    });

    [
      'shadowCameraRight',
      'shadowCameraTop',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number,
        updateInitial: true,
        update(threeObject, value, hasProp) {
          if (hasProp) {
            threeObject[propName] = value;
          }
          // threeObject.shadow.camera.updateProjectionMatrix();
        },
        'default': 500,
      });
    });

    this.hasColor();
  }

  construct(props) {
    const color = props.color;
    const intensity = props.intensity;

    return new THREE.DirectionalLight(color, intensity);
  }

  unmount(threeObject) {
    super.unmount(threeObject);
  }
}

module.exports = DirectionalLightDescriptor;
