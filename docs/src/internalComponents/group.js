import object3D from './object3D';

class group extends object3D {
  getIntro() {
    return `Creates a THREE.Group`;
  }

  getDescription() {
    return `This is identical to a [object3d], except it calls THREE.Group instead.`;
  }
}

module.exports = group;
