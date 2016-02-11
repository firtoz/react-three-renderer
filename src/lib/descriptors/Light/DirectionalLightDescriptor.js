import THREE from 'three';
import LightDescriptorBase from './LightDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class DirectionalLightDescriptor extends LightDescriptorBase {
  static defaultShadowCameraLeft = -5;
  static defaultShadowCameraRight = 5;
  static defaultShadowCameraTop = 5;
  static defaultShadowCameraBottom = -5;

  constructor(react3Instance) {
    super(react3Instance);

    this.hasProp('intensity', {
      type: PropTypes.number,
      simple: true,
      default: 1,
    });

    this.hasProp('shadowCameraLeft', {
      type: PropTypes.number,
      updateInitial: true,
      update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.camera.left = value;
        }
      },
      default: DirectionalLightDescriptor.defaultShadowCameraLeft,
    });

    this.hasProp('shadowCameraBottom', {
      type: PropTypes.number,
      updateInitial: true,
      update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.camera.bottom = value;
        }
      },
      default: DirectionalLightDescriptor.defaultShadowCameraBottom,
    });

    this.hasProp('shadowCameraRight', {
      type: PropTypes.number,
      updateInitial: true,
      update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.camera.right = value;
        }
      },
      default: DirectionalLightDescriptor.defaultShadowCameraRight,
    });

    this.hasProp('shadowCameraTop', {
      type: PropTypes.number,
      updateInitial: true,
      update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.camera.top = value;
        }
      },
      default: DirectionalLightDescriptor.defaultShadowCameraTop,
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
