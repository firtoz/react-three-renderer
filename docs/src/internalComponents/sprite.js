import object3D from './object3D';

class sprite extends object3D {
  getIntro() {
    return 'Creates a [THREE.Sprite](http://threejs.org/docs/#Reference/Objects/Sprite)';
  }

  getDescription() {
    return 'This object can contain a [[spriteMaterial]].';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
    };
  }
}

module.exports = sprite;
