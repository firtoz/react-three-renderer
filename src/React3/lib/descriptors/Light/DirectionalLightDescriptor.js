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

    this.hasProp('shadowCameraVisible', {
      type: PropTypes.bool,
      updateInitial: true,
      update: (threeObject, shadowCameraVisible) => {
        if (threeObject.shadowCameraVisible && !shadowCameraVisible) {
          this._removeCameraHelper(threeObject);
        }

        threeObject.shadowCameraVisible = shadowCameraVisible;
      },
      default: false,
    });

    const clearShadowCamera = (threeObject) => {
      if (threeObject.shadowCamera) {
        threeObject.shadowCamera.parent.remove(threeObject.shadowCamera);

        delete threeObject.shadowCamera;
      }

      this._removeCameraHelper(threeObject);
    };

    [
      'shadowMapWidth',
      'shadowMapHeight',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number,
        update(threeObject, value) {
          threeObject[propName] = value;

          // force a recreate of the shadowMap
          delete threeObject.shadowMap;

          clearShadowCamera(threeObject);
        },
        //simple: true,
        default: 512,
      });
    });

    this.hasProp('shadowCameraNear', {
      type: PropTypes.number,
      updateInitial: true,
      update(threeObject, value) {
        threeObject.shadowCameraNear = value;
        clearShadowCamera(threeObject);
      },
      default: 50,
    });

    this.hasProp('shadowCameraFar', {
      type: PropTypes.number,
      updateInitial: true,
      update(threeObject, value) {
        threeObject.shadowCameraFar = value;

        clearShadowCamera(threeObject);
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
          clearShadowCamera(threeObject);
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
          clearShadowCamera(threeObject);
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

    this.hasProp('onlyShadow', {
      type: PropTypes.bool,
      simple: true,
      default: false,
    });

    this.hasColor();
  }

  construct(props) {
    const color = props.color;
    const intensity = props.intensity;

    return new THREE.DirectionalLight(color, intensity);
  }

  unmount(threeObject) {
    this._removeCameraHelper(threeObject);

    super.unmount(threeObject);
  }

  _removeCameraHelper(threeObject) {
    if (threeObject.cameraHelper) {
      if (threeObject.cameraHelper.parent) {
        threeObject.cameraHelper.parent.remove(threeObject.cameraHelper);
      }

      delete threeObject.cameraHelper;
    }
  }
}

export default DirectionalLightDescriptor;
