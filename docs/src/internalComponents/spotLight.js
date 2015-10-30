import LightInfo from './shared/LightInfo';

class spotLight extends LightInfo {
  getIntro() {
    return 'Creates a [THREE.SpotLight](http://threejs.org/docs/#Reference/Lights/SpotLight)';
  }

  getDescription() {
    return ``;
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

export default spotLight;
