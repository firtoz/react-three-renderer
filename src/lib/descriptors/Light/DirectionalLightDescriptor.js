import THREE from 'three.js';
import LightDescriptorBase from './LightDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class DirectionalLightDescriptor extends LightDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    this.hasProp('intensity', {
      type: PropTypes.number,
      simple: true,
      default: 1,
    });

    this.hasProp('shadowBias', {
      type: PropTypes.number,
      simple: true,
      default: 0,
    });

    this.hasProp('shadowDarkness', {
      type: PropTypes.number,
      simple: true,
      default: 0.5,
    });

    [
      'shadowMapWidth',
      'shadowMapHeight',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number,
        updateInitial: true,
        update(threeObject, value) {
          threeObject[propName] = value;
        },
        default: 512,
      });
    });

    this.hasProp('shadowCameraNear', {
      type: PropTypes.number,
      updateInitial: true,
      update(threeObject, value) {
        threeObject.shadow.camera.near = value;
        // threeObject.shadow.camera.updateProjectionMatrix();
      },
      default: 50,
    });

    this.hasProp('shadowCameraFar', {
      type: PropTypes.number,
      updateInitial: true,
      update(threeObject, value) {
        threeObject.shadow.camera.far = value;
        // threeObject.shadow.camera.updateProjectionMatrix();
      },
      default: 5000,
    });

    [
      'shadowCameraLeft',
      'shadowCameraBottom',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number,
        updateInitial: true,
        update(threeObject, value) {
          threeObject[propName] = value;
          // threeObject.shadow.camera.updateProjectionMatrix();
        },
        default: -500,
      });
    });

    [
      'shadowCameraRight',
      'shadowCameraTop',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number,
        updateInitial: true,
        update(threeObject, value) {
          threeObject[propName] = value;
          // threeObject.shadow.camera.updateProjectionMatrix();
        },
        default: 500,
      });
    });

    this.hasProp('castShadow', {
      override: true,
      type: PropTypes.bool,
      update: this.triggerRemount,
      default: false,
    });

    this.hasColor();
  }

  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    if (props.hasOwnProperty('castShadow')) {
      threeObject.castShadow = props.castShadow;
    }
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

export default DirectionalLightDescriptor;
