import LightInfo from './shared/LightInfo';

class spotLight extends LightInfo {
  getIntro() {
    return 'Creates a [THREE.SpotLight](https://threejs.org/docs/#api/lights/SpotLight)';
  }

  getDescription() {
    return '';
  }

  getAttributesText(descriptor, componentName) {
    return {
      ...super.getAttributesText(descriptor, componentName),
      intensity: '',
      distance: '',
      angle: '',
      exponent: '',
      decay: '',
    };
  }
}

module.exports = spotLight;
