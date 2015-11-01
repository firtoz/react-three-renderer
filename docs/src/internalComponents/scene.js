import object3D from './object3D';

class scene extends object3D {
  getIntro() {
    return `Creates a [THREE.Scene](http://threejs.org/docs/#Reference/Scenes/Scene)`;
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
      fog: 'The [fog]() variable for the scene.',
    };
  }
}

export default scene;
