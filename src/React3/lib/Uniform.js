import THREE from 'three.js';

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

export default Uniform;
