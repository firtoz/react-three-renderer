import LightInfo from './shared/LightInfo';

class hemisphereLight extends LightInfo {
  getIntro() {
    return 'Creates a [THREE.HemisphereLight](https://threejs.org/docs/#Reference/Lights/HemisphereLight)';
  }

  getDescription() {
    return '';
  }

  getAttributesText(descriptor, componentName) {
    return {
      ...super.getAttributesText(descriptor, componentName),
      groundColor: '',
      intensity: '',
    };
  }
}

module.exports = hemisphereLight;
