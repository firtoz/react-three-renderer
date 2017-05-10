import LightInfo from './shared/LightInfo';

class pointLight extends LightInfo {
  getIntro() {
    return 'Creates a [THREE.PointLight](https://threejs.org/docs/#api/lights/PointLight)';
  }

  getDescription() {
    return '';
  }

  getAttributesText(descriptor, componentName) {
    return {
      ...super.getAttributesText(descriptor, componentName),
      intensity: '',
      decay: '',
      distance: '',
      shadowCameraFov: '',
      shadowCameraAspect: '',
    };
  }
}

module.exports = pointLight;
