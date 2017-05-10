import Object3DInfo from './shared/Object3DInfo';

class object3D extends Object3DInfo {
  getIntro() {
    return 'Creates a [THREE.Object3D](https://threejs.org/docs/#api/core/Object3D)';
  }

  getDescription() {
    return '';
  }
}

module.exports = object3D;
