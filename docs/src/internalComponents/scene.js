import object3D from './object3D';

class scene extends object3D {
  getIntro() {
    return 'Creates a [THREE.Scene](https://threejs.org/docs/#api/scenes/Scene)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
      fog: 'The [fog](https://threejs.org/docs/#api/scenes/Scene.fog) variable for the scene.\n\n' +
      'Use a [THREE.Fog](https://threejs.org/docs/#api/scenes/Fog) for linear fog, or a [THREE.FogExp2](https://threejs.org/docs/#api/scenes/FogExp2) for exponential fog.',
    };
  }
}

module.exports = scene;
