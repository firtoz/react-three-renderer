import LightInfo from './shared/LightInfo';

class pointLight extends LightInfo {
  getIntro() {
    return 'Creates a [THREE.PointLight](http://threejs.org/docs/#Reference/Lights/PointLight)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText(descriptor, componentName) {
    return {
      ...super.getAttributesText(descriptor, componentName),
      intensity: '',
      decay: '',
      distance: '',
    };
  }
}

module.exports = pointLight;
