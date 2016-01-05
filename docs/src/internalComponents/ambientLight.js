import LightInfo from './shared/LightInfo';

class ambientLight extends LightInfo {
  getIntro() {
    return 'Creates a [THREE.AmbientLight](http://threejs.org/docs/#Reference/Lights/AmbientLight)';
  }

  getDescription() {
    return ``;
  }
}

module.exports = ambientLight;
