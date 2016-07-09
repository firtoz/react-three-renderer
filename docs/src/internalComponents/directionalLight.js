import LightInfo from './shared/LightInfo';

class directionalLight extends LightInfo {
  getIntro() {
    return 'Creates a [THREE.DirectionalLight](http://threejs.org/docs/#Reference/Lights/DirectionalLight)';
  }

  getDescription() {
    return '';
  }

  getAttributesText(descriptor, componentName) {
    return {
      ...super.getAttributesText(descriptor, componentName),
      intensity: '',
      shadowCameraLeft: '',
      shadowCameraBottom: '',
      shadowCameraRight: '',
      shadowCameraTop: '',
    };
  }
}

module.exports = directionalLight;
