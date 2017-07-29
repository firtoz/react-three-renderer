import LightInfo from './shared/LightInfo';

class hemisphereLight extends LightInfo {
  getIntro() {
    return 'Creates a [THREE.HemisphereLight](https://threejs.org/docs/#api/lights/HemisphereLight)';
  }

  getDescription() {
    return '';
  }

  getAttributesText(descriptor, componentName) {
    return {
      ...super.getAttributesText(descriptor, componentName),
      skyColor: '',
      groundColor: '',
      intensity: '',
    };
  }
}

module.exports = hemisphereLight;
