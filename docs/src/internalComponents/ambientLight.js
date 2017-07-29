import LightInfo from './shared/LightInfo';

class ambientLight extends LightInfo {
  getIntro() {
    return 'Creates a [THREE.AmbientLight](https://threejs.org/docs/#api/lights/AmbientLight)';
  }

  getDescription() {
    return '';
  }
}

module.exports = ambientLight;
