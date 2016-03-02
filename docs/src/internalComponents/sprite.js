import object3D from './object3D';

class sprite extends object3D {
  getDescription() {
    return 'Creates a [THREE.Sprite](http://threejs.org/docs/#Reference/Objects/Sprite)';
  }

  getAttributesText() {
    return `This object can contain [[Materials]]`;
  }
}

module.exports = sprite;
