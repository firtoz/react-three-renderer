import object3D from './object3D';

class scene extends object3D {
  getIntro() {
    return ')';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
      fog: 'The [fog](http://threejs.org/docs/#Reference/Scenes/Scene.fog) variable for the scene.',
    };
  }
}

module.exports = scene;
