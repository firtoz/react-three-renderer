import THREE from 'three';

class Uniform {
  constructor() {
    this.userData = {};
    this.name = null;
    this.value = null;
    this.type = null;
    this.uuid = THREE.Math.generateUUID();
  }

  setValue(value) {
    this.value = value;

    this.userData.events.emit('valueChanged', value);
  }
}

module.exports = Uniform;
