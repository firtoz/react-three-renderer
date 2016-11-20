import DocInfo from '../DocInfo';

class hemisphereLight extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.HemisphereLight](https://threejs.org/docs/?q=Hemisp#Reference/Lights/HemisphereLight)';
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
