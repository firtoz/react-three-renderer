import object3D from './object3D';

class scene extends object3D {
  getIntro() {
    return 'Creates a [THREE.Scene](http://threejs.org/docs/#Reference/Scenes/Scene)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
      fog: 'The [fog](http://threejs.org/docs/#Reference/Scenes/Scene.fog) variable for the scene.\n\n' +
      'Use a [THREE.Fog](https://threejs.org/docs/#Reference/Scenes/Fog) for linear fog, or a [THREE.FogExp2](https://threejs.org/docs/#Reference/Scenes/FogExp2) for exponential fog.',
    };
  }
}

module.exports = scene;
